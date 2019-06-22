// jshint esversion:8

import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const state = () => ({
  // lastPeerId: null, // lastPeerId
  peer: null, // Peer = user
  logs: ["Connect metamask to begin."] // Logs for 1 chat
});

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
