import { IResponse } from "@/interfaces/IResponse";
import { IProduct } from "@/interfaces/IProduct";
import { ICart } from "@/interfaces/ICart";
import { getAllProducts } from "@/services/ProductService";

interface IState {
  searchTerm: string;
  sortId: string;
  filterId: string;
  products: IProduct[];
  preferredProduct: IProduct;
}

export default {
  state: {
    searchTerm: null,
    sortId: "relevant",
    filterId: null,
    products: [],
    preferredProduct: null
  } as IState,

  getters: {
    searchTerm(state: IState): string {
      return state.searchTerm;
    },
    sortId(state: IState): string {
      return state.sortId;
    },
    filterId(state: IState): string {
      return state.filterId;
    },
    products(state: IState): IProduct[] {
      return state.products
        .filter((data: IProduct) => {
          return (
            // filter
            (!state.filterId || data.category === state.filterId) &&
            // search
            (!state.searchTerm ||
              data.name
                .toString()
                .toLowerCase()
                .indexOf(state.searchTerm.toString().toLowerCase()) > -1)
          );
        })
        .sort((a: IProduct, b: IProduct): number => {
          switch (state.sortId) {
            case "alpha":
              return a.name > b.name ? 1 : -1;
            case "price":
              return a.price - b.price;
            case "calories":
              return a.calories - b.calories;
            case "category":
              return a.category > b.category ? 1 : -1;
            case "review":
              return (
                b.reviews.totalRating / b.reviews.totalReviews -
                a.reviews.totalRating / a.reviews.totalReviews
              );
            default:
              return 1;
          }
        });
    },
    promotions(state: IState): IProduct[] {
      return state.products.filter(data => data.previousPrice > 0);
    },
    suggestions(state: IState): IProduct[] {
      return state.products.filter(data => data.suggested);
    },
    offers(state: IState): IProduct[] {
      return state.products.filter(data => data.special);
    },
    fromCategories(state: IState): IProduct[] {
      return state.products.filter(
        data =>
          data.category === state.preferredProduct.category &&
          data.id !== state.preferredProduct.id
      );
    },
    preferredProduct(state: IState): IProduct {
      return state.preferredProduct;
    }
  },

  mutations: {
    SEARCH_TERM(state: IState, searchTerm: string) {
      state.searchTerm = searchTerm;
    },
    SORT(state: IState, sortId: string) {
      state.sortId = sortId;
    },
    FILTER(state: IState, filterId: string) {
      state.filterId = filterId;
    },
    PRODUCTS(state: IState, products: IProduct[]) {
      state.products = products;
    },
    PREFERRED_PRODUCT(state: IState, preferredProduct: IProduct) {
      state.preferredProduct = preferredProduct;
    }
  },

  actions: {
    async searchTerm({ commit }, data: string) {
      commit("SEARCH_TERM", data);
    },
    async sort({ commit }, data: string) {
      commit("SORT", data);
    },
    async filter({ commit }, data: string) {
      commit("FILTER", data);
    },
    async products({ commit }) {
      const response: IResponse<IProduct[]> = await getAllProducts();
      commit("PRODUCTS", response.success ? response.data : []);
    },
    async preferredProduct(
      { commit, state, rootState },
      data: { productSku: string; cartId: string }
    ) {
      const cart: ICart = rootState.checkout.cart.find(
        (item: ICart) => item.id === data.cartId
      );

      if (cart) {
        commit("PREFERRED_PRODUCT", cart.product);
      } else {
        const product: IProduct = state.products.find(
          (item: IProduct) => item.sku === data.productSku
        );

        commit(
          "PREFERRED_PRODUCT",
          product
            ? {
                ...product,
                additionals: [
                  ...product.additionals.map(item => {
                    {
                      return {
                        ...item,
                        quantity: 0
                      };
                    }
                  })
                ]
              }
            : null
        );
      }
    }
  }
};
