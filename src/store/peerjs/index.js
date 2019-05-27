// jshint esversion:8

import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const state = () => ({
  lastPeerId: null,
  peer: null,
  conn: null
});

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
