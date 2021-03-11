import { IResponse } from "@/interfaces/IResponse";
import { IUser, IAuthentication } from "@/interfaces/IUser";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export const authenticate = async (): Promise<IResponse<IUser>> => {
  const authentication = firebase.auth().currentUser;

  return {
    success: true,
    data: authentication
      ? {
          id: authentication.uid,
          name: authentication.displayName,
          email: authentication.email
        }
      : null
  };
};

export const login = async (
  authentication: IAuthentication
): Promise<IResponse<IUser>> => {
  try {
    const user: IUser = await firebase
      .auth()
      .signInWithEmailAndPassword(authentication.email, authentication.password)
      .then(userCredential => {
        return {
          id: userCredential.user.uid,
          name: userCredential.user.displayName,
          email: userCredential.user.email
        };
      });

    return {
      success: true,
      data: user
    };
  } catch (error) {
    return {
      success: false,
      message: "User or password invalid"
    };
  }
};

export const register = async (
  authentication: IAuthentication
): Promise<IResponse<IUser>> => {
  try {
    // Register user using email and password
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(
        authentication.email,
        authentication.password
      );

    // then update profile witht he user name
    await firebase.auth().currentUser.updateProfile({
      displayName: authentication.name
    });

    return {
      success: true,
      data: {
        id: userCredential.user.uid,
        name: authentication.name,
        email: authentication.email
      }
    };
  } catch (error) {
    return {
      success: false,
      data: error.message
    };
  }
};

export const logout = async () => {
  firebase.auth().signOut();
};

export const pushPermission = async (
  pushPermission: string
): Promise<IResponse<boolean>> => {
  const userId: string = firebase.auth().currentUser?.uid;

  await firebase
    .firestore()
    .collection("notifications")
    .doc(userId)
    .set({
      pushPermission: pushPermission,
      date: new Date()
    });

  return {
    success: true,
    data: true
  };
};
