<template>
  <div class="payment">
    <div class="item">
      <div class="header">
        <img class="image" src="@/assets/icons/dark/card.svg" />
        <span class="title">Credit Card</span>
        <div class="checkbox">
          <input
            type="radio"
            name="radioPaymentMethod"
            id="radioCraditCard"
            :disabled="disabled"
            :checked="paymentMethod === PaymentMethodEnum.CREDIT_CARD"
            @click="onPaymentMethodSelected(PaymentMethodEnum.CREDIT_CARD)"
          />
          <label for="radioCraditCard"></label>
        </div>
      </div>

      <div
        class="content"
        :class="{ open: paymentMethod === PaymentMethodEnum.CREDIT_CARD }"
      >
        <CheckoutCreditCard
          ref="creditCardRef"
          :disabled="disabled"
          @form-changed="onCreditCardChanged"
        />
      </div>
    </div>
    <div class="item">
      <div class="header">
        <img class="image" src="@/assets/icons/dark/gift.svg" />
        <span class="title">Gift Card</span>
        <div class="checkbox">
          <input
            type="radio"
            name="radioPaymentMethod"
            id="radioGiftCard"
            :disabled="disabled"
            :checked="paymentMethod === PaymentMethodEnum.GIFT_CARD"
            @click="onPaymentMethodSelected(PaymentMethodEnum.GIFT_CARD)"
          />
          <label for="radioGiftCard"></label>
        </div>
      </div>

      <div
        class="content"
        :class="{ open: paymentMethod === PaymentMethodEnum.GIFT_CARD }"
      >
        <CheckoutGiftCard
          ref="giftCardRef"
          :disabled="disabled"
          @form-changed="onGiftCardChanged"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from "vue";
  import { ICreditCard, PaymentMethodEnum } from "@/interfaces/ICheckout";
  import CheckoutCreditCard from "./CheckoutCreditCard.vue";
  import CheckoutGiftCard from "./CheckoutGiftCard.vue";

  export default defineComponent({
    name: "CheckoutPaymentMethod",
    props: {
      disabled: Boolean,
      paymentMethod: String as () => PaymentMethodEnum
    },
    components: {
      CheckoutCreditCard,
      CheckoutGiftCard
    },
    setup(props, { emit }) {
      const creditCardRef = ref(null);
      const giftCardRef = ref(null);

      const state = reactive({
        creditCard: null,
        giftCard: null
      });

      const onCreditCardChanged = (creditCard: ICreditCard) => {
        state.creditCard = creditCard;
      };

      const onGiftCardChanged = (giftCard: string) => {
        state.giftCard = giftCard;
      };

      const onPaymentMethodSelected = (paymentMethod: PaymentMethodEnum) => {
        if (props.disabled || props.paymentMethod === paymentMethod) {
          return;
        }

        creditCardRef.value.reset();
        giftCardRef.value.reset();

        emit("payment-method-selected", paymentMethod);
      };

      const submitPaymentMethod = () => {
        if (props.paymentMethod === PaymentMethodEnum.CREDIT_CARD) {
          creditCardRef.value.submit();
          emit("payment-method-submitted", state.creditCard, null);
        } else {
          giftCardRef.value.submit();
          emit("payment-method-submitted", null, state.giftCard);
        }
      };

      const isPaymentMethodInvalid = (): boolean => {
        if (props.paymentMethod === PaymentMethodEnum.CREDIT_CARD) {
          return creditCardRef.value.isInvalid();
        } else {
          return giftCardRef.value.isInvalid();
        }
      };

      return {
        creditCardRef,
        giftCardRef,
        isPaymentMethodInvalid,
        submitPaymentMethod,
        PaymentMethodEnum,
        onPaymentMethodSelected,
        onCreditCardChanged,
        onGiftCardChanged
      };
    }
  });
</script>

<style scoped lang="scss">
  .payment {
    .item {
      width: 100%;
      padding: $padding;
      border: 1px solid $divider;
      border-radius: 8px;

      &:not(:last-child) {
        margin-bottom: $app-vertical;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
          color: $text-dark;
          margin-left: 10px;
          flex: 1;
        }

        .checkbox {
          input[type="radio"][id^="radio"] {
            display: none;

            &:checked + label {
              border-color: $text-light;
            }

            &:checked + label:before {
              content: "✓";
              background-color: $primary-color;
              transform: scale(1);
            }

            &:disabled + label {
              border-color: $text-light-secondary;
            }

            &:disabled + label:before {
              background-color: $text-light-secondary;
            }
          }

          label {
            cursor: pointer;
            width: 24px;
            height: 24px;
            border-radius: 30px;
            border: 2px solid $primary-color;

            display: block;
            position: relative;

            &:before {
              background-color: $third-color;
              color: $text-light;
              content: " ";
              display: block;
              border-radius: 50%;
              border: 0px solid $primary-color;
              position: absolute;
              top: -3px;
              left: -3px;
              width: 24px;
              height: 24px;
              text-align: center;
              line-height: 28px;
              transition-duration: 0.4s;
              transform: scale(0);
            }
          }
        }
      }

      .content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        max-height: 0;
        overflow: hidden;
        transition: all 0.3s ease;
        opacity: 0;

        &.open {
          opacity: 1;
          max-height: 350px;
        }
      }
    }
  }
</style>
