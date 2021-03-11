<template>
  <button
    :type="submit ? 'submit' : 'button'"
    :disabled="disabled"
    @click="clicked"
    class="button"
    :class="{
      disabled: disabled,
      center: center,
      small: small,
      transparent: transparent
    }"
  >
    <img v-if="icon" :src="require(`@/assets/icons/light/${icon}.svg`)" />
    <span class="text">{{ name }}</span>
    <span class="detail" v-if="detail">{{ detail }}</span>
  </button>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "ButtonStandard",
    props: {
      submit: Boolean,
      icon: String,
      name: String,
      detail: String,
      center: Boolean,
      disabled: Boolean,
      small: Boolean,
      transparent: Boolean
    },
    setup(props, { emit }) {
      const clicked = (): void => {
        if (props.submit) {
          return;
        }

        emit("button-clicked");
      };

      return { clicked };
    }
  });
</script>

<style scoped lang="scss">
  .button {
    width: 100%;
    background-color: $primary-color;
    border: 0;
    border-radius: 8px;
    padding: 15px 30px;
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }

    .text {
      color: $text-light;
    }

    .detail {
      flex: 1;
      text-align: right;
      color: $text-light;
    }

    &.small {
      padding: 15px;
      height: 45px;

      img {
        margin: 2px 5px 0 0;
      }
    }

    &.center {
      justify-content: center;
    }

    &.transparent {
      background-color: transparent;
      border: 2px solid $primary-color;
      padding: 13px 30px;

      .text {
        color: $text-dark;
      }

      .detail {
        color: $text-dark;
      }
    }

    &.disabled {
      background-color: $text-light-secondary;
      cursor: default;

      &.transparent {
        border: 2px solid $text-light-secondary;

        .text {
          color: $text-light;
        }

        .detail {
          color: $text-light;
        }
      }
    }
  }
</style>
