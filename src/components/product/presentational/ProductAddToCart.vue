<template>
  <div class="add-to-cart">
    <div class="increment">
      <ButtonIncrement
        :large="true"
        :disabledMin="quantity === 1"
        :disabledMax="false"
        :quantity="quantity"
        @increment-clicked="onIncrementClicked"
      />
    </div>

    <div class="add">
      <ButtonStandard
        icon="add"
        name="add to cart"
        :detail="formatCurrency(total)"
        :center="false"
        :disabled="false"
        :small="true"
        @button-clicked="onAddClicked()"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { formatCurrency } from "@/utils/FormatUtil";
  import ButtonStandard from "@/components/shared/buttons/ButtonStandard.vue";
  import ButtonIncrement from "@/components/shared/buttons/ButtonIncrement.vue";

  export default defineComponent({
    name: "ProductAddToCart",
    props: {
      quantity: Number,
      total: Number
    },
    components: {
      ButtonStandard,
      ButtonIncrement
    },
    setup(props, { emit }) {
      const onAddClicked = () => {
        emit("add-clicked");
      };

      const onIncrementClicked = (increment: number) => {
        emit("increment-clicked", increment);
      };

      return { formatCurrency, onAddClicked, onIncrementClicked };
    }
  });
</script>

<style scoped lang="scss">
  .add-to-cart {
    padding: $padding;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: $toolbar;
    background-color: $third-color;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);

    display: flex;
    align-items: center;
    justify-content: space-between;

    .increment {
      width: 30%;
      margin-right: 20px;
    }

    .add {
      flex: 1;
    }
  }
</style>
