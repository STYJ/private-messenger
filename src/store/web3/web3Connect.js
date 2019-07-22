// jshint esversion:8

import Web3 from "web3";

export async function connectProvider(ctx) {
  let addresses, network, ethereum;
  ethereum = window.ethereum;
  if (ethereum) {
    let web3 = new Web3(ethereum);

    try {
      // ethereum.enable returns a resolved promise regardless of result
      // https://medium.com/metamask/eip-1102-preparing-your-dapp-5027b2c9ed76
      addresses = await ethereum.enable();
    } catch (err) {
      console.error("User rejected access");
    }

    if (typeof addresses !== "undefined") {
      try {
        network = await web3.eth.net.getNetworkType();
      } catch (error) {
        console.error("Network error");
      }

      // Subscribing to account change
      web3.eth.currentProvider.on("accountsChanged", async function(accounts) {
        let account = web3.utils.toChecksumAddress(accounts[0]);
        ctx.commit("setAddress", account);
        // Creates a new peer when you change account
        // To dispatch action from another module, just specify root context as the third argument.
        await ctx.dispatch("peerjs/init", null, { root: true });
      });

      ctx.commit("setWeb3", web3);
      ctx.commit("setAddress", web3.utils.toChecksumAddress(addresses[0]));
      ctx.commit(
        "setNetwork",
        network.localeCompare("main") ? network : "Mainnet"
      );
      ctx.commit("connect");
    } else {
      console.error("Metamask connection failed, please try again.");
    }
  }
  // Add the other conditions here like legacy dapp browser etc.
  // else if (window.web3)...
}

export default {
  connectProvider
};
