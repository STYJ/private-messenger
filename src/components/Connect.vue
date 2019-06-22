<template>
  <v-flex v-if="!connected" shrink id="connect-button">
    <v-btn small v-on:click="connect">Connect Metamusk</v-btn>
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
    connect() {
      this.$store.dispatch("web3/connect");
    }
  }
};
</script>
