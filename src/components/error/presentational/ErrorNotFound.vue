<template>
  <div class="error">
    <h2>NOT FOUND</h2>
    <p>
      This page wasn't found, click on button below to return to the main page.
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "ErrorNotFound"
  });
</script>

<style scoped lang="scss">
  .error {
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-top: 50%;

    h2 {
      font-size: 25px;
      font-weight: 500;
      color: $text-dark;
      margin-bottom: 25px;
    }

    p {
      color: $text-dark-secondary;
      text-align: center;
    }
  }
</style>
