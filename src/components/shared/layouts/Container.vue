<template>
  <div class="container">
    <div class="header" v-if="title">
      <h2 class="title">{{ title }}</h2>
      <a class="link" @click="clicked" v-if="link">{{ link }}</a>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "Container",
    props: {
      title: String,
      link: String
    },
    setup(props, { emit }) {
      const clicked = () => emit("link-clicked");

      return { clicked };
    }
  });
</script>

<style scoped lang="scss">
  .container {
    margin-bottom: $app-vertical;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: $padding;

      .title {
        color: $text-dark;
      }
      .link {
        color: $primary-color;
      }
    }
  }
</style>
