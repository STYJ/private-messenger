// jshint esversion:8

export default {
  s_lastPeerId: state => {
    return state.s_lastPeerId;
  },
  s_peer: state => {
    return state.s_peer;
  },
  // s_peerId: state => {
  //   return state.s_peerId;
  // },
  s_conn: state => {
    return state.s_conn;
  },

  r_lastPeerId: state => {
    return state.r_lastPeerId;
  },
  r_peer: state => {
    return state.r_peer;
  },
  // r_peerId: state => {
  //   return state.r_peerId;
  // },
  r_conn: state => {
    return state.r_conn;
  }
};
