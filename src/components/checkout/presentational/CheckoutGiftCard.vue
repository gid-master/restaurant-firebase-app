<template>
  <form novalidate class="form">
    <div class="controller" :class="{ error: stateForm.giftCard.$invalid }">
      <label class="label"><small>Type the gift code</small></label>
      <input
        type="text"
        class="input"
        :disabled="disabled"
        v-model="stateForm.giftCard.$model"
        @blur="onFormChanged"
      />
      <span class="message" v-if="stateForm.giftCard.$invalid">
        <small v-for="error in stateForm.giftCard.$errors" :key="error">
          {{ error.$message }}
        </small>
      </span>
    </div>
  </form>
</template>

<script lang="ts">
  import { defineComponent, reactive, Ref } from "vue";
  import { useVuelidate, Validation } from "@vuelidate/core";
  import { required } from "@vuelidate/validators";

  export default defineComponent({
    name: "CheckoutGiftCard",
    props: {
      disabled: Boolean
    },
    setup(props, { emit }) {
      const state = reactive({
        giftCard: null
      });

      const rules = {
        giftCard: { required }
      };

      const stateForm: Ref<Validation<{ IState }>> = useVuelidate(rules, state);

      const onFormChanged = async () => {
        emit("form-changed", state.giftCard);
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
