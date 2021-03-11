<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "Wrapper"
  });
</script>

<style scoped lang="scss">
  .wrapper {
    padding: $app-vertical $app-horizontal $toolbar $app-horizontal;
  }
</style>
