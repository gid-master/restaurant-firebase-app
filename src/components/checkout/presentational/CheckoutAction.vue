<template>
  <div class="action" v-if="cart">
    <span>{{
      `${cart.product.quantity}x ${cart.product.name} - ${formatCurrency(
        total
      )}`
    }}</span>
    <div class="item">
      <ButtonStandard
        icon="edit"
        name="Change item of this order"
        :center="true"
        :disabled="false"
        @button-clicked="onEditCartClicked(cart.id, cart.product.sku)"
      />
    </div>
    <div class="item">
      <ButtonStandard
        icon="delete"
        name="Remove item from this order"
        :center="true"
        :disabled="false"
        @button-clicked="onDeleteCartClicked(cart.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";
  import { formatCurrency } from "@/utils/FormatUtil";
  import ButtonStandard from "@/components/shared/buttons/ButtonStandard.vue";
  import { ICart } from "@/interfaces/ICart";

  export default defineComponent({
    name: "CheckoutAction",
    props: {
      cart: Object as () => ICart
    },
    components: {
      ButtonStandard
    },
    setup(props, { emit }) {
      const total = computed(() => {
        const additionals: number = props.cart.product.additionals.reduce(
          (total: number, { quantity, price }) => total + quantity * price,
          0
        );

        return (
          (additionals + props.cart.product.price) * props.cart.product.quantity
        );
      });

      const onEditCartClicked = (cartId: string, productSku: string) => {
        emit("edit-cart-clicked", cartId, productSku);
      };

      const onDeleteCartClicked = (cartId: string) => {
        emit("delete-cart-clicked", cartId);
      };

      return { total, formatCurrency, onEditCartClicked, onDeleteCartClicked };
    }
  });
</script>

<style scoped lang="scss">
  .action {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-flow: column;

    span {
      color: $text-dark-secondary;
      text-align: center;
      margin: 10px 0;
    }

    .item {
      width: 100%;
      margin-top: 15px;
    }
  }
</style>
