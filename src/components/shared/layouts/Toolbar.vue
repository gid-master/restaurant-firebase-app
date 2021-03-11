<template>
  <div class="toolbar">
    <ButtonIcon
      name="Home"
      icon="store"
      :selected="toolbarId === 'home'"
      @button-clicked="onToolbarClicked('home')"
    />

    <ButtonIcon
      name="Menu"
      icon="menu"
      :selected="toolbarId === 'menu'"
      @button-clicked="onToolbarClicked('menu')"
    />

    <ButtonIcon
      name="Checkout"
      icon="cart"
      :badge="cartQuantity"
      :selected="toolbarId === 'checkout'"
      @button-clicked="onToolbarClicked('checkout')"
    />

    <ButtonIcon
      name="Account"
      icon="profile"
      :selected="toolbarId === 'account'"
      @button-clicked="onToolbarClicked('account')"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import ButtonIcon from "@/components/shared/buttons/ButtonIcon.vue";

  export default defineComponent({
    name: "Toolbar",
    props: {
      cartQuantity: Number,
      toolbarId: String
    },
    components: {
      ButtonIcon
    },
    setup(props, { emit }) {
      const onToolbarClicked = (toolbarId: string) => {
        emit("toolbar-clicked", toolbarId);
      };

      return { onToolbarClicked };
    }
  });
</script>

<style scoped lang="scss">
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: $toolbar;
    background-color: $third-color;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-around;
  }
</style>
