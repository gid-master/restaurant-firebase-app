<template>
  <div class="main">
    <router-view />
    <Toolbar
      v-if="state.showToolbar"
      :toolbarId="state.toolbarId"
      :cartQuantity="state.cartQuantity"
      @toolbar-clicked="onToolbarClicked"
    />
    <PwaController />
    <ModalSnackbar />
    <ModalBackdrop />
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from "vue";
  import router from "@/router";
  import { useRoute } from "vue-router";
  import { useStore } from "vuex";

  import Toolbar from "@/components/shared/layouts/Toolbar.vue";
  import PwaController from "@/components/shared/pwa/PwaController.vue";
  import ModalBackdrop from "@/components/shared/modals/ModalBackdrop.vue";
  import ModalSnackbar from "@/components/shared/modals/ModalSnackbar.vue";

  export default defineComponent({
    name: "Menu",
    components: {
      PwaController,
      Toolbar,
      ModalBackdrop,
      ModalSnackbar
    },
    setup() {
      const route = useRoute();
      const store = useStore();
      const state = reactive({
        showToolbar: computed(() => route.meta.showToolbar),
        toolbarId: computed(() => route.meta.toolbarId),
        cartQuantity: computed(() => store.getters.cartQuantity)
      });

      const onToolbarClicked = (toolbarId: string) => {
        router.push({ name: toolbarId });
      };

      return { state, onToolbarClicked };
    }
  });
</script>

<style lang="scss">
  .main {
    width: 100%;
  }
</style>
