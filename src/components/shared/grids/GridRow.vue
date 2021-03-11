<template>
  <div class="row">
    <div
      class="item"
      :class="{
        cover: type === 'cover',
        vertical: type === 'vertical',
        horizontal: type === 'horizontal'
      }"
      v-for="product of products"
      :key="product.id"
    >
      <CardCover
        v-if="type === 'cover'"
        :product="product"
        @product-clicked="onProductClicked"
      />
      <CardVertical
        v-if="type === 'vertical'"
        :product="product"
        @product-clicked="onProductClicked"
      />
      <CardHorizontal
        v-if="type === 'horizontal'"
        :product="product"
        @product-clicked="onProductClicked"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import CardCover from "./cards/CardCover.vue";
  import CardVertical from "./cards/CardVertical.vue";
  import CardHorizontal from "./cards/CardHorizontal.vue";
  import { IProduct } from "@/interfaces/IProduct";

  export default defineComponent({
    name: "GridRow",
    props: {
      type: String, // vertical, horizontal, cover
      products: Object as () => IProduct[]
    },
    components: {
      CardCover,
      CardVertical,
      CardHorizontal
    },
    setup(props, { emit }) {
      const onProductClicked = (productSku: string) => {
        emit("product-clicked", productSku);
      };

      return { onProductClicked };
    }
  });
</script>

<style scoped lang="scss">
  .row {
    width: 100vw;
    margin-left: -$app-horizontal;
    padding: 0 $app-horizontal;
    overflow-x: auto;
    white-space: nowrap;
    scroll-snap-type: x mandatory;

    .item {
      display: inline-block;

      &:not(:last-child) {
        margin-right: $padding;
      }

      &.cover {
        width: 280px;
      }

      &.vertical {
        width: 230px;
      }

      &.horizontal {
        width: 100%;
        scroll-snap-align: center;

        &:not(:last-child) {
          margin-right: $padding;
        }
      }
    }
  }
</style>
