<template>
  <Wrapper v-if="state.product">
    <Container>
      <ProductHeader :product="state.product" @back-clicked="onBackClicked" />
    </Container>
    <Container>
      <Block>
        <ProductMacro :product="state.product" />
      </Block>
    </Container>
    <Container>
      <Block title="Ingredients">
        <ProductIngredients :ingredients="state.product.ingredients" />
      </Block>
    </Container>
    <Container>
      <Block
        title="Additional"
        :link="`max ${state.product.maxAdditionals} items`"
      >
        <ProductAdditional
          :maxAdditionals="state.product.maxAdditionals"
          :additionals="state.product.additionals"
          @increment-clicked="onIncrementClicked"
        />
      </Block>
    </Container>
    <Container>
      <Block
        title="Would you like to change ?"
        subtitle="let our chefs to know"
      >
        <ProductComments
          :comments="state.product.comments"
          @comments-changed="onCommentsChanged"
        />
      </Block>
    </Container>
    <Container>
      <Block title="Clients Reviews">
        <ProductReview :reviews="state.product.reviews" />
      </Block>
    </Container>

    <Container :title="`Other ${formatCapitalize(state.product.category)}`">
      <GridRow
        type="vertical"
        :products="state.fromCategories"
        @product-clicked="onProductClicked"
      />
    </Container>

    <ProductAddToCart
      :total="total"
      :quantity="state.product.quantity"
      @increment-clicked="onProductIncrementClicked"
      @add-clicked="onAddClicked"
    />
  </Wrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, watch } from "vue";
  import { useStore } from "vuex";
  import { useRoute } from "vue-router";
  import router from "@/router";

  import { getUid } from "@/utils/RandomUtil";
  import { formatCapitalize } from "@/utils/FormatUtil";
  import { IProduct, IProductAdditional } from "@/interfaces/IProduct";

  import Wrapper from "@/components/shared/layouts/Wrapper.vue";
  import Container from "@/components/shared/layouts/Container.vue";
  import Block from "@/components/shared/layouts/Block.vue";
  import GridRow from "@/components/shared/grids/GridRow.vue";

  import ProductHeader from "./presentational/ProductHeader.vue";
  import ProductMacro from "./presentational/ProductMacro.vue";
  import ProductIngredients from "./presentational/ProductIngredients.vue";
  import ProductAdditional from "./presentational/ProductAdditional.vue";
  import ProductComments from "./presentational/ProductComments.vue";
  import ProductReview from "./presentational/ProductReview.vue";
  import ProductAddToCart from "./presentational/ProductAddToCart.vue";

  interface IState {
    product: IProduct;
    fromCategories: IProduct[];
  }

  export default defineComponent({
    name: "ProductContainer",
    components: {
      Wrapper,
      Container,
      Block,
      GridRow,
      ProductHeader,
      ProductMacro,
      ProductIngredients,
      ProductAdditional,
      ProductComments,
      ProductReview,
      ProductAddToCart
    },
    setup() {
      const store = useStore();
      const route = useRoute();

      const productSku = computed(() => route.params.id);
      const cartId = computed(() => route.query.edit);

      const state: IState = reactive({
        product: computed(() => store.getters.preferredProduct),
        fromCategories: computed(() => store.getters.fromCategories)
      });

      const total = computed(() => {
        const additionals: number = state.product.additionals.reduce(
          (total: number, additional: IProductAdditional) =>
            total + additional.quantity * additional.price,
          0
        );

        return (additionals + state.product.price) * state.product.quantity;
      });

      const onBackClicked = () => {
        router.go(-1);
      };

      const onProductClicked = async (productSku: string) => {
        await store.dispatch("preferredProduct", { productSku: null });
        router.push({ name: "product", params: { id: productSku } });
      };

      const onCommentsChanged = (comments: string) => {
        state.product.comments = comments;
      };

      const onIncrementClicked = (data: { id: string; increment: number }) => {
        state.product.additionals.forEach((element: IProductAdditional) => {
          element.quantity += element.id === data.id ? data.increment : 0;
        });
      };

      const onProductIncrementClicked = (increment: number) => {
        state.product.quantity += increment;
      };

      const onAddClicked = () => {
        store.dispatch("cart", {
          id: cartId.value ? cartId.value : getUid(),
          product: state.product
        });

        router.push({ name: "checkout" });
      };

      watch(
        [productSku, cartId],
        newVal => {
          store.dispatch("preferredProduct", {
            productSku: newVal[0] as string,
            cartId: newVal[1] as string
          });
        },
        { immediate: true }
      );

      return {
        state,
        total,
        formatCapitalize,
        onBackClicked,
        onProductClicked,
        onCommentsChanged,
        onIncrementClicked,
        onProductIncrementClicked,
        onAddClicked
      };
    }
  });
</script>
