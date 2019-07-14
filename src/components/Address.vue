<template lang="html">
  <v-flex id="address" class="mx-1">
    <v-card flat color="transparent">
      <v-card-text class="text-xs-center py-2 px-2">
        {{ address }}
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  computed: {
    address() {
      let address;
      if ((address = this.$store.getters["web3/address"]) == "Not connected") {
        return address;
      }
      return address.slice(0, 6) + "..." + address.slice(-6);
    }
  }
};
</script>

<style lang="css" scoped>
#address {
  border-radius: 5px;
  border-color: grey;
  border-style: solid;
}
</style>
