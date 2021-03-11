<template>
  <div class="modal" :class="{ show: modal && modal.show && modal.id === id }">
    <div class="content">
      <h2>{{ title }}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";
  import { useStore } from "vuex";

  export default defineComponent({
    name: "ModalBottomSheet",
    props: {
      id: String,
      title: String
    },
    setup() {
      const store = useStore();
      const modal = computed(() => store.getters.modal);

      return { modal };
    }
  });
</script>

<style scoped lang="scss">
  .modal {
    z-index: 3;
    position: fixed;
    background-color: $third-color;
    bottom: 0;
    left: 0;
    right: 0;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    width: 100%;
    height: 0;
    visibility: hidden;
    transition: all 0.2s ease;

    &.show {
      visibility: visible;
      height: 280px;
    }

    .content {
      padding: $app-vertical $app-horizontal;

      h2 {
        text-align: center;
        color: $text-dark;
        margin-bottom: $padding;
      }
    }
  }
</style>
