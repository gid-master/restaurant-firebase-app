<template>
  <div class="pwa">
    <ModalBottomSheet id="install-modal" title="Install Application">
      <PwaInstall
        :ios="state.ios"
        :installed="state.installed || !state.deferredPrompt"
        :developmentMode="state.developmentMode"
        @install-clicked="onInstallClicked"
      />
    </ModalBottomSheet>

    <ModalBottomSheet id="refresh-modal" title="Update Application">
      <PwaRefresh @refresh-clicked="onRefreshClicked" />
    </ModalBottomSheet>
  </div>
</template>

<script lang="ts">
  import firebase from "firebase/app";
  import "firebase/messaging";

  import {
    defineComponent,
    onMounted,
    onUnmounted,
    reactive,
    computed,
    watch
  } from "vue";
  import { useStore } from "vuex";

  import {
    isApplicationInstalled,
    isDevelopmentMode,
    isIOS
  } from "@/utils/EnvironmentUtil";

  import ModalBottomSheet from "@/components/shared/modals/ModalBottomSheet.vue";
  import PwaInstall from "./PwaInstall.vue";
  import PwaRefresh from "./PwaRefresh.vue";

  export default defineComponent({
    name: "PwaController",
    components: {
      ModalBottomSheet,
      PwaInstall,
      PwaRefresh
    },
    setup() {
      const messaging = firebase.messaging();
      const store = useStore();
      const showInstall = computed(() => store.getters.showInstall);
      const state = reactive({
        registration: null,
        deferredPrompt: null,
        ios: isIOS(),
        developmentMode: isDevelopmentMode(),
        installed: isApplicationInstalled()
      });

      watch(showInstall, (show: boolean) => {
        if (show) {
          store.dispatch("showModal", { id: "install-modal", show: true });
          store.dispatch("showInstall", false);
        }
      });

      const handleInstall = event => {
        event.preventDefault();
        state.deferredPrompt = event;
      };

      const handleOnline = () => {
        store.dispatch("showSnackbar", "Woop, you're back online again");
      };

      const handleOffline = () => {
        store.dispatch("showSnackbar", "Ops, You're currently offline");
      };

      const handleUpdate = event => {
        state.registration = event.detail.params;
        store.dispatch("showModal", { id: "refresh-modal", show: true });
      };

      const handleConnection = () => {
        store.dispatch(
          "showSnackbar",
          "No internet connection found.<br>But the applicaiton can be used in offline mode"
        );
      };

      const handlePermission = async (): Promise<void> => {
        Notification.requestPermission().then(async data => {
          if (data === "granted") {
            const token = await messaging.getToken();
            store.dispatch("pushPermishion", token);
          }
        });
      };

      const handleCloudForegroundMessage = (message: string) => {
        store.dispatch("showSnackbar", message);
      };

      onMounted(async () => {
        messaging.onMessage(payload => {
          // {"notification": {"title":"Restaurant","icon":"img/icons/favicon-32x32.png","vibrate":[100, 50, 100],"body":"testing!!!"}}
          // However, here we are with the app opened, so we just send the body as part of the application notification
          handleCloudForegroundMessage(payload.notification.body);
        });

        window.addEventListener("beforeinstallprompt", event =>
          handleInstall(event)
        );
        window.addEventListener("online", () => handleOnline());
        window.addEventListener("offline", () => handleOffline());
        document.addEventListener("update", event => handleUpdate(event));
        document.addEventListener("connection", () => handleConnection());
        document.addEventListener("permission", () => handlePermission());
      });

      onUnmounted(async () => {
        window.removeEventListener("beforeinstallprompt", event =>
          handleInstall(event)
        );
        window.removeEventListener("online", () => handleOnline());
        window.removeEventListener("offline", () => handleOffline());
        document.removeEventListener("update", event => handleUpdate(event));
        document.removeEventListener("connection", () => handleConnection());
        document.removeEventListener("permission", () => handlePermission());
      });

      const onRefreshClicked = () => {
        const worker = state.registration.waiting;
        worker.postMessage({ action: "SKIP_WAITING" });
        window.location.reload();
      };

      const onInstallClicked = async () => {
        if (!state.deferredPrompt) {
          return;
        }

        state.deferredPrompt.prompt();
        await state.deferredPrompt.userChoise;
        state.deferredPrompt = null;

        store.dispatch("showModal", { id: "install-modal", show: false });
      };

      return {
        state,
        onRefreshClicked,
        onInstallClicked
      };
    }
  });
</script>
