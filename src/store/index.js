import Vue from 'vue'
import Vuex from 'vuex'
import web3 from './web3'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    web3
  }
})

export default store
