<template>
  <div class="error">
    <h2>RESTRICT PAGE</h2>
    <p>
      You don't have access to visit the requested page, please go back to home
      page.
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "ErrorUnauthorized"
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
