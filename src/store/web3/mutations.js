// jshint esversion:8
// Note that mutations have to be synchronous
export default {
  setWeb3: (state, web3) => (state.web3 = web3),
  setAddress: (state, address) => (state.address = address),
  setNetwork: (state, network) => (state.network = network),
  connect: state => (state.connected = true),
  disconnect: state => (state.connected = false)
};
