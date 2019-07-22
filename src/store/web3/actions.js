// jshint esversion:8

import { connectProvider } from "./web3Connect";

// To make your life easier, all actions should be asynchronous since dispatch returns a promise
export async function connect(ctx) {
  await connectProvider(ctx);
}

export default {
  connect
};
