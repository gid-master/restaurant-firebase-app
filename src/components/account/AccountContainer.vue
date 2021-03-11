<template>
  <Wrapper>
    <Container>
      <Block>
        <AccountBio :user="state.user" @logout-clicked="onLogoutClicked" />
      </Block>
    </Container>

    <Container>
      <Block>
        <AccountOrderSummary :ordersSummary="state.ordersSummary" />
      </Block>
    </Container>

    <Container>
      <Block title="Completed Orders">
        <AccountOrderAccordion
          :collapse="state.collapse"
          :orders="state.orders"
          @order-clicked="onOrderClicked"
          @review-clicked="onReviewClicked"
        />
      </Block>
    </Container>
  </Wrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, onMounted } from "vue";
  import { useStore } from "vuex";
  import router from "@/router";

  import { IOrder, IOrderReview, IOrderSummary } from "@/interfaces/IOrder";
  import { IUser } from "@/interfaces/IUser";

  import Wrapper from "@/components/shared/layouts/Wrapper.vue";
  import Container from "@/components/shared/layouts/Container.vue";
  import Block from "@/components/shared/layouts/Block.vue";

  import AccountBio from "./presentational/AccountBio.vue";
  import AccountOrderSummary from "./presentational/AccountOrderSummary.vue";
  import AccountOrderAccordion from "./presentational/AccountOrderAccordion.vue";

  interface IState {
    user: IUser;
    orders: IOrder[];
    ordersSummary: IOrderSummary;
    collapse: string;
  }

  export default defineComponent({
    name: "AccountContainer",
    components: {
      Wrapper,
      Container,
      Block,
      AccountBio,
      AccountOrderSummary,
      AccountOrderAccordion
    },
    setup() {
      const store = useStore();
      const state: IState = reactive({
        user: computed(() => store.getters.user),
        orders: computed(() => store.getters.orders),
        ordersSummary: computed(() => store.getters.ordersSummary),
        collapse: null
      });

      onMounted(() => {
        store.dispatch("orders");
      });

      const onReviewClicked = (review: IOrderReview) => {
        store.dispatch("review", review);
      };

      const onOrderClicked = (orderId: string) => {
        state.collapse = orderId;
      };

      const onLogoutClicked = () => {
        store.dispatch("logout");
        router.push({ name: "login" });
      };

      return {
        state,
        onReviewClicked,
        onOrderClicked,
        onLogoutClicked
      };
    }
  });
</script>
