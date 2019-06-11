<template>
  <v-layout align-center justify-end wrap id="connect-metamask">
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
