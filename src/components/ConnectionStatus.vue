<template>
  <v-flex sm6 md4 lg3 align-self-center>
    <v-layout wrap justify-end id="connection-status">
      <ConnectButton />
      <Network />
      <Address />
    </v-layout>
  </v-flex>
</template>

<script>
import ConnectButton from "@/components/ConnectButton.vue";
import Network from "@/components/Network.vue";
import Address from "@/components/Address.vue";

export default {
  components: {
    ConnectButton,
    Network,
    Address
  }
};
</script>
