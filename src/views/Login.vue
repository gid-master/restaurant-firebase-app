<template>
  <LoginContainer />
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import LoginContainer from "@/components/login/LoginContainer.vue";

  export default defineComponent({
    name: "Login",
    components: {
      LoginContainer
    }
  });
</script>
