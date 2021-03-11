import { IResponse } from "@/interfaces/IResponse";
import { ICheckout } from "@/interfaces/ICheckout";
import { ICreditCard } from "@/interfaces/ICheckout";
import { encodeData, getUid } from "@/utils/RandomUtil";
import { IOrderProduct } from "@/interfaces/IOrder";
import { IProduct } from "@/interfaces/IProduct";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/functions";

// this function should be a stripe or any other getway lib that generates a token to be sent to the backend.
// that's the right way to process it, so we don't keep any credit card information, just validate the token
// complete the transaction and done !
const generateCreditCardToken = (creditCard: ICreditCard) => {
  return encodeData(creditCard.cardNumber.toString());
};

// // USING CLOUD FUNCTION IS THE RIGHT WAY TO DO IT
// // THE IDEA IS TO GET THE CREDIT CARD TOKEN AND SEND IT TO BACKEND ALONG WITH PRODUCTS
// // THERE SHOULD CALCULATE THE TOTAL AGAIN AND VALIDATE THE PAYMENT METHODS
// export const processCheckout = async (
//   checkout: ICheckout
// ): Promise<IResponse<ICheckout>> => {
//   const methodCall = firebase.functions().httpsCallable("processCheckout");
//   const callback = await methodCall({
//     ...checkout,
//     creditCard: checkout.creditCard
//       ? generateCreditCardToken(checkout.creditCard)
//       : null
//   });

//   return callback.data as IResponse<ICheckout>;
// };

// THIS METHOD SHOULD DO THE SAME AS CLOUD FUNCTION IS DOING
// THE ONLY DIFFERENCE IS THAT A CHECKOUT PROCESS SHOULD BE DONE ON THE BACKEND
// THE IDEA IS TO GET THE CREDIT CARD TOKEN AND SEND IT TO BACKEND ALONG WITH PRODUCTS
// THERE SHOULD CALCULATE THE TOTAL AGAIN AND VALIDATE THE PAYMENT METHODS
export const processCheckout = async (
  checkout: ICheckout
): Promise<IResponse<ICheckout>> => {
  const userId: string = firebase.auth().currentUser?.uid;

  // RECALCULATE PRODUCTS AND ADDITIOONAL
  // THE RIGHT WAY IS CALL IT AS CLOUD FUNCTION TO PROCESS THE ORDER
  const products: IOrderProduct[] = checkout.products.map(
    (product: IProduct) => {
      const totalAdditionals: number = product.additionals.reduce(
        (total: number, { price, quantity }) => total + quantity * price,
        0
      );

      return {
        itemId: getUid(), // need to generate it because we can have the same product id with different items
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

  // Generat credit card token
  // In the real application, using any payment method,
  // All client details are encrypt and send to the
  const creditCard: string = checkout.creditCard
    ? generateCreditCardToken(checkout.creditCard)
    : null;

  await firebase
    .firestore()
    .collection("orders")
    .add({
      paymentMethod: checkout.paymentMethod,
      giftCard: checkout.giftCard,
      creditCard: creditCard,
      products: products,
      total: Number(total.toFixed(2)),
      userId: userId,
      date: new Date()
    });

  return {
    success: true,
    data: checkout
  };
};
