<template>
  <div
    class="backdrop"
    :class="{ show: modal && modal.show }"
    @click="backdropClicked"
  ></div>
</template>

<script lang="ts">
  import { defineComponent, computed, watch } from "vue";
  import { IModal } from "@/interfaces/IModal";
  import { useStore } from "vuex";

  export default defineComponent({
    name: "ModalBackdrop",
    setup() {
      const store = useStore();
      const modal = computed<IModal>(() => store.getters.modal);

      const backdropClicked = () => {
        if (modal.value.disableClick) {
          return;
        }

        store.dispatch("showModal", { show: false });
      };

      const disableScroll = (disable: boolean) => {
        document.body.style.overflow = disable ? "hidden" : "auto";
      };

      watch(modal, (newVal: IModal) => {
        disableScroll(newVal && newVal.show);
      });

      return { modal, backdropClicked };
    }
  });
</script>

<style scoped lang="scss">
  .backdrop {
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: $secondary-color;
    width: 100%;
    height: 100%;
    overflow: hidden;
    visibility: hidden;
    opacity: 0;
    transition: all 0.2s ease;

    &.show {
      visibility: visible;
      opacity: 0.5;
    }
  }
</style>
