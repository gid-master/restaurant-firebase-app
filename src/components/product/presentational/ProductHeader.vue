<template>
  <div class="header">
    <div class="image-cover">
      <div class="back">
        <ButtonCircle
          icon="arrow_back"
          :light="true"
          @button-clicked="onBackClicked"
        />
      </div>
      <img v-image-fallback :src="formatDynamicImage(product.image)" />
    </div>
    <div class="details">
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>

      <div class="row">
        <span class="price">
          {{ formatCurrency(product.price) }}
          <small class="discount" v-if="product.previousPrice > 0">{{
            formatCurrency(product.previousPrice)
          }}</small>
        </span>
        <div class="category">
          <img :src="require(`@/assets/categories/${product.category}.svg`)" />
          <span>{{ product.category }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { formatCurrency, formatDynamicImage } from "@/utils/FormatUtil";
  import { IProduct } from "@/interfaces/IProduct";
  import ButtonCircle from "@/components/shared/buttons/ButtonCircle.vue";

  export default defineComponent({
    name: "ProductHeader",
    props: {
      product: Object as () => IProduct
    },
    components: {
      ButtonCircle
    },
    setup(props, { emit }) {
      const onBackClicked = () => {
        emit("back-clicked");
      };

      return { formatDynamicImage, formatCurrency, onBackClicked };
    }
  });
</script>

<style scoped lang="scss">
  .header {
    width: 100%;

    .image-cover {
      z-index: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 250px;
      // background-color: #e5e5e5;
      box-shadow: 0px 2px 5px 0px rgba(#000, 0.1);

      .back {
        position: absolute;
        top: 0;
        left: 0;
        margin: $app-vertical $app-horizontal;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .details {
      z-index: 1;
      width: calc(100% - (#{$app-horizontal}));
      margin: 150px auto 0 auto;

      background: $third-color;
      padding: $app-vertical $app-horizontal;
      box-shadow: 0px 4px 10px -7px rgba(0, 0, 0, 0.25);
      border-radius: 10px;

      display: flex;
      flex-flow: column;
      // align-items: center;

      h2 {
        color: $text-dark;
        text-align: center;
      }

      p {
        color: $text-dark-secondary;
        text-align: center;
        margin: $padding 0;
      }

      .row {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .price {
          color: $text-dark;

          .discount {
            margin-left: 5px;
            text-decoration: line-through;
            color: $text-dark-secondary;
          }
        }

        .category {
          display: flex;
          align-items: center;
          justify-content: space-between;

          img {
            width: 20px;
            height: 20px;
            margin-right: 5px;
          }

          span {
            color: $text-dark;
          }
        }
      }
    }
  }
</style>
