<template>
  <Wrapper v-if="state.cart.length === 0">
    <Container>
      <CheckoutEmpty @back-clicked="onGoBackClicked" />
    </Container>
  </Wrapper>

  <Wrapper v-if="state.cart.length > 0">
    <Container>
      <Block
        title="Your Products"
        link="keep ordering"
        @link-clicked="onKeepOrderingClicked"
      >
        <CheckoutProducts :cart="state.cart" @cart-clicked="onCartClicked" />
      </Block>
    </Container>

    <Container>
      <Block title="Payment Details">
        <CheckoutPaymentMethod
          ref="paymentMethodRef"
          :paymentMethod="state.paymentMethod"
          :disabled="state.processing"
          @payment-method-selected="onPaymentMethodSelected"
          @payment-method-submitted="onPaymentMethodSubmitted"
        />
      </Block>
    </Container>

    <Container>
      <Block title="Your Summary" subtitle="double check each item before">
        <CheckoutTotal :cartSummary="state.cartSummary" />
      </Block>
    </Container>

    <Container>
      <ButtonStandard
        v-if="state.user"
        icon="cart"
        name="Complete the Payment"
        :center="true"
        :disabled="state.processing"
        @button-clicked="onPaymentClicked"
      />

      <ButtonStandard
        v-if="!state.user"
        icon="profile"
        name="Login to proceed"
        :center="true"
        @button-clicked="onLoginClicked"
      />
    </Container>
  </Wrapper>

  <ModalBottomSheet id="actions" title="Change your order ?">
    <CheckoutAction
      :cart="state.preferredCart"
      @edit-cart-clicked="onEditCartClicked"
      @delete-cart-clicked="onDeleteCartClicked"
    />
  </ModalBottomSheet>

  <ModalSuccess
    id="payment"
    button="keep ordering"
    title="Processing your order"
    message="your order was processed successfully"
    :processed="state.processed"
    @modal-clicked="onOrderProcessed"
  />
</template>

<script lang="ts">
  import { defineComponent, reactive, watch, computed, ref } from "vue";
  import { useStore } from "vuex";
  import router from "@/router";

  import { formatCurrency } from "@/utils/FormatUtil";
  import { ICart, ICartSummary } from "@/interfaces/ICart";
  import {
    ICheckoutResponse,
    ICreditCard,
    PaymentMethodEnum
  } from "@/interfaces/ICheckout";

  import Wrapper from "@/components/shared/layouts/Wrapper.vue";
  import Container from "@/components/shared/layouts/Container.vue";
  import Block from "@/components/shared/layouts/Block.vue";
  import ButtonStandard from "@/components/shared/buttons/ButtonStandard.vue";
  import ModalBottomSheet from "@/components/shared/modals/ModalBottomSheet.vue";
  import ModalSuccess from "@/components/shared/modals/ModalSuccess.vue";

  import CheckoutProducts from "./presentational/CheckoutProducts.vue";
  import CheckoutPaymentMethod from "./presentational/CheckoutPaymentMethod.vue";
  import CheckoutTotal from "./presentational/CheckoutTotal.vue";
  import CheckoutAction from "./presentational/CheckoutAction.vue";
  import CheckoutEmpty from "./presentational/CheckoutEmpty.vue";

  interface IState {
    cart: ICart[];
    cartSummary: ICartSummary;
    paymentMethod: PaymentMethodEnum;
    creditCard: ICreditCard;
    giftCard: string;
    preferredCart: ICart;
    processing: boolean;
    processed: boolean;
  }

  export default defineComponent({
    name: "CheckoutContainer",
    components: {
      Wrapper,
      Container,
      Block,
      ButtonStandard,
      ModalBottomSheet,
      ModalSuccess,
      CheckoutProducts,
      CheckoutPaymentMethod,
      CheckoutTotal,
      CheckoutAction,
      CheckoutEmpty
    },
    setup() {
      const paymentMethodRef = ref(null);
      const store = useStore();
      const checkout = computed(() => store.getters.checkout);

      const state: IState = reactive({
        user: computed(() => store.getters.user),
        cart: computed(() => store.getters.cart),
        cartSummary: computed(() => store.getters.cartSummary),
        paymentMethod: PaymentMethodEnum.CREDIT_CARD,
        creditCard: null,
        giftCard: null,
        preferredCart: null,
        processing: false,
        processed: false
      });

      watch(checkout, (response: ICheckoutResponse) => {
        if (response.success) {
          state.processed = true;
        } else {
          state.processing = false;
          store.dispatch("showModal", { show: false });
          store.dispatch("showSnackbar", response.message);
        }
      });

      const onGoBackClicked = () => {
        router.push({ name: "menu" });
      };

      const onKeepOrderingClicked = () => {
        router.push({ name: "menu" });
      };

      const onCartClicked = (cartId: string) => {
        state.preferredCart = state.cart.find(
          (data: ICart) => data.id === cartId
        );

        store.dispatch("showModal", { show: true, id: "actions" });
      };

      const onPaymentMethodSelected = (paymentMethod: PaymentMethodEnum) => {
        state.paymentMethod = paymentMethod;
      };

      const onPaymentMethodSubmitted = (
        creditCard: ICreditCard,
        giftCard: string
      ) => {
        state.creditCard = creditCard;
        state.giftCard = giftCard;
      };

      const onPaymentClicked = () => {
        paymentMethodRef.value.submitPaymentMethod();

        if (paymentMethodRef.value.isPaymentMethodInvalid()) {
          store.dispatch("showSnackbar", "Payment details are compulsory");
          return;
        }

        state.processing = true;
        state.processed = false;

        store.dispatch("showModal", {
          show: true,
          id: "payment",
          disableClick: true
        });

        store.dispatch("checkout", {
          products: state.cart.map(data => data.product),
          paymentMethod: state.paymentMethod,
          giftCard: state.giftCard,
          creditCard: state.creditCard
        });
      };

      const onEditCartClicked = (cartId: string, productSku: string) => {
        router.push({
          name: "product",
          params: { id: productSku },
          query: { edit: cartId }
        });
        store.dispatch("showModal", { show: false });
      };

      const onDeleteCartClicked = (cartId: string) => {
        store.dispatch("deleteCart", cartId);
        store.dispatch("showModal", { show: false });
      };

      const onOrderProcessed = () => {
        router.push({ name: "menu" });
        store.dispatch("showModal", { show: false });
      };

      const onLoginClicked = () => {
        router.push({ name: "login" });
      };

      return {
        paymentMethodRef,
        state,
        formatCurrency,
        onGoBackClicked,
        onKeepOrderingClicked,
        onCartClicked,
        onPaymentMethodSelected,
        onPaymentMethodSubmitted,
        onPaymentClicked,
        onEditCartClicked,
        onDeleteCartClicked,
        onOrderProcessed,
        onLoginClicked
      };
    }
  });
</script>
