<template>
  <MenuContainer />
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import MenuContainer from "@/components/menu/MenuContainer.vue";

  export default defineComponent({
    name: "Menu",
    components: {
      MenuContainer
    }
  });
</script>
