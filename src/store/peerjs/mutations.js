// jshint esversion:8

export default {
  s_setLastPeerId: (state, s_lastPeerId) => (state.s_lastPeerId = s_lastPeerId),
  s_setPeer: (state, s_peer) => (state.s_peer = s_peer),
  // s_setPeerId: (state, s_peerId) => (state.s_peerId = s_peerId),
  s_setConn: (state, s_conn) => (state.s_conn = s_conn),

  r_setLastPeerId: (state, r_lastPeerId) => (state.r_lastPeerId = r_lastPeerId),
  r_setPeer: (state, r_peer) => (state.r_peer = r_peer),
  // r_setPeerId: (state, r_peerId) => (state.r_peerId = r_peerId),
  r_setConn: (state, r_conn) => (state.r_conn = r_conn)
};
