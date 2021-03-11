<template>
  <div class="list">
    <div class="item" v-for="(item, index) of cart" :key="item.id">
      <CheckoutProductCard
        :product="item.product"
        @cart-clicked="onCartClicked(item.id)"
      />
      <hr v-if="index < cart.length - 1" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { ICart } from "@/interfaces/ICart";
  import CheckoutProductCard from "./CheckoutProductCard.vue";

  export default defineComponent({
    name: "CheckoutProducts",
    props: {
      cart: Array as () => ICart[]
    },
    components: {
      CheckoutProductCard
    },
    setup(props, { emit }) {
      const onCartClicked = (cartId: string) => {
        emit("cart-clicked", cartId);
      };

      return { onCartClicked };
    }
  });
</script>

<style scoped lang="scss">
  .list {
    .item {
      hr {
        margin: 20px 0;
        width: 100%;
        height: 1px;
        border-width: 0;
        color: $divider;
        background-color: $divider;
      }
    }
  }
</style>
