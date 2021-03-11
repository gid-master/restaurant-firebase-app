<template>
  <div class="summary">
    <div class="item">
      <span class="title">orders</span>
      <span class="result">{{ ordersSummary.quantityOrders }}</span>
    </div>
    <div class="separator"></div>
    <div class="item">
      <span class="title">amount</span>
      <span class="result">{{
        formatCurrency(ordersSummary.totalProducts)
      }}</span>
    </div>
    <div class="separator"></div>
    <div class="item">
      <span class="title">products</span>
      <span class="result">{{ ordersSummary.quantityProducts }}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { formatCurrency } from "@/utils/FormatUtil";
  import { IOrderSummary } from "@/interfaces/IOrder";

  export default defineComponent({
    name: "AccountOrderSummary",
    props: {
      ordersSummary: Object as () => IOrderSummary
    },
    setup() {
      return {
        formatCurrency
      };
    }
  });
</script>

<style scoped lang="scss">
  .summary {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .separator {
      width: 1px;
      background-color: $divider;
      height: 30px;
    }

    .item {
      display: flex;
      flex-flow: column;
      align-items: center;

      .title {
        color: $text-dark;
        font-weight: 600;
        margin: 0 0 5px 0;
      }

      .result {
        color: $text-dark-secondary;
        margin: 0;
      }
    }
  }
</style>
