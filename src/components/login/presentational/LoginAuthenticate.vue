<template>
  <form class="login" @submit.prevent="onAuthenticationSubmitted" novalidate>
    <h2>My Account</h2>

    <span class="message" v-if="message">
      <small>{{ message }}</small>
    </span>

    <div class="controller">
      <input
        :disabled="processing"
        type="email"
        placeholder="Email"
        class="input"
        :class="{ error: stateForm.email.$invalid }"
        v-model="stateForm.email.$model"
      />
      <span class="error" v-if="stateForm.email.$invalid">
        <small v-for="error in stateForm.email.$errors" :key="error">
          {{ error.$message }}
        </small>
      </span>
    </div>

    <div class="controller">
      <input
        :disabled="processing"
        type="password"
        placeholder="Password"
        class="input"
        :class="{ error: stateForm.password.$invalid }"
        v-model="stateForm.password.$model"
      />
      <span class="error" v-if="stateForm.password.$invalid">
        <small v-for="error in stateForm.password.$errors" :key="error">
          {{ error.$message }}
        </small>
      </span>
    </div>

    <ButtonStandard
      name="Access my account"
      :disabled="processing"
      :submit="true"
      :center="true"
    />

    <span class="account">Don't you have an account yet ?</span>

    <ButtonStandard
      name="Create an account"
      :disabled="processing"
      :center="true"
      :transparent="true"
      @button-clicked="onCreateAccountClicked"
    />

    <span class="forgot">forgot your password</span>
  </form>
</template>

<script lang="ts">
  import { defineComponent, reactive, Ref } from "vue";
  import { useVuelidate, Validation } from "@vuelidate/core";
  import { required, email } from "@vuelidate/validators";
  import ButtonStandard from "@/components/shared/buttons/ButtonStandard.vue";

  interface IState {
    email: string;
    password: string;
  }

  export default defineComponent({
    name: "LoginAuthenticate",
    props: {
      processing: Boolean,
      message: String
    },
    components: {
      ButtonStandard
    },
    setup(props, { emit }) {
      const state: IState = reactive({
        email: null,
        password: null
      });

      // Example using custom validation
      const customEmailRequired = {
        $validator: value => Boolean(value),
        $message: "Email is required"
      };

      const rules = {
        email: { customEmailRequired, email },
        password: { required }
      };

      const stateForm: Ref<Validation<{ IState }>> = useVuelidate(rules, state);

      const onAuthenticationSubmitted = async () => {
        const valid: boolean = await stateForm.value.$validate();

        if (!valid) {
          return;
        }

        emit("authenticate-clicked", {
          email: state.email,
          password: state.password
        });
      };

      const onCreateAccountClicked = () => {
        emit("enable-register-clicked");
      };

      return {
        state,
        stateForm,
        onAuthenticationSubmitted,
        onCreateAccountClicked
      };
    }
  });
</script>

<style scoped lang="scss">
  .login {
    display: flex;
    flex-flow: column;
    // align-items: center;

    h2 {
      color: $text-dark;
      text-align: center;
      margin-bottom: 30px;
    }

    .message {
      color: $error;
      text-align: center;
      margin-bottom: 10px;
    }

    .controller {
      margin-bottom: 25px;

      .error {
        color: $error;
      }

      .input {
        height: 50px;
        border: 1px solid $divider;
        width: 100%;
        padding: 8px;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: -0.24px;
        color: $text-dark;
        opacity: 0.6;

        &::-webkit-input-placeholder {
          color: $text-dark;
          opacity: 0.6;
        }

        &.error {
          border-color: $error;
          color: $error;

          &::-webkit-input-placeholder {
            color: $error;
            opacity: 1;
          }
        }
      }
    }

    .account {
      color: $text-dark;
      margin: 45px 0;
      text-align: center;
    }

    .forgot {
      color: $text-dark-secondary;
      margin-top: 30px;
      text-align: center;
    }
  }
</style>
