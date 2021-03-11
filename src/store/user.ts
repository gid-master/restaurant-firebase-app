import { IResponse } from "@/interfaces/IResponse";
import {
  login,
  register,
  authenticate,
  logout,
  pushPermission
} from "@/services/UserService";

import {
  IAuthentication,
  IAuthenticationResponse,
  IUser
} from "@/interfaces/IUser";

interface IState {
  user: IUser;
  authentication: IAuthenticationResponse;
  pushPermission: boolean;
}

export default {
  state: {
    user: null,
    authentication: null,
    pushPermission: false
  } as IState,

  getters: {
    user(state: IState): IUser {
      return state.user;
    },
    authentication(state: IState): IAuthenticationResponse {
      return state.authentication;
    }
  },

  mutations: {
    USER(state: IState, user: IUser) {
      state.user = user;
    },
    AUTHENTICATION(state: IState, authentication: IAuthenticationResponse) {
      state.authentication = authentication;
    },
    PUSH_PERMISSION(state: IState, pushPermission: boolean) {
      state.pushPermission = pushPermission;
    }
  },

  actions: {
    async authenticate({ commit }) {
      const response: IResponse<IUser> = await authenticate();
      commit("USER", response.success ? response.data : null);
    },
    async login({ commit }, data: IAuthentication) {
      const response: IResponse<IUser> = await login(data);
      commit("USER", response.success ? response.data : null);
      commit("AUTHENTICATION", {
        success: response.success,
        message: response.message
      });
    },
    async register({ commit }, data: IAuthentication) {
      const response: IResponse<IUser> = await register(data);
      commit("USER", response.success ? response.data : null);
      commit("AUTHENTICATION", {
        success: response.success,
        message: response.message
      });
    },
    async logout({ commit }) {
      logout();
      commit("USER", null);
      commit("AUTHENTICATION", null);
    },
    async pushPermishion({ commit }, data: string) {
      const response: IResponse<boolean> = await pushPermission(data);
      commit("PUSH_PERMISSION", response.success ? response.data : false);
    }
  }
};
