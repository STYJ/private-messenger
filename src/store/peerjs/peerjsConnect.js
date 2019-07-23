// jshint esversion:8
import Peer from "peerjs";

export function createPeer(ctx) {
  // let address = ctx.rootState.web3.address;
  let address = null;
  let peer = new Peer(address, {
    debug: 2
  });

  setupPeer(ctx, peer);
  ctx.commit("setPeer", peer);
}

function setupPeer(ctx, peer) {
  peer.on("open", function(id) {
    console.log(`Peer ${id} initiated`);
  });
  peer.on("connection", function(conn) {
    console.log(
      `Peer ${peer.id} received an incoming connection from ${conn.peer}`
    );
    setupFrom(ctx, peer, conn);
  });
  peer.on("call", function(mediaConnection) {
    console.log(`I haven't figured out how to handle calls ${mediaConnection}`);
  });
  peer.on("close", function() {
    peer.destroy();
    console.log(`Peer ${peer.id} closed and destroyed.`);
  });
  peer.on("disconnected", function() {
    console.log("Connection lost. Trying to reconnect...");
    peer.reconnect();
  });
  peer.on("error", function(err) {
    console.log(err);
  });
}

export function connectPeer(ctx, to) {
  let from = ctx.getters.peer;
  console.log(`${from.id} wants to connect to ${to}`);
  let conn;
  try {
    conn = from.connect(to);
  } catch (err) {
    console.error(err);
  }
  setupTo(ctx, from, conn);

  ctx.commit("setPeer", from);
  ctx.commit("setConnections");
}

function setupTo(ctx, peer, to_conn) {
  console.log(`to ${to_conn.peer}`);
}

function setupFrom(ctx, peer, from_conn) {
  console.log(`from ${from_conn.peer}`);
}

export default {
  createPeer,
  connectPeer
};
