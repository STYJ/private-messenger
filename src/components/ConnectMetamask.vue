<template>
  <v-layout align-center justify-end wrap id='connect-metamask'>
    <v-flex shrink id='network'>
      <v-btn flat disabled small>{{ network }}</v-btn>
    </v-flex>
    <v-flex v-if='address != null' shrink id='address'>
      <v-btn flat disabled small>{{ address }}</v-btn>
    </v-flex>
    <v-flex v-if='address == null' shrink id='connect'>
      <v-btn small v-on:click='connect'>Connect Metamask</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    address () {
      return this.$store.getters["web3/address"];
    },
    network () {
      return this.$store.getters["web3/network"];
    }
  },
  methods: {
    connect () {
      this.$store.dispatch('web3/connect');
    },
  }
};
</script>

<style lang='css' scoped>
#connect-metamask {
}
</style>
