<template>
  <v-flex shrink id="network">
    <v-card flat color="transparent">
      <v-card-text class="text-xs-right">
        {{ network }}
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  computed: {
    network() {
      return this.$store.getters["web3/network"];
    }
  }
};
</script>
