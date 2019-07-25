// jshint esversion:8

import { createPeer, connectPeer } from "./peerjsConnect";

// To make your life easier, all actions should be asynchronous since dispatch returns a promise
export async function init(ctx) {
  createPeer(ctx);
}

export async function connect(ctx, id) {
  connectPeer(ctx, id);
}

export async function setLogs(ctx, logs) {
  ctx.commit("setLogs", logs);
}

export default {
  init,
  connect,
  setLogs
};
