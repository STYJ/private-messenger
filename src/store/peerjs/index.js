// jshint esversion:8

import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

// s for sender, r for receiver
const state = () => ({
  s_lastPeerId: null,
  s_peer: null,
  // s_peerId: null,
  s_conn: null,

  r_lastPeerId: null,
  r_peer: null,
  // r_peerId: null,
  r_conn: null
});

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
