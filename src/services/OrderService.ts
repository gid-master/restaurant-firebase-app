import { IResponse } from "@/interfaces/IResponse";
import { IOrder, IOrderReview } from "@/interfaces/IOrder";

import firebase from "firebase/app";
import "firebase/firestore";

export const getOrders = async (): Promise<IResponse<IOrder[]>> => {
  const userId: string = firebase.auth().currentUser?.uid;

  const orderSnapshot = await firebase
    .firestore()
    .collection("orders")
    .where("userId", "==", userId)
    .get();

  const orders: IOrder[] = orderSnapshot.docs.map(doc => {
    return {
      ...doc.data(),
      date: doc.data().date.toDate(),
      id: doc.id
    } as IOrder;
  });

  return {
    success: true,
    data: orders
  };
};

export const reviewOrder = async (
  review: IOrderReview
): Promise<IResponse<IOrderReview>> => {
  const order: IOrder = await firebase
    .firestore()
    .collection("orders")
    .doc(review.orderId)
    .get()
    .then(data => data.data() as IOrder);

  order.products.forEach(product => {
    product.review =
      product.itemId.toString() === review.itemId
        ? review.review
        : product.review;
  });

  await firebase
    .firestore()
    .collection("orders")
    .doc(review.orderId)
    .update({ products: order.products });

  // UPDATE PRODUCT REVIEW MACRO VIEW
  // you can use firebase.firestore.FieldValue.increment
  // and update the product to recalculate review details

  return {
    success: true,
    data: review
  };
};
