<template>
  <ErrorContainer />
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import ErrorContainer from "@/components/error/ErrorContainer.vue";

  export default defineComponent({
    name: "Error",
    components: {
      ErrorContainer
    }
  });
</script>
