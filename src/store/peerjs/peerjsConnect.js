// jshint esversion:8
import Peer from "peerjs";

export function createPeer(ctx) {
  let address = ctx.rootState.web3.address;
  // let address = null;
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
    setupConn(ctx, peer, conn);
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
    console.error(err);
  });
}

export function connectPeer(ctx, to) {
  let from = ctx.getters.peer;
  console.log(`${from.id} wants to connect to ${to}`);

  if (to == from.id) {
    console.error("Can't connect to self.");
  } else {
    let conn = from.connect(to);
    setupConn(ctx, from, conn);
  }
}

function setupConn(ctx, peer, conn) {
  console.log(`You: ${peer.id}, them: ${conn.peer}`);

  conn.on("open", function() {
    let logs = ctx.getters.logs;
    logs[conn.peer] = [];
    ctx.commit("setLogs", logs);

    // This is when your peer gets message from some other peer gets message from sender.
    conn.on("data", function(data) {
      let logs = ctx.getters.logs;
      logs[conn.peer].push(data);
      ctx.commit("setLogs", logs);
    });

    // Firefox does not support this yet
    // Use the connection.close() function to close it
    // Todo: Clear logs when connection is closed.
    conn.on("close", function() {
      console.log(`Connection with ${conn.peer} has been closed.`);
    });

    conn.on("error", function(err) {
      console.log(err);
    });

    ctx.commit("setPeer", peer);
    ctx.commit("setConnections");

    // Note that sometimes it takes a while to open connection.
    // Todo: Add proper error handling such that you cannot do anything until connection has been established.
    console.log(`End of setup, new connection established to ${conn.peer}`);
  });
}

// function setupFrom(ctx, peer, from_conn) {
//   console.log(`from ${from_conn.peer}`);
// }

export default {
  createPeer,
  connectPeer
};
