// jshint esversion:8

import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const state = () => ({
  // lastPeerId: null, // lastPeerId
  peer: null, // Peer = user
  // Todo: Convert logs into an key (peerID) value (logs) pair
  logs: {
    "1234": [{
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: 'This is a very long title. This is a very long title. This is a very long title. This is a very long title. This is a very long title. This is a very long title. This is a very long title. This is a very long title. This is a very long title. This is a very long title. ',
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Oui oui',
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Different title',
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Title A',
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Title B',
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Oui your head la',
      }
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
