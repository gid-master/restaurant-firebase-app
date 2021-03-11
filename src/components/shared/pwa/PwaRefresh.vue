<template>
  <div class="new-content">
    <p v-if="!processing">
      Restaurant application has a new version available, click on the button to
      update it.
    </p>

    <p v-if="processing">
      Please wait while we are updating your application with the newst version.
    </p>

    <ButtonStandard
      icon="thumb_up"
      name="update right now"
      :disabled="processing"
      :center="true"
      @button-clicked="onRefreshClicked()"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import ButtonStandard from "@/components/shared/buttons/ButtonStandard.vue";

  export default defineComponent({
    name: "PwaRefresh",
    components: {
      ButtonStandard
    },
    setup(props, { emit }) {
      const processing = ref(false);

      const onRefreshClicked = () => {
        processing.value = true;
        emit("refresh-clicked");
      };

      return { processing, onRefreshClicked };
    }
  });
</script>

<style scoped lang="scss">
  .new-content {
    display: flex;
    flex-flow: column;
    align-items: center;

    p {
      color: $text-dark-secondary;
      text-align: center;
      margin: 20px 0;
    }
  }
</style>
