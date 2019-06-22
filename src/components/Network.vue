<template>
  <v-flex v-show="connected" id="network" class="mx-1">
    <v-card flat color="transparent">
      <v-card-text class="text-xs-center py-2 px-2">
        {{ network }}
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  computed: {
    connected() {
      return this.$store.getters["web3/connected"];
    },
    network() {
      return this.$store.getters["web3/network"];
    }
  }
};
</script>

<style lang="css" scoped>
#network {

  border-radius: 5px;
  border-color: grey;
  border-style: solid;
}
</style>
