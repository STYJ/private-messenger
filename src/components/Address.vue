<template lang="html">
  <v-flex v-if="address != 'Null'" shrink id="address">
    <v-card flat color="transparent">
      <v-card-text class="text-xs-right">
        {{ address }}
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  computed: {
    address() {
      return this.$store.getters["web3/address"];
    }
  }
};
</script>
