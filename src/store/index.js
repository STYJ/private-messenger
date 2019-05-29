// jshint esversion: 8

import Vue from "vue";
import Vuex from "vuex";
import web3 from "./web3";
import peerjs from "./peerjs";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    web3,
    peerjs
  }
});

store.dispatch('peerjs/s_init')

export default store;
