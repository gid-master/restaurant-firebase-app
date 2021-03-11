<template>
  <div class="empty">
    <div class="image">
      <img src="@/assets/icons/primary/cart.svg" />
    </div>
    <h2>Your cart is still empty</h2>
    <p>pick something from our menu</p>
    <ButtonStandard
      icon="menu"
      name="check out our menu"
      :center="true"
      @button-clicked="onGoBackClicked"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import ButtonStandard from "@/components/shared/buttons/ButtonStandard.vue";

  export default defineComponent({
    name: "CheckoutEmpty",
    components: {
      ButtonStandard
    },
    setup(props, { emit }) {
      const onGoBackClicked = () => {
        emit("back-clicked");
      };

      return {
        onGoBackClicked
      };
    }
  });
</script>

<style scoped lang="scss">
  .empty {
    padding: 0 20px;
    margin-top: calc(50% - #{$toolbar});
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;

    .image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 5px solid $primary-color;

      img {
        padding: 15px;
        width: 100%;
        height: 100%;
      }
    }

    h2 {
      font-weight: 500;
      color: $text-dark-secondary;
      margin-bottom: 10px;
    }

    p {
      color: $text-dark-secondary;
      margin-bottom: 20px;
    }
  }
</style>
