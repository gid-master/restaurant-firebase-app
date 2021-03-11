<template>
  <Wrapper>
    <Container>
      <HomeIntro :user="state.user" />
    </Container>

    <Container>
      <HomeShortcut @button-clicked="onShortcutClicked" />
    </Container>

    <Container
      title="Promotions"
      link="see more"
      @link-clicked="onSeeMoreClicked"
    >
      <GridRow
        :products="state.promotions"
        type="cover"
        @product-clicked="onProductClicked"
      />
    </Container>

    <Container
      title="Suggestions"
      link="see more"
      @link-clicked="onSeeMoreClicked"
    >
      <GridRow
        :products="state.suggestions"
        type="vertical"
        @product-clicked="onProductClicked"
      />
    </Container>

    <Container
      title="Special offers"
      link="see more"
      @link-clicked="onSeeMoreClicked"
    >
      <GridRow
        :products="state.offers"
        type="horizontal"
        @product-clicked="onProductClicked"
      />
    </Container>
  </Wrapper>

  <ModalBottomSheet title="Non-Commercial Use">
    <HomeCopyRights />
  </ModalBottomSheet>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from "vue";
  import { useStore } from "vuex";
  import router from "@/router";

  import { IUser } from "@/interfaces/IUser";
  import { IProduct } from "@/interfaces/IProduct";

  import HomeIntro from "./presentational/HomeIntro.vue";
  import HomeShortcut from "./presentational/HomeShortcut.vue";
  import HomeCopyRights from "./presentational/HomeCopyRights.vue";

  import GridRow from "@/components/shared/grids/GridRow.vue";
  import Wrapper from "@/components/shared/layouts/Wrapper.vue";
  import Container from "@/components/shared/layouts/Container.vue";
  import ModalBottomSheet from "@/components/shared/modals/ModalBottomSheet.vue";

  interface IState {
    user: IUser;
    products: IProduct[];
    promotions: IProduct[];
    suggestions: IProduct[];
    offers: IProduct[];
  }

  export default defineComponent({
    name: "HomeContainer",
    components: {
      HomeIntro,
      HomeShortcut,
      HomeCopyRights,
      GridRow,
      Wrapper,
      Container,
      ModalBottomSheet
    },
    setup() {
      const store = useStore();
      const state: IState = reactive({
        user: computed(() => store.getters.user),
        products: computed(() => store.getters.products),
        promotions: computed(() => store.getters.promotions),
        suggestions: computed(() => store.getters.suggestions),
        offers: computed(() => store.getters.offers)
      });

      const onShortcutClicked = (option: string) => {
        switch (option) {
          case "account":
            router.push({ name: "account" });
            break;
          case "menu":
            router.push({ name: "menu" });
            break;
          case "install":
            store.dispatch("showInstall", true);
            break;
          case "about":
            store.dispatch("showModal", { show: true });
            break;
        }
      };

      const onSeeMoreClicked = () => {
        store.dispatch("filter", null);
        router.push({ name: "menu" });
      };

      const onProductClicked = (productSku: string) => {
        router.push({ name: "product", params: { id: productSku } });
      };

      return {
        state,
        onShortcutClicked,
        onSeeMoreClicked,
        onProductClicked
      };
    }
  });
</script>
