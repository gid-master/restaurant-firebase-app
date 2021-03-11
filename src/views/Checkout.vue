<template>
  <CheckoutContainer />
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import CheckoutContainer from "@/components/checkout/CheckoutContainer.vue";

  export default defineComponent({
    name: "Checkout",
    components: {
      CheckoutContainer
    }
  });
</script>
