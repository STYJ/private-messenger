// jshint esversion:8

import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const state = () => ({
  web3: null,
  address: null,
  network: "Not connected"
});

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
