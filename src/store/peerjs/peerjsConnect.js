// jshint esversion:8
import Peer from "peerjs";

export function createPeer(ctx) {
  console.log(ctx);
  let address = ctx.rootState.web3.address;
  console.log(address);
}

export function connectPeer(ctx, id) {}

export default {
  createPeer,
  connectPeer
};
