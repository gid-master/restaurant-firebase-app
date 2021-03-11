<template>
  <button
    type="button"
    @click="clicked"
    :disabled="selected"
    class="button"
    :class="{ selected: selected }"
  >
    <img :src="require(`@/assets/categories/${icon}.svg`)" />
    <span>{{ name }}</span>
  </button>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "ButtonBadge",
    props: {
      name: String,
      icon: String,
      selected: Boolean
    },
    setup(props, { emit }) {
      const clicked = (): void => {
        emit("button-clicked");
      };

      return { clicked };
    }
  });
</script>

<style scoped lang="scss">
  .button {
    border-radius: 15px;
    padding: 10px 15px;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;
    background-color: $third-color;
    border: 1px solid $divider;
    cursor: pointer;

    img {
      width: 24px;
      height: 24px;
    }

    span {
      color: $primary-color; // $text-dark;
      margin-left: 10px;
      font-weight: 500;
    }

    &.selected {
      background-color: $primary-color;
      border: 1px solid $primary-color;
      cursor: default;

      span {
        color: $text-light;
      }
    }
  }
</style>
