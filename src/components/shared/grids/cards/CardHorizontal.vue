<template>
  <div class="card">
    <img v-image-fallback :src="formatDynamicImage(product.image)" />
    <div class="details">
      <span class="title">{{ product.name }}</span>
      <p class="description">
        <small>
          {{ product.description }}
        </small>
      </p>
      <div class="actions">
        <span class="price">{{ formatCurrency(product.price) }} </span>
        <button
          class="button"
          type="button"
          @click="onProductClicked(product.sku)"
        >
          Order
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { formatCurrency, formatDynamicImage } from "@/utils/FormatUtil";
  import { IProduct } from "@/interfaces/IProduct";

  export default defineComponent({
    name: "CardHorizontal",
    props: {
      product: Object as () => IProduct
    },
    setup(props, { emit }) {
      const onProductClicked = (productSku: string) => {
        emit("product-clicked", productSku);
      };

      return { formatDynamicImage, formatCurrency, onProductClicked };
    }
  });
</script>

<style scoped lang="scss">
  .card {
    width: 100%;
    // height: 145px;
    border-radius: 10px;
    border: 1px solid $divider;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    background-color: $third-color;

    img {
      border-radius: 5px;
      // width: 129px;
      width: 40%;
      height: 100px;
      object-fit: cover;
      margin-right: 15px;
    }

    .details {
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // padding: 15px;
      // background-color: $third-color;

      .title {
        color: $text-dark;
      }

      .description {
        color: $text-dark-secondary;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        white-space: pre-wrap;
      }

      .actions {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .price {
          color: $text-dark;
        }

        .button {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: $gold;
          padding: 5px 10px;
          border-radius: 5px;
          border: 0;
          color: $text-light;
        }
      }
    }
  }
</style>
