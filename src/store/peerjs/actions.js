// jshint esversion:8

import { s_initialise, r_initialise } from "./peerjsConnect";

export default {
  s_init(context) {
    s_initialise(context);
    r_initialise(context);
  }
  // connect(context) {
  //   connectProvider(context)
  //     .then(payload => {
  //       context.commit("setWeb3", payload.web3);
  //       context.commit("setAddress", payload.address);
  //       context.commit("setNetwork", payload.network);
  //     })
  //     .catch(e => console.error(e));
  // }
  // async init(ctx) {
  //   event.$on(EVENT_CHANNEL, async function (msg) {
  //     console.log('Ethers event received', msg);
  //     switch (msg) {
  //       case MSGS.NOT_READY:
  //         await ctx.dispatch('disconnect');
  //         break;
  //       case MSGS.NO_WALLET:
  //         await ctx.dispatch('logout');
  //         break;
  //       case MSGS.ACCOUNT_CHANGED:
  //         await ctx.dispatch('connect');
  //         break;
  //     }
  //   });
  //   if (ready()) await ctx.dispatch('connect');
  //   event.$emit(EVENT_CHANNEL,MSGS.ETHERS_VUEX_INITIALIZED);
  //   console.log('Log in to your Ethereum wallet to see what it can do!');
  //   ctx.commit('initialized', true);
  // }
};
