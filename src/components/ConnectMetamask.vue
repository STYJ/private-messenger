<template>
  <v-layout shrink align-center wrap id="connect-metamask">
    <NetworkStatus />
    <Address />
    <ConnectButton />
  </v-layout>
</template>

<script>
import NetworkStatus from "@/components/NetworkStatus.vue";
import Address from "@/components/Address.vue";
import ConnectButton from "@/components/ConnectButton.vue";

export default {
  components: {
    NetworkStatus,
    Address,
    ConnectButton
  }
};
</script>
