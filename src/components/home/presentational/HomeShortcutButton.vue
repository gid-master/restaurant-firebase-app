<template>
  <button type="button" class="button" @click="clicked">
    <div class="image">
      <img :src="require(`@/assets/icons/primary/${icon}.svg`)" />
    </div>
    <span>{{ name }}</span>
  </button>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "HomeShortcutButton",
    props: {
      name: String,
      icon: String
    },
    setup(props, { emit }) {
      const clicked = () => {
        emit("button-clicked");
      };

      return { clicked };
    }
  });
</script>

<style scoped lang="scss">
  .button {
    background-color: transparent;
    border: 0;
    cursor: pointer;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    .image {
      width: 74px;
      height: 74px;
      background: $third-color;
      box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 40px;
        height: 40px;
      }
    }

    span {
      margin-top: 8px;
      color: $text-dark-secondary;
    }
  }
</style>
