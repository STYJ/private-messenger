<template>
  <v-flex shrink>
    <v-btn small v-show="!connected" v-on:click="connectMetamask"
      >Connect Metamask</v-btn
    >
  </v-flex>
</template>

<script>
export default {
  computed: {
    connected() {
      return this.$store.getters["web3/connected"];
    }
  },
  methods: {
    // Todo: Add error handling if metamask not connected.
    // Todo: Get ethereum address and somehow pass that into the peer as meta data.
    // Todo: Create mapping between ethereum address and peer id.
    // Todo: When change account, peer also changes. Must update the connectProvider function inside web3
    connectMetamask() {
      this.$store.dispatch("web3/connect");
      this.$store.dispatch("peerjs/init");
    }
  }
};
</script>
