<template>
  <div class="comments">
    <textarea
      class="input"
      placeholder="Example: take onion off"
      rows="7"
      :value="comments"
      @input="onCommentsChanged($event.target.value)"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "ProductComments",
    props: {
      comments: String
    },
    setup(props, { emit }) {
      const onCommentsChanged = (comments: string) => {
        emit("comments-changed", comments);
      };

      return { onCommentsChanged };
    }
  });
</script>

<style scoped lang="scss">
  .comments {
    .input {
      font-size: 16px;
      border: 0;
      width: 100%;
      padding: 10px;
      background-color: $inputs;
      color: $text-dark-secondary;
      resize: none;
    }
  }
</style>
