<template>
  <form novalidate class="form">
    <div class="controller" :class="{ error: stateForm.nameHolder.$invalid }">
      <label class="label"><small>Name on card</small></label>
      <input
        type="text"
        class="input"
        :disabled="disabled"
        v-model="stateForm.nameHolder.$model"
        @blur="onFormChanged"
      />
      <span class="message" v-if="stateForm.nameHolder.$invalid">
        <small v-for="error in stateForm.nameHolder.$errors" :key="error">
          {{ error.$message }}
        </small>
      </span>
    </div>

    <div class="controller" :class="{ error: stateForm.cardNumber.$invalid }">
      <label class="label"><small>Card number</small></label>
      <input
        type="number"
        class="input"
        :disabled="disabled"
        v-model="stateForm.cardNumber.$model"
        @blur="onFormChanged"
      />
      <span class="message" v-if="stateForm.cardNumber.$invalid">
        <small v-for="error in stateForm.cardNumber.$errors" :key="error">
          {{ error.$message }}
        </small>
      </span>
    </div>

    <div class="controller half" :class="{ error: stateForm.cvv.$invalid }">
      <label class="label"><small>CVV</small></label>
      <input
        type="number"
        class="input"
        :disabled="disabled"
        v-model="stateForm.cvv.$model"
        @blur="onFormChanged"
      />
      <span class="message" v-if="stateForm.cvv.$invalid">
        <small v-for="error in stateForm.cvv.$errors" :key="error">
          {{ error.$message }}
        </small>
      </span>
    </div>

    <div
      class="controller half"
      :class="{ error: stateForm.expiration.$invalid }"
    >
      <label class="label"><small>Expiration</small></label>
      <input
        maxlength="6"
        type="number"
        class="input"
        :disabled="disabled"
        v-model="stateForm.expiration.$model"
        @blur="onFormChanged"
      />
      <span class="message" v-if="stateForm.expiration.$invalid">
        <small v-for="error in stateForm.expiration.$errors" :key="error">
          {{ error.$message }}
        </small>
      </span>
    </div>
  </form>
</template>

<script lang="ts">
  import { defineComponent, reactive, Ref } from "vue";
  import { useVuelidate, Validation } from "@vuelidate/core";
  import { required, maxLength } from "@vuelidate/validators";

  export default defineComponent({
    name: "CheckoutCreditCard",
    props: {
      disabled: Boolean
    },
    setup(props, { emit }) {
      const state = reactive({
        nameHolder: null,
        cardNumber: null,
        cvv: null,
        expiration: null
      });

      // Dumb card validation used to demonstrate custom validation
      const creditCardValidation = {
        $validator: value => {
          if (!value || value.length > 16) {
            return true;
          }
          // using regex
          // return /^(\d{4}[- ]){3}\d{4}|\d{16}$/.test(value);
          return value.length === 16;
        },
        $message: "Credit card invalid"
      };

      // Here was just added a few validation as example
      // You can add complex ones if you want, but the idea was to show
      // how simple we can create custom validations or mix them up.
      const rules = {
        nameHolder: { required },
        cardNumber: {
          required,
          creditCardValidation,
          maxLength: maxLength(16)
        },
        cvv: { required },
        expiration: { required }
      };

      const stateForm: Ref<Validation<{ IState }>> = useVuelidate(rules, state);

      const onFormChanged = async () => {
        emit("form-changed", state);
      };

      const reset = () => {
        stateForm.value.$reset();
      };

      const submit = () => {
        stateForm.value.$validate();
      };

      const isInvalid = (): boolean => {
        return stateForm.value.$invalid;
      };

      return {
        reset,
        submit,
        isInvalid,
        stateForm,
        onFormChanged
      };
    }
  });
</script>

<style scoped lang="scss">
  .form {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .controller {
      width: 100%;
      margin-top: $padding;

      &.half {
        width: 47%;
      }

      &.error {
        .input {
          border-color: $error;
          color: $error;
        }

        .label {
          color: $error;
        }
      }

      .input {
        width: 100%;
        resize: none;
        // background-color: $inputs;
        padding: 8px;
        color: $text-dark-secondary;
        border: 1px solid $divider;
      }

      .label {
        display: block;
        color: $text-dark-secondary;
        margin-bottom: 5px;
      }

      .message {
        color: $error;
      }
    }
  }
</style>
