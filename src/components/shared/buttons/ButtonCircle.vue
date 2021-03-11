<template>
  <button
    type="button"
    @click="clicked"
    class="button"
    :class="{
      selected: selected,
      horizontal: horizontal,
      small: small,
      light: light
    }"
  >
    <div class="image">
      <img
        :src="
          require(`@/assets/icons/${light ? 'primary' : 'light'}/${icon}.svg`)
        "
      />
    </div>
    <span v-if="name">{{ name }}</span>
  </button>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "ButtonCircle",
    props: {
      name: String,
      icon: String,
      selected: Boolean,
      horizontal: Boolean,
      small: Boolean,
      light: Boolean
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
    background-color: transparent;
    border: 0;
    display: flex;
    flex-flow: column;
    align-items: center;
    cursor: pointer;

    .image {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $primary-color;

      img {
        width: 26px;
        height: 26px;
      }
    }

    span {
      color: $text-dark;
      font-weight: 400;
      margin-top: 5px;
    }

    &.light {
      .image {
        background-color: $third-color;
      }
    }

    &.small {
      .image {
        width: 30px;
        height: 30px;

        img {
          width: 18px;
          height: 18px;
        }
      }
    }

    &.selected {
      cursor: default;

      .image {
        background-color: $secondary-color;
      }

      span {
        font-weight: 500;
      }
    }

    &.horizontal {
      flex-flow: row;

      span {
        margin-top: 0;
        margin-left: 10px;
      }
    }
  }
</style>
