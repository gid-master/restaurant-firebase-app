<template>
  <Wrapper>
    <Container>
      <MenuSearch
        :sortId="state.sortId"
        :searchTerm="state.searchTerm"
        @search-changed="onSearchChanged"
        @open-sort-clicked="onOpenSortClicked"
      />
    </Container>

    <Container v-if="state.products.length === 0">
      <MenuEmpty />
    </Container>

    <div v-if="state.products.length > 0">
      <Container>
        <MenuFilter
          :categories="state.categories"
          :filterId="state.filterId"
          @filter-clicked="onFilterClicked"
        />
      </Container>

      <Container>
        <Block>
          <GridList
            :products="state.products"
            @product-clicked="onProductClicked"
          />
        </Block>
      </Container>
    </div>
  </Wrapper>

  <ModalBottomSheet title="Sort Products">
    <MenuSort :sortId="state.sortId" @sort-clicked="onSortClicked" />
  </ModalBottomSheet>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from "vue";
  import { useStore } from "vuex";
  import router from "@/router";

  import { IProduct } from "@/interfaces/IProduct";

  import GridList from "@/components/shared/grids/GridList.vue";
  import Wrapper from "@/components/shared/layouts/Wrapper.vue";
  import Container from "@/components/shared/layouts/Container.vue";
  import Block from "@/components/shared/layouts/Block.vue";
  import ModalBottomSheet from "@/components/shared/modals/ModalBottomSheet.vue";

  import MenuSearch from "./presentational/MenuSearch.vue";
  import MenuFilter from "./presentational/MenuFilter.vue";
  import MenuSort from "./presentational/MenuSort.vue";
  import MenuEmpty from "./presentational/MenuEmpty.vue";

  interface IState {
    searchTerm: string;
    sortId: string;
    filterId: string;
    products: IProduct[];
    categories: string[];
  }

  export default defineComponent({
    name: "HomeContainer",
    components: {
      MenuSearch,
      MenuFilter,
      MenuSort,
      MenuEmpty,
      GridList,
      Wrapper,
      Container,
      Block,
      ModalBottomSheet
    },
    setup() {
      const store = useStore();
      const state: IState = reactive({
        searchTerm: computed(() => store.getters.searchTerm),
        sortId: computed(() => store.getters.sortId),
        filterId: computed(() => store.getters.filterId),
        products: computed(() => store.getters.products),
        categories: [
          "salads",
          "snacks",
          "meals",
          "burgers",
          "drinks",
          "dessert"
        ]
      });

      const onSearchChanged = (search: string) => {
        store.dispatch("searchTerm", search);
      };

      const onOpenSortClicked = () => {
        store.dispatch("showModal", { show: true });
      };

      const onSortClicked = (sortId: string) => {
        store.dispatch("sort", sortId);
        store.dispatch("showModal", { show: false });
      };

      const onFilterClicked = (filterId: string) => {
        store.dispatch("filter", filterId);
      };

      const onProductClicked = (productSku: string) => {
        router.push({ name: "product", params: { id: productSku } });
      };

      return {
        state,
        onSearchChanged,
        onOpenSortClicked,
        onSortClicked,
        onFilterClicked,
        onProductClicked
      };
    }
  });
</script>
