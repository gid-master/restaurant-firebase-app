import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { PRODUCT_MOCK } from "./mocks/ProductMock";
import { IOrderProduct } from "./interfaces/IOrder";
import { IProduct } from "./interfaces/IProduct";

admin.initializeApp({
  credential: admin.credential.cert({}),
  databaseURL: "https://restaurant-app-f8a06.firebaseio.com"
});

export const integrate = functions.https.onRequest(
  async (request, response) => {
    let counter = 0;
    PRODUCT_MOCK.forEach(async data => {
      counter++;
      await admin
        .firestore()
        .collection("products")
        .doc(data.id)
        .set(data);
    });

    response.send(
      `There were ${PRODUCT_MOCK.length} registers, and was added ${counter} products.`
    );
  }
);

export const processCheckout = functions.https.onCall(
  async (checkout, context) => {
    const userId = context.auth ? context.auth.uid : null;

    // RECALCULATE PRODUCTS AND ADDITIOONAL
    // JUST AS AN EXAMPLE
    // THE RIGHT WAY IS CALL IT AS CLOUD FUNCTION TO PROCESS THE ORDER
    const products: IOrderProduct[] = checkout.products.map(
      (product: IProduct) => {
        const totalAdditionals: number = product.additionals.reduce(
          (total: number, { price, quantity }) => total + quantity * price,
          0
        );

        return {
          // need to generate it because we can have the same product id with different items
          itemId: Math.floor((1 + Math.random()) * 0x10000).toString(),
          productId: product.id,
          price: product.price,
          additionals: product.additionals,
          total: (totalAdditionals + product.price) * product.quantity,
          quantity: product.quantity,
          comments: product.comments ? product.comments : null,
          review: 0,
          name: product.name,
          image: product.image
        } as IOrderProduct;
      }
    );

    const total: number = products.reduce(
      (productTotal: number, { total }) => productTotal + total,
      0
    );

    await admin
      .firestore()
      .collection("orders")
      .add({
        paymentMethod: checkout.paymentMethod,
        giftCard: checkout.giftCard,
        creditCard: checkout.creditCard,
        products: products,
        total: Number(total.toFixed(2)),
        userId: userId,
        date: new Date()
      });

    return {
      success: true,
      data: checkout
    };
  }
);
