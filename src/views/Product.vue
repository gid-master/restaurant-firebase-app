<template>
  <ProductContainer />
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import ProductContainer from "@/components/product/ProductContainer.vue";

  export default defineComponent({
    name: "Product",
    components: {
      ProductContainer
    }
  });
</script>
