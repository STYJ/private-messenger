// jshint esversion:8

export default {
  // lastPeerId: state => {
  //   return state.lastPeerId;
  // },
  peer: state => {
    return state.peer;
  },
  connections: state => {
    return state.peer.connections;
  },
  logs: state => {
    return state.logs;
  }
};
