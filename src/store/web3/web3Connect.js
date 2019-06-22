// jshint esversion:8

import Web3 from "web3";

export async function connectProvider(context) {
  let addresses, network, ethereum;
  ethereum = window.ethereum;
  if (ethereum) {
    let web3 = new Web3(ethereum);

    try {
      addresses = await ethereum.enable();
    } catch (error) {
      console.error("User rejected provider access");
    }

    if (addresses) {
      try {
        network = await web3.eth.net.getNetworkType();
      } catch (error) {
        console.error("Network error.");
      }

      // Subscribing to account change
      web3.eth.currentProvider.on("accountsChanged", function(accounts) {
        let account = web3.utils.toChecksumAddress(accounts[0]);
        context.commit("setAddress", account);
      });

      context.commit("setWeb3", web3);
      context.commit("setAddress", web3.utils.toChecksumAddress(addresses[0]));
      context.commit(
        "setNetwork",
        network.localeCompare("main") ? network : "Mainnet"
      );
      context.commit("connect");
    }
  }
  // Add the other conditions here like legacy dapp browser etc.
  // else if (window.web3)...
}

export default {
  connectProvider
};
