// jshint esversion:8

import Web3 from "web3";
import to from "await-to-js";

export async function connectProvider(context) {
  let err, addresses, network;
  if (window.ethereum) {
    let web3 = new Web3(window.ethereum);
    // ethereum.enable will always resolve even if you reject so err will be undefined.
    [err, addresses] = await to(window.ethereum.enable());
    if (!addresses) {
      throw "User rejected connection";
    } else {
      [err, network] = await to(web3.eth.net.getNetworkType());
      // It's unlikely to come here unless getNetworkType function fails
      if (!network) {
        throw "Network error.";
      }
      // Subscribing to account change
      web3.eth.currentProvider.on("accountsChanged", function(accounts) {
        let account = web3.utils.toChecksumAddress(accounts[0]);
        context.commit("setAddress", account);
      });
      return {
        web3: web3,
        address: web3.utils.toChecksumAddress(addresses[0]),
        // localeCompare returns 0 if equal
        network: network.localeCompare("main") ? network : "Mainnet"
      };
    }
  }
  // Add the other conditions here like legacy dapp browser etc.
  // else if (window.web3)...
}

export default {
  connectProvider
};
