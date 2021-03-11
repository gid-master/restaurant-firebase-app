<template>
  <div class="install">
    <div v-if="developmentMode">
      <p>
        You're in development mode, build your application in production mode in
        order to test all PWA functionalities.
      </p>
    </div>

    <div v-if="!developmentMode && !installed">
      <p v-if="!ios">
        Install the application and you can access it through the home screen
        icon in your device.
      </p>

      <p v-if="ios">
        IOS devices have a different behaviour for PWA applications, click on
        add to home screen in your browser settings.
      </p>
    </div>

    <div v-if="!developmentMode && installed">
      <p>
        You have already installed the application and you can access it through
        the home screen icon in your device.
      </p>
    </div>

    <ButtonStandard
      icon="touch_app"
      name="install application"
      :disabled="installed || developmentMode || ios"
      :center="true"
      @button-clicked="onInstallClicked()"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import ButtonStandard from "@/components/shared/buttons/ButtonStandard.vue";

  export default defineComponent({
    name: "PwaInstall",
    props: {
      ios: Boolean,
      installed: Boolean,
      developmentMode: Boolean
    },
    components: {
      ButtonStandard
    },
    setup(props, { emit }) {
      const onInstallClicked = () => {
        emit("install-clicked");
      };

      return { onInstallClicked };
    }
  });
</script>

<style scoped lang="scss">
  .install {
    display: flex;
    flex-flow: column;
    align-items: center;

    p {
      color: $text-dark-secondary;
      text-align: center;
      margin: 20px 0;
    }
  }
</style>
