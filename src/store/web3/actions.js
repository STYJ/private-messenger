// jshint esversion:8

import { connectProvider } from "./web3Connect";

export default {
  connect(context) {
    connectProvider(context);
  }
};
