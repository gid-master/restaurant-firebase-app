<template>
  <div class="error">
    <h2>SERVER ERROR</h2>
    <p>
      Sorry, this error wasn't expected, we will be working on it to avoid
      eventual problems.
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "ErrorServer"
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
