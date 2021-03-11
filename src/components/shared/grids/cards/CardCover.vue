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
        <span class="price">
          {{ formatCurrency(product.price) }}
          <small class="discount" v-if="product.previousPrice > 0">{{
            formatCurrency(product.previousPrice)
          }}</small>
        </span>
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
    name: "CardCover",
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
    border: 1px solid $divider;
    position: relative;
    border-radius: 10px;
    // width: 277px;
    width: 100%;
    height: 267px;

    display: flex;
    justify-content: center;

    img {
      border-radius: 10px;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    .details {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 15px;
      background-color: $third-color;
      position: absolute;
      border-radius: 10px;
      width: 90%;
      height: 139px;
      bottom: 20px;

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

          .discount {
            margin-left: 5px;
            text-decoration: line-through;
            color: $text-dark-secondary;
            font-size: 12px;
          }
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
