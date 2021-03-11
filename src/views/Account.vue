<template>
  <AccountContainer />
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import AccountContainer from "@/components/account/AccountContainer.vue";

  export default defineComponent({
    name: "Account",
    components: {
      AccountContainer
    }
  });
</script>
