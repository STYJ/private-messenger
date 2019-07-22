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
    // Todo: Get ethereum address and somehow pass that into the peer as meta data.
    // Todo: Create mapping between ethereum address and peer id.
    async connectMetamask() {
      try {
        await this.$store.dispatch("web3/connect");
      } catch (err) {
        console.error(err);
      }

      try {
        await this.$store.dispatch("peerjs/init");
      } catch (err) {
        console.error("Unable to initialise new user.");
      }
    }
  }
};
</script>
