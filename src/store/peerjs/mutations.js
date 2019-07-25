// jshint esversion:8
// Note that mutations have to be synchronous
export default {
  setPeer: (state, peer) => (state.peer = peer),
  // Todo: Update setConnection function to only show list of connections where open = true. No need such an elegant solution la.
  setConnections: state =>
    (state.connections = Object.keys(state.peer.connections)),
  setLogs: (state, logs) => (state.logs = logs)
};
