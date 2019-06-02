// jshint esversion:8
import Peer from "peerjs";

export function s_initialise(context) {
  var lastPeerId = context.getters.s_lastPeerId;
  var peer = context.getters.s_peer; // Own peer object
  var peerId = null;
  var conn = context.getters.s_conn;

  peer = new Peer(null, {
    debug: 2
  });

  peer.on('open', function(id) {
    // Workaround for peer.reconnect deleting previous id
    if (peer.id === null) {
      console.log('Received null id from peer open');
      peer.id = lastPeerId;
      context.commit("s_setPeer", peer);
    } else {
      lastPeerId = peer.id;
      context.commit("s_setLastPeerId", lastPeerId);
    }
    console.log('Sender_ID: ' + peer.id);
  });
  peer.on('disconnected', function() {
    console.log('Connection lost. Please reconnect');
    // Workaround for peer.reconnect deleting previous id
    peer.id = lastPeerId;
    peer._lastServerId = lastPeerId;
    context.commit("s_setPeer", peer);
    peer.reconnect();
  });
  peer.on('close', function() {
    conn = null;
    context.commit("s_setConn", conn);
    console.log('Connection destroyed');
  });
  peer.on('error', function(err) {
    console.log(err);
  });
  context.commit("s_setPeer", peer);
}

export function s_connect(context, payload) {
  console.log(payload);
  let peer = context.getters.s_peer;
  console.log("Peer is ", peer);
  let conn = context.getters.s_conn;
  if (conn) {
    conn.close();
  }
  // Create connection to destination peer specified in the input field
  conn = peer.connect(payload.receiver_id, {
    reliable: true
  });
  conn.on('open', function() {
    console.log(`Sender connected to Receiver ${conn.peer}`);
    // // Check URL params for comamnds that should be sent immediately
    // var command = getUrlParam("command");
    // if (command)
    //   conn.send(command);
  });
  // Handle incoming data (messages only since this is the signal sender)
  conn.on('data', function(data) {
    addMessage("Sender", data);
  });
  conn.on('close', function() {
    console.log("Sender's Connection with Receiver is closed")
  });
}

export function r_initialise(context) {
  var lastPeerId = context.getters.r_lastPeerId;
  var peer = context.getters.r_peer; // Own peer object
  var peerId = null;
  var conn = context.getters.r_conn;

  peer = new Peer(null, {
    debug: 2
  });

  peer.on("open", function(id) {
    // Workaround for peer.reconnect deleting previous id
    if (peer.id === null) {
      console.log("Received null id from peer open");
      peer.id = lastPeerId;
      context.commit("r_setPeer", peer);
    } else {
      lastPeerId = peer.id;
      context.commit("r_setLastPeerId", lastPeerId);
    }
    console.log("Receiver_ID: " + peer.id);
    console.log("Awaiting connection...");
  });
  peer.on("connection", function(c) {
    // Allow only a single connection
    if (conn) {
      c.on("open", function() {
        c.send("Already connected to another client");
        setTimeout(function() {
          c.close();
        }, 500);
      });
      return;
    }
    conn = c;
    context.commit("r_setConn", conn);
    console.log(`Receiver connected to Sender ${conn.peer}`);

    conn.on("data", function(data) {
      addMessage("Sender", data);
    });
    conn.on("close", function() {
      conn = null;
      context.commit("r_setConn", conn);
      console.log("connection closed");
    });
  });
  peer.on("disconnected", function() {
    console.log("Connection lost. Please reconnect");
    // Workaround for peer.reconnect deleting previous id
    peer.id = lastPeerId;
    peer._lastServerId = lastPeerId;
    context.commit("r_setPeer", peer);
    peer.reconnect();
  });
  peer.on("close", function() {
    conn = null;
    context.commit("r_setConn", conn);
    console.log("Connection destroyed");
  });
  peer.on("error", function(err) {
    console.log(err);
  });
  context.commit("r_setPeer", peer);
}

function addMessage(peer, message) {
  console.log(`${peer}: ${message}`);
}

export default {
  s_initialise,
  s_connect,
  r_initialise
};
