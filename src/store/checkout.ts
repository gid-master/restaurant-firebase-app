import { ICart, ICartSummary } from "@/interfaces/ICart";
import { IResponse } from "@/interfaces/IResponse";
import { ICheckout, ICheckoutResponse } from "@/interfaces/ICheckout";
import { processCheckout } from "@/services/CheckoutService";
import { useLocalStorage } from "@/utils/StorageUtil";

interface IState {
  cart: ICart[];
  checkout: ICheckoutResponse;
}

export default {
  state: {
    cart: [],
    checkout: null
  } as IState,

  getters: {
    cartQuantity(state: IState): number {
      return state.cart.length;
    },
    cart(state: IState): ICart[] {
      return state.cart.map(cart => {
        return {
          ...cart,
          product: {
            ...cart.product,
            additionals: cart.product.additionals.filter(
              item => item.quantity > 0
            )
          }
        };
      });
    },
    cartSummary(state: IState): ICartSummary {
      const totalProducts: number = state.cart.reduce(
        (value: number, { product }) =>
          value + product.price * product.quantity,
        0
      );

      const quantityProducts: number = state.cart.reduce(
        (value: number, { product }) => value + product.quantity,
        0
      );

      const totalAdditionals = state.cart.reduce(
        (totalProduct: number, { product }) =>
          totalProduct +
          product.additionals.reduce(
            (totalAdditional: number, { quantity, price }) =>
              totalAdditional + quantity * price * product.quantity,
            0
          ),
        0
      );

      const quantityAdditionals = state.cart.reduce(
        (totalProduct: number, { product }) =>
          totalProduct +
          product.additionals.reduce(
            (totalAdditional: number, { quantity }) =>
              totalAdditional + quantity * product.quantity,
            0
          ),
        0
      );

      const total: number = totalProducts + totalAdditionals;

      return {
        totalProducts,
        quantityProducts,
        totalAdditionals,
        quantityAdditionals,
        total
      };
    },
    checkout(state: IState): ICheckoutResponse {
      return state.checkout;
    }
  },

  mutations: {
    CART(state: IState, cart: ICart) {
      state.cart = [...state.cart.filter(data => data.id !== cart.id), cart];
      useLocalStorage.setItem("cart", state.cart);
    },
    DELETE_CART(state: IState, cartId: string) {
      state.cart = state.cart.filter(data => data.id !== cartId);
      useLocalStorage.setItem("cart", state.cart);
    },
    CHECKOUT(state: IState, checkout: ICheckoutResponse) {
      state.checkout = checkout;
      state.cart = !checkout.success ? state.cart : [];
      useLocalStorage.removeItem("cart");
    },
    RECOVER_CART(state: IState, cart: ICart[]) {
      state.cart = cart;
    }
  },

  actions: {
    async cart({ commit }, data: ICart) {
      commit("CART", data);
    },
    async deleteCart({ commit }, data: string) {
      commit("DELETE_CART", data);
    },
    async checkout({ commit }, data: ICheckout) {
      const response: IResponse<ICheckout> = await processCheckout(data);
      commit("CHECKOUT", {
        success: response.success,
        message: response.message
      });
    },
    async recoverCart({ commit }) {
      const cart: ICart[] = await useLocalStorage.getItem("cart");
      commit("RECOVER_CART", cart ? cart : []);
    }
  }
};
