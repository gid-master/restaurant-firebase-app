<template>
  <div class="card" @click="onProductClicked(product.sku)">
    <div class="macro">
      <img
        class="image"
        v-image-fallback
        :src="formatDynamicImage(product.image)"
      />
      <div class="details">
        <span class="name">{{ product.name }}</span>
        <div class="row1">
          <span class="price">
            <small>{{ formatCurrency(product.price) }}</small>
            <small class="discount" v-if="product.previousPrice > 0">{{
              formatCurrency(product.previousPrice)
            }}</small>
          </span>
          <span class="calories">
            <small>{{ product.calories }}cal</small>
          </span>
        </div>
        <div class="row2">
          <div class="category">
            <img
              :src="require(`@/assets/categories/${product.category}.svg`)"
            />
            <!-- <img src="@/assets/icons/category/meals.svg" /> -->
            <span
              ><small>{{ product.category }}</small></span
            >
          </div>

          <div class="review">
            <img src="@/assets/icons/gold/star.svg" />
            <span
              ><small
                >{{
                  (
                    product.reviews.totalRating / product.reviews.totalReviews
                  ).toFixed(1)
                }}
                ({{ product.reviews.totalReviews }})</small
              ></span
            >
          </div>
        </div>
      </div>
    </div>
    <p class="description">
      <small>
        {{ product.description }}
      </small>
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { formatCurrency, formatDynamicImage } from "@/utils/FormatUtil";
  import { IProduct } from "@/interfaces/IProduct";

  export default defineComponent({
    name: "CardDetails",
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

    .macro {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      .image {
        border: 1px solid $divider;
        object-fit: cover;
        border-radius: 5px;
        min-width: 100px;
        height: 80px;
        margin-right: 15px;
      }

      .details {
        width: 100%;
        // border: 1px solid red;
        display: flex;
        flex-flow: column;
        align-items: space-between;
        justify-content: space-between;

        .name {
          color: $text-dark;
        }

        .row1 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 5px 0;

          .price {
            color: $gold;

            .discount {
              margin-left: 5px;
              text-decoration: line-through;
              color: $text-dark-secondary;
              font-size: 12px;
            }
          }

          .calories {
            color: $text-dark-secondary;
          }
        }

        .row2 {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .category,
          .review {
            display: flex;
            align-items: center;

            img {
              width: 20px;
              height: 20px;
              margin-right: 5px;
            }

            span {
              color: $text-dark;
            }
          }

          .review {
            img {
              margin-right: 0px;
            }
          }
        }
      }
    }

    .description {
      color: $text-dark-secondary;
    }
  }
</style>
