<template>
  <div class="card">
    <div class="settings">
      <ButtonCircle
        icon="more"
        :small="true"
        :light="true"
        @button-clicked="onCartClicked"
      />
    </div>
    <div class="item">
      <img
        class="image"
        v-image-fallback
        :src="formatDynamicImage(product.image)"
      />
      <div class="details">
        <span class="name">{{ product.quantity + "x " + product.name }}</span>
        <span class="price">{{ formatCurrency(total) }}</span>
        <div class="category">
          <img :src="require(`@/assets/categories/${product.category}.svg`)" />
          <span>{{ product.category }}</span>
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
  import { defineComponent, computed } from "vue";
  import { formatCurrency, formatDynamicImage } from "@/utils/FormatUtil";
  import ButtonCircle from "@/components/shared/buttons/ButtonCircle.vue";
  import { IProduct, IProductAdditional } from "@/interfaces/IProduct";

  export default defineComponent({
    name: "CheckoutProductCard",
    props: {
      product: Object as () => IProduct
    },
    components: {
      ButtonCircle
    },
    setup(props, { emit }) {
      const onCartClicked = () => {
        emit("cart-clicked");
      };

      const total = computed(() => {
        const additionals: number = props.product.additionals.reduce(
          (total: number, additional: IProductAdditional) =>
            total + additional.quantity * additional.price,
          0
        );

        return (additionals + props.product.price) * props.product.quantity;
      });

      return { formatDynamicImage, formatCurrency, total, onCartClicked };
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

        .category {
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
            top: 12px; // calc(50% - 4px);
            left: -25px;
            transform: translateY(-50%) rotate(-45deg);
          }
        }
      }
    }
  }
</style>
