<template>
  <div class="order">
    <ul>
      <li
        v-for="order of orders"
        :key="order.id"
        :class="{ show: collapse === order.id }"
      >
        <div class="header" @click="onOrderClicked(order.id)">
          <div class="image">
            <img class="add" src="@/assets/icons/light/add.svg" />
            <img class="remove" src="@/assets/icons/light/remove.svg" />
          </div>
          <span class="title">
            Order {{ new Date(order.date).toLocaleDateString() }}
          </span>
          <span class="total">{{ formatCurrency(order.total) }}</span>
        </div>

        <div class="content">
          <div
            class="item"
            v-for="(product, index) of order.products"
            :key="`${product.productId}-${order.id}`"
          >
            <AccountOrderCard
              :orderId="order.id"
              :product="product"
              @review-clicked="onReviewClicked"
            />
            <hr v-if="index < order.products.length - 1" />
          </div>
        </div>
      </li>
    </ul>
    <span class="empty" v-if="orders.length === 0">
      you haven't purchased yet.
    </span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { IOrder, IOrderReview } from "@/interfaces/IOrder";
  import { formatCurrency } from "@/utils/FormatUtil";
  import AccountOrderCard from "./AccountOrderCard.vue";

  export default defineComponent({
    name: "AccountOrderAccordion",
    props: {
      collapse: String,
      orders: Array as () => IOrder[]
    },
    components: {
      AccountOrderCard
    },
    setup(props, { emit }) {
      const onOrderClicked = (orderId: string) => {
        emit("order-clicked", props.collapse !== orderId ? orderId : null);
      };

      const onReviewClicked = (review: IOrderReview) => {
        emit("review-clicked", review);
      };

      return {
        formatCurrency,
        onOrderClicked,
        onReviewClicked
      };
    }
  });
</script>

<style scoped lang="scss">
  .order {
    display: flex;
    flex-flow: column;

    .empty {
      color: $text-dark-secondary;
    }

    ul {
      list-style: none;
      color: $text-dark-secondary;

      li {
        display: flex;
        flex-flow: column;
        padding: 10px 0;

        &:not(:last-child) {
          border-bottom: 1px solid $divider;
        }

        &:last-child {
          .content {
            margin-bottom: 0;
          }
        }

        .content {
          margin: 20px 0 10px 0;
          transition: opacity 0.5s ease;
          opacity: 0;
          display: none;

          .item {
            hr {
              margin: 10px 0 15px 0;
              width: 100%;
              height: 1px;
              border-width: 0;
              color: $divider;
              background-color: $divider;
            }
          }
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .image {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            border: 0;
            background-color: $primary-color;
            padding: 3px;

            img {
              width: 15px;
              height: 15px;

              &.add {
                display: block;
              }

              &.remove {
                display: none;
              }
            }
          }

          .title {
            color: $text-dark;
            margin-left: 10px;
            flex: 1;
          }

          .total {
            color: $text-dark;
            font-weight: 600;
          }
        }

        &.show {
          .content {
            opacity: 1;
            display: block;
          }

          .header {
            .image {
              img {
                &.add {
                  display: none;
                }

                &.remove {
                  display: block;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
