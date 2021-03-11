<template>
  <div class="snackbar" :class="{ show: Boolean(message) }">
    <span>{{ message }}</span>
    <img src="@/assets/icons/light/clear.svg" @click="onSnackbarClicked" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, watch } from "vue";
  import { useStore } from "vuex";

  export default defineComponent({
    name: "ModalSnackbar",

    setup() {
      const duration = 5000;
      const store = useStore();
      const message = computed(() => store.getters.showSnackbar);

      let timeout = null;

      const onSnackbarClicked = () => {
        clearTimeout(timeout);
        store.dispatch("showSnackbar", null);
      };

      const closeSnackBar = () => {
        timeout = setTimeout(
          () => store.dispatch("showSnackbar", null),
          duration
        );
      };

      watch(message, (newVal: string) => {
        if (newVal) {
          closeSnackBar();
        }
      });

      return { message, onSnackbarClicked };
    }
  });
</script>

<style scoped lang="scss">
  .snackbar {
    visibility: hidden;
    background-color: $secondary-color;
    border-radius: 5px;
    box-shadow: 0px 2px 5px 0px rgba(#000, 0.8);
    padding: 16px;
    position: fixed;
    z-index: 1;
    width: 80%;
    bottom: 30px;
    left: 10%;
    right: 10%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    &.show {
      visibility: visible;
      // Add animation: Take 0.5 seconds to fade in and out the snackbar.
      // However, delay the fade out process for 2.5 seconds
      -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
      animation: fadein 0.5s, fadeout 0.5s 2.5s;
      animation-fill-mode: forwards;
    }

    span {
      font-size: 14px;
      color: $text-light;
    }

    img {
      margin-left: 16px;
      width: 16px;
      height: 16px;
    }
  }

  // Animations to fade the snackbar in and out
  @-webkit-keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 30px;
      opacity: 1;
    }
  }

  @keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 30px;
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeout {
    from {
      bottom: 30px;
      opacity: 1;
    }
    to {
      bottom: 0;
      opacity: 0;
    }
  }

  @keyframes fadeout {
    from {
      bottom: 30px;
      opacity: 1;
    }
    to {
      bottom: 0;
      opacity: 0;
    }
  }
</style>
