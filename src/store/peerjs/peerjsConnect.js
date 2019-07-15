// jshint esversion:8
import Peer from "peerjs";

export function init(context) {
  // Create new peer
  // https://peerjs.com/docs.html#peer-id
  let peer = new Peer(null, {
    debug: 2
  });

  // Setting up peer
  // https://peerjs.com/docs.html#peeron
  peer.on("open", function(id) {
    // Workaround for peer.reconnect deleting previous id
    // if (peer.id === null) {
    //   console.log("Received null id from peer open");
    //   peer.id = lastPeerId;
    //   context.commit("setPeer", peer);
    // } else {
    //   lastPeerId = peer.id;
    //   context.commit("setLastPeerId", lastPeerId);
    // }
    console.log(`Peer initiated: ${id}`);
  });
  peer.on("connection", function(conn) {
    // Help the receiver connect back to the sender
    console.log(`${peer.id} received an incoming connection from ${conn.peer}`);
    setupConnection(context, peer, conn);
  });
  peer.on("call", function(mediaConnection) {
    console.log(`I haven't figured out how to handle calls ${mediaConnection}`);
  });
  peer.on("close", function() {
    peer.destroy();
    console.log(`Peer ${peer.id} closed and destroyed.`);
  });
  peer.on("disconnected", function() {
    // Workaround for peer.reconnect deleting previous id
    // peer.id = lastPeerId;
    // peer._lastServerId = lastPeerId;
    // context.commit("setPeer", peer);
    console.log("Connection lost. Please reconnect");
    // peer.reconnect();
  });
  peer.on("error", function(err) {
    // https://peerjs.com/docs.html#peeron-error
    console.log(err);
  });
  context.commit("setPeer", peer);
}

// Sender connecting to receiver
export function connect(context, receiver_id) {
  let peer = context.getters.peer;
  // let conn = context.getters.conn;
  // Close old connections if any i.e. only 1 connection.
  // if (conn) {
  //   conn.close();
  // }
  // https://peerjs.com/docs.html#dataconnection
  let conn = peer.connect(receiver_id, {
    // reliable: false
    // metadata: "Use this to identify the peer."
  });

  setupConnection(context, peer, conn);
}

function setupConnection(context, peer, conn) {
  console.log(
    `${peer.id} is trying to establishing connection to ${conn.peer}`
  );
  conn.on("open", function() {
    let logs = context.getters.logs;
    // Todo: Check if logs exist, if so, don't delete old logs
    logs[conn.peer] = [];
    context.commit("setLogs", logs);
    // Note that sometimes it takes a while to open connection. I don't know why either...
    // Todo: Add proper error handling such that you cannot do anything until connection has been established.
    console.log(`New connection established to ${conn.peer}`);

    // Setting up of listeners for other connection events should be after connection is open.
    // This is when receiver gets message from sender.
    conn.on("data", function(data) {
      console.log(`Incoming message from ${conn.peer}`);
      console.log(data);
      let logs = context.getters.logs;
      logs[conn.peer].push(data);
      // console.log("Receiver logs", logs)
      context.commit("setLogs", logs);
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

    // Update peer in vuex to latest peer with newest connection
    console.log("Updating peer");
    context.commit("setPeer", peer);
    context.commit("setConnections"); // setConnection is for list of connections
  });
}

export default {
  init,
  connect
};
