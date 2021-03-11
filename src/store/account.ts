import { IResponse } from "@/interfaces/IResponse";
import { IOrder, IOrderReview, IOrderSummary } from "@/interfaces/IOrder";
import { getOrders, reviewOrder } from "@/services/OrderService";

interface IState {
  orders: IOrder[];
}

export default {
  state: {
    orders: []
  } as IState,

  getters: {
    orders(state: IState): IOrder[] {
      return state.orders;
    },
    ordersSummary(state: IState): IOrderSummary {
      const quantityOrders: number = state.orders.length;

      const totalProducts: number = state.orders.reduce(
        (value: number, order: IOrder) => value + order.total,
        0
      );

      const quantityProducts = state.orders.reduce(
        (value: number, { products }) =>
          value +
          products.reduce(
            (totalProduct: number, { quantity }) => totalProduct + quantity,
            0
          ),
        0
      );

      return {
        quantityOrders,
        totalProducts,
        quantityProducts
      };
    }
  },

  mutations: {
    ORDERS(state: IState, orders: IOrder[]) {
      state.orders = orders;
    },
    REVIEW(state: IState, orderReview: IOrderReview) {
      state.orders = state.orders.map(data => {
        if (data.id === orderReview.orderId) {
          data.products = data.products.map(product => {
            product.review =
              product.itemId === orderReview.itemId
                ? orderReview.review
                : product.review;
            return product;
          });
        }
        return data;
      });
    }
  },

  actions: {
    async orders({ commit }) {
      const response: IResponse<IOrder[]> = await getOrders();
      commit("ORDERS", response.success ? response.data : []);
    },
    async review({ commit }, data: IOrderReview) {
      const response: IResponse<IOrderReview> = await reviewOrder(data);

      if (response.success) {
        commit("REVIEW", response.data);
      }
    }
  }
};
