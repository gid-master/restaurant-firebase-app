<template>
  <div class="shortcut">
    <HomeShortcutButton
      name="Menu"
      icon="menu"
      @button-clicked="onButtonClicked('menu')"
    />

    <HomeShortcutButton
      name="Account"
      icon="profile"
      @button-clicked="onButtonClicked('account')"
    />

    <HomeShortcutButton
      name="Install"
      icon="touch_app"
      @button-clicked="onButtonClicked('install')"
    />

    <HomeShortcutButton
      name="about"
      icon="help"
      @button-clicked="onButtonClicked('about')"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import HomeShortcutButton from "./HomeShortcutButton.vue";

  export default defineComponent({
    name: "HomeShortcut",
    components: {
      HomeShortcutButton
    },
    setup(props, { emit }) {
      const onButtonClicked = (option: string) => {
        emit("button-clicked", option);
      };

      return { onButtonClicked };
    }
  });
</script>

<style scoped lang="scss">
  .shortcut {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
  }
</style>
