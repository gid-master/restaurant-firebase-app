<template>
  <button
    type="button"
    :disabled="disabled"
    @click="clicked"
    class="button"
    :class="{
      selected: selected,
      disabled: disabled
    }"
  >
    <img :src="require(`@/assets/icons/${state.button}/${icon}.svg`)" />
    <span class="text">
      <small>{{ name }}</small>
    </span>
    <span class="badge" v-if="badge > 0">{{ badge }}</span>
  </button>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from "vue";

  export default defineComponent({
    name: "ButtonIcon",
    props: {
      name: String,
      icon: String,
      badge: Number,
      selected: Boolean,
      disabled: Boolean
    },
    setup(props, { emit }) {
      const state = reactive({
        button: computed(() => {
          if (props.disabled) {
            return "disabled";
          }

          if (props.selected) {
            return "primary";
          }

          return "dark";
        })
      });

      const clicked = (): void => {
        emit("button-clicked");
      };

      return { state, clicked };
    }
  });
</script>

<style scoped lang="scss">
  .button {
    position: relative;
    background-color: transparent;
    border: 0;
    display: flex;
    flex-flow: column;
    align-items: center;
    cursor: pointer;

    img {
      width: 24px;
      height: 24px;
    }

    .text {
      color: $text-dark-secondary;
    }

    .badge {
      position: absolute;
      top: -5px;
      right: 2px;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      // display: flex;
      // align-items: center;
      // justify-content: center;
      // padding-top: 2px;
      border: 1px solid $secondary-color;
      font-size: 12px;
      color: $text-light;
      background-color: $secondary-color;
    }

    &.selected {
      cursor: default;

      .text {
        color: $primary-color;
      }

      .badge {
        background-color: $primary-color;
        border: 1px solid $primary-color;
      }
    }

    &.disabled {
      cursor: default;

      .text {
        color: $text-light-secondary;
      }

      .badge {
        display: none;
      }
    }
  }
</style>
