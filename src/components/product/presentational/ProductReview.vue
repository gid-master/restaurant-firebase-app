<template>
  <div class="review">
    <div class="summary">
      <div class="stars">
        <img src="@/assets/icons/gold/star.svg" />
        <span>{{
          (reviews.totalRating / reviews.totalReviews).toFixed(1)
        }}</span>
      </div>
      <span>{{ reviews.totalReviews }} reviews</span>
    </div>

    <div class="overview">
      <div class="vote" v-for="index in 5" :key="index">
        <span class="star">{{ index }}</span>
        <div class="bar">
          <div
            class="progress"
            :style="
              `width:${(reviews['rating' + index] * 100) /
                reviews.totalReviews}%`
            "
          ></div>
        </div>
        <span class="quantity">{{ reviews["rating" + index] }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { IProductReview } from "@/interfaces/IProduct";

  export default defineComponent({
    name: "ProductReview",
    props: {
      reviews: Object as () => IProductReview
    }
  });
</script>

<style scoped lang="scss">
  .review {
    width: 100%;

    .summary {
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        color: $text-dark;
      }

      .stars {
        width: auto;
        display: flex;
        align-items: center;
        margin-left: -3px;

        img {
          width: 24px;
          height: 24px;
          margin-top: -3px;
          margin-right: 3px;
        }
      }
    }

    .overview {
      display: flex;
      flex-flow: column;
      margin-top: 10px;

      .vote {
        margin-top: 5px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .star {
          width: 10px;
          color: $text-dark-secondary;
          text-align: center;
        }

        .bar {
          margin: 0 10px;
          height: 15px;
          // width: 300px;
          flex: 1;
          background-color: $inputs;

          .progress {
            height: 100%;
            background-color: $primary-color;
          }
        }

        .quantity {
          text-align: center;
          // border: 1px solid red;
          width: 20px;
          color: $text-dark-secondary;
        }
      }
    }
  }
</style>
