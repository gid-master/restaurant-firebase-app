import { IModal } from "@/interfaces/IModal";

interface IState {
  snackbar: string;
  modal: IModal;
  showInstall: boolean;
}

export default {
  state: {
    snackbar: null,
    modal: null,
    showInstall: null
  } as IState,

  getters: {
    showSnackbar(state: IState): string {
      return state.snackbar;
    },
    modal(state: IState): IModal {
      return state.modal;
    },
    showInstall(state: IState): boolean {
      return state.showInstall;
    }
  },

  mutations: {
    SHOW_SNACKBAR(state: IState, snackbar: string) {
      state.snackbar = snackbar;
    },
    SHOW_MODAL(state: IState, modal: IModal) {
      state.modal = modal;
    },
    SHOW_INSTALL(state: IState, showInstall: boolean) {
      state.showInstall = showInstall;
    }
  },

  actions: {
    async showSnackbar({ commit }, data: string) {
      commit("SHOW_SNACKBAR", data);
    },
    async showModal({ commit }, data: IModal) {
      commit("SHOW_MODAL", data);
    },
    async showInstall({ commit }, data: boolean) {
      commit("SHOW_INSTALL", data);
    }
  }
};
