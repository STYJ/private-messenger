// jshint esversion:8

export default {
  setLastPeerId: (state, lastPeerId) => (state.lastPeerId = lastPeerId),
  setPeer: (state, peer) => (state.peer = peer),
  setConn: (state, conn) => (state.peer = conn)
};
