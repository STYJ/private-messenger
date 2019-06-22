// jshint esversion:8

export default {
  network: state => {
    return state.network;
  },
  address: state => {
    return state.address;
  },
  web3: state => {
    return state.web3;
  },
  connected: state => {
    return state.connected;
  }
};
