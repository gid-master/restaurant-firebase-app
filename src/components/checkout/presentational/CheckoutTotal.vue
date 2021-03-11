<template>
  <div class="total">
    <div class="item">
      <span class="title">Main meals ({{ cartSummary.quantityProducts }})</span>
      <span class="price">{{ formatCurrency(cartSummary.totalProducts) }}</span>
    </div>
    <div class="item">
      <span class="title"
        >Additional items ({{ cartSummary.quantityAdditionals }})</span
      >
      <span class="price">{{
        formatCurrency(cartSummary.totalAdditionals)
      }}</span>
    </div>
    <hr />
    <div class="item highlight">
      <span class="title">TOTAL</span>
      <span class="price">{{ formatCurrency(cartSummary.total) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { formatCurrency } from "@/utils/FormatUtil";
  import { ICartSummary } from "@/interfaces/ICart";

  export default defineComponent({
    name: "CheckoutTotal",
    props: {
      cartSummary: Object as () => ICartSummary
    },
    setup() {
      return {
        formatCurrency
      };
    }
  });
</script>

<style scoped lang="scss">
  .total {
    hr {
      margin: 15px 0;
      width: 100%;
      height: 1px;
      border-width: 0;
      color: $divider;
      background-color: $divider;
    }

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:not(:last-child) {
        margin-bottom: 10px;
      }

      .title {
        color: $text-dark;
      }

      .price {
        color: $text-dark-secondary;
      }

      &.highlight {
        span {
          font-weight: 600;
        }
      }
    }
  }
</style>
