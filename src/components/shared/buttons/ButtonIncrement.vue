<template>
  <div class="add" :class="{ large: large }">
    <button :disabled="disabledMax" @click="onIncrement(1)">
      <img src="@/assets/icons/light/add.svg" />
    </button>
    <span>{{ quantity }}</span>
    <button :disabled="disabledMin" @click="onIncrement(-1)">
      <img src="@/assets/icons/light/remove.svg" />
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "ButtonIncrement",
    props: {
      disabledMin: Boolean,
      disabledMax: Boolean,
      quantity: Number,
      large: Boolean
    },
    setup(props, { emit }) {
      const onIncrement = (increment: number) => {
        emit("increment-clicked", increment);
      };

      return { onIncrement };
    }
  });
</script>

<style scoped lang="scss">
  .add {
    background: $inputs;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      border: 0;
      background-color: $primary-color;
      padding: 3px;

      &:disabled {
        background-color: $text-light-secondary;
      }

      img {
        width: 20px;
        height: 20px;
      }
    }

    span {
      display: block;
      margin-top: 3px;
      color: $text-dark;
      text-align: center;
      padding: 0 10px;
      width: 30px;
    }

    &.large {
      button {
        img {
          width: 28px;
          height: 28px;
        }
      }
    }
  }
</style>
