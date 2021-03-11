<template>
  <Wrapper>
    <Container>
      <ErrorNotFound v-if="error === '404'" />
      <ErrorServer v-else-if="error === '500'" />
      <ErrorUnauthorized v-else-if="error === '401'" />
      <ErrorUnexpected v-else />
    </Container>
    <Container>
      <ButtonStandard
        icon="store"
        name="Go back to home"
        :center="true"
        @button-clicked="onGoBackClicked"
      />
    </Container>
  </Wrapper>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";
  import ButtonStandard from "@/components/shared/buttons/ButtonStandard.vue";
  import { useRoute } from "vue-router";
  import router from "@/router";

  import Wrapper from "@/components/shared/layouts/Wrapper.vue";
  import Container from "@/components/shared/layouts/Container.vue";

  import ErrorNotFound from "./presentational/ErrorNotFound.vue";
  import ErrorServer from "./presentational/ErrorServer.vue";
  import ErrorUnauthorized from "./presentational/ErrorUnauthorized.vue";
  import ErrorUnexpected from "./presentational/ErrorUnexpected.vue";

  export default defineComponent({
    name: "ErrorContainer",
    components: {
      ButtonStandard,
      Wrapper,
      Container,
      ErrorNotFound,
      ErrorServer,
      ErrorUnauthorized,
      ErrorUnexpected
    },

    setup() {
      const route = useRoute();
      const error = computed(() => route.params.id);

      const onGoBackClicked = () => {
        router.push({ name: "home" });
      };

      return {
        error,
        onGoBackClicked
      };
    }
  });
</script>
