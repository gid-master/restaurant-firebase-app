<template>
  <div class="card">
    <div class="item">
      <img
        class="image"
        v-image-fallback
        :src="formatDynamicImage(product.image)"
      />
      <div class="details">
        <span class="name">{{ product.quantity + "x " + product.name }}</span>
        <span class="price">{{ formatCurrency(product.total) }}</span>
        <div class="review">
          <img
            v-for="star in 5"
            :key="star"
            @click="onReviewClicked(product.itemId, star)"
            :src="require(`@/assets/icons/gold/${fillStar(star)}.svg`)"
          />
        </div>
      </div>
    </div>
    <div class="additionals" v-if="product.additionals.length > 0">
      <ul>
        <li v-for="additional of product.additionals" :key="additional.id">
          {{ `${additional.quantity * product.quantity}x ${additional.name}` }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { formatCurrency, formatDynamicImage } from "@/utils/FormatUtil";
  import { IOrderProduct } from "@/interfaces/IOrder";

  export default defineComponent({
    name: "AccountOrderCard",
    props: {
      orderId: String,
      product: Object as () => IOrderProduct
    },
    setup(props, { emit }) {
      const onReviewClicked = (itemId: string, review: number) => {
        if (props.product.review > 0) {
          return;
        }

        emit("review-clicked", {
          orderId: props.orderId,
          productId: props.product.productId,
          itemId,
          review
        });
      };

      const fillStar = (star: number): string => {
        return props.product.review >= star ? "star_full" : "star";
      };

      return { formatDynamicImage, formatCurrency, fillStar, onReviewClicked };
    }
  });
</script>

<style scoped lang="scss">
  .card {
    position: relative;
    width: 100%;

    .settings {
      position: absolute;
      top: 5px;
      left: 5px;
    }

    .item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .image {
        object-fit: cover;
        border-radius: 5px;
        min-width: 100px;
        width: 100px;
        height: 80px;
        margin-right: 15px;
      }

      .details {
        width: 100%;
        display: flex;
        flex-flow: column;
        align-items: space-between;
        justify-content: space-between;

        .name {
          color: $text-dark;
        }

        .price {
          color: $gold;
          margin: 3px 0;
        }

        .review {
          display: flex;
          align-items: center;
          margin-left: -3px;

          img {
            width: 25px;
            height: 25px;
            margin-right: 0px;
          }
        }
      }
    }

    .additionals {
      margin-top: 10px;

      ul {
        list-style: none;
        color: $text-dark-secondary;
        // font-size: 14px;

        li {
          position: relative;
          margin-left: 20px;

          &:not(:last-child) {
            margin-bottom: 5px;
          }

          &:before {
            content: "";
            position: absolute;
            border-right: 2px solid $primary-color;
            border-bottom: 2px solid $primary-color;
            width: 10px;
            height: 10px;
            top: 12px;
            left: -25px;
            transform: translateY(-50%) rotate(-45deg);
          }
        }
      }
    }
  }
</style>
