// jshint esversion:8
import Peer from "peerjs";

export function initialise() {
  let peer = new Peer(null, {
    debug: 2
  });

  console.log(peer);
}

export default {
  initialise
};
