import { IResponse } from "@/interfaces/IResponse";
import { IProduct } from "@/interfaces/IProduct";
import firebase from "firebase/app";
import "firebase/firestore";

export const getAllProducts = async (): Promise<IResponse<IProduct[]>> => {
  const snapshot = await firebase
    .firestore()
    .collection("products")
    .get();

  const products: IProduct[] = snapshot.docs.map(doc => doc.data() as IProduct);

  return {
    success: true,
    data: products
  };
};
