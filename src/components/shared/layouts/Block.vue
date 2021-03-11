<template>
  <div class="block">
    <div class="header" v-if="title">
      <div class="wrapper">
        <h2 class="title">{{ title }}</h2>
        <a class="link" @click="clicked" v-if="link">{{ link }}</a>
      </div>
      <span class="subtitle" v-if="subtitle">
        <small>{{ subtitle }}</small>
      </span>
    </div>

    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "Block",
    props: {
      title: String,
      subtitle: String,
      link: String
    },
    setup(props, { emit }) {
      const clicked = () => emit("link-clicked");

      return { clicked };
    }
  });
</script>

<style scoped lang="scss">
  .block {
    background-color: $third-color;
    border-radius: 10px;
    padding: $padding;

    &:not(:last-child) {
      margin-bottom: $app-vertical;
    }

    .header {
      margin-bottom: $padding;

      .wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title {
          color: $text-dark;
        }

        .link {
          color: $primary-color;
        }
      }

      .subtitle {
        margin-top: 5px;
        color: $text-dark-secondary;
      }
    }
  }
</style>
