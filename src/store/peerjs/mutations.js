// jshint esversion:8

export default {
  // setLastPeerId: (state, lastPeerId) => (state.lastPeerId = lastPeerId),
  setPeer: (state, peer) => (state.peer = peer),
  setConnections: state =>
    (state.connections = Object.keys(state.peer.connections)),
  setLogs: (state, logs) => (state.logs = logs)
};
