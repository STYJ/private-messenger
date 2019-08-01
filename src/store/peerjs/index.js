// jshint esversion:8

import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const state = () => ({
  // lastPeerId: null, // lastPeerId
  peer: null, // Peer = user
  connections: [],
  logs: {}
});

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
