<template>
  <Wrapper>
    <Container>
      <LoginAuthenticate
        v-if="!state.enableRegister"
        :processing="state.processing"
        :message="state.message"
        @authenticate-clicked="onAuthenticateClicked"
        @enable-register-clicked="onEnableRegisterClicked(true)"
      />
      <LoginCreateAccount
        v-if="state.enableRegister"
        :processing="state.processing"
        :message="state.message"
        @register-clicked="onRegistereClicked"
        @enable-register-clicked="onEnableRegisterClicked(false)"
      />
    </Container>
  </Wrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, watch } from "vue";
  import router from "@/router";
  import { useStore } from "vuex";

  import { IAuthentication, IAuthenticationResponse } from "@/interfaces/IUser";

  import Wrapper from "@/components/shared/layouts/Wrapper.vue";
  import Container from "@/components/shared/layouts/Container.vue";

  import LoginAuthenticate from "./presentational/LoginAuthenticate.vue";
  import LoginCreateAccount from "./presentational/LoginCreateAccount.vue";

  interface IState {
    enableRegister: boolean;
    processing: boolean;
    message: string;
  }

  export default defineComponent({
    name: "LoginContainer",
    components: {
      Wrapper,
      Container,
      LoginAuthenticate,
      LoginCreateAccount
    },
    setup() {
      const store = useStore();
      const authentication = computed(() => store.getters.authentication);
      const state: IState = reactive({
        enableRegister: false,
        processing: false,
        message: null
      });

      watch(authentication, (response: IAuthenticationResponse) => {
        state.processing = false;
        state.message = response.message;

        if (response.success) {
          router.push({ name: "account" });
        }
      });

      const onEnableRegisterClicked = (enable: boolean) => {
        state.message = null;
        state.enableRegister = enable;
      };

      const onAuthenticateClicked = (authentication: IAuthentication) => {
        state.processing = true;
        state.message = null;
        store.dispatch("login", authentication);
      };

      const onRegistereClicked = (authentication: IAuthentication) => {
        state.processing = true;
        state.message = null;
        store.dispatch("register", authentication);
      };

      return {
        state,
        onEnableRegisterClicked,
        onAuthenticateClicked,
        onRegistereClicked
      };
    }
  });
</script>
