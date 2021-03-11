<template>
  <HomeContainer />
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import HomeContainer from "@/components/home/HomeContainer.vue";

  export default defineComponent({
    name: "Home",
    components: {
      HomeContainer
    }
  });
</script>
