// jshint esversion:8

import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const state = () => ({
  // lastPeerId: null, // lastPeerId
  peer: null, // Peer = user
  connections: ["peer_1", "peer_2"],
  // connections: [],
  logs: {
    null: [
      { id: "Admin", message: "Hello and welcome to my chat!" },
      { id: "Admin", message: "To get started..." }
    ],
    peer_1: [
      { id: "peer_0", message: "hi" },
      { id: "peer_0", message: "My name is peer 0" },
      { id: "peer_1", message: "Hi peer_0" }
    ],
    peer_2: [
      { id: "peer_0", message: "hi peer2!" },
      { id: "peer_2", message: "Hey man, what's up" }
    ]
  }
});

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
