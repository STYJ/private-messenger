<template>
  <v-flex v-if="address == 'Null'" shrink id="connect-button">
    <v-btn small v-on:click="connect">Connect Metamusk</v-btn>
  </v-flex>
</template>

<script>
export default {
  computed: {
    address() {
      return this.$store.getters["web3/address"];
    }
  },
  methods: {
    connect() {
      this.$store.dispatch("web3/connect");
    }
  }
};
</script>
