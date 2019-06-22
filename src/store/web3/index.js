// jshint esversion:8

import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const state = () => ({
  web3: null,
  address: "Not connected",
  network: "",
  connected: false
});

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
