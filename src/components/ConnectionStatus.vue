<template>
  <v-flex sm3 align-self-center>
    <v-layout justify-end id="connection-status">
      <Network />
      <Address />
    </v-layout>
  </v-flex>
</template>

<script>
import Network from "@/components/Network.vue";
import Address from "@/components/Address.vue";

export default {
  components: {
    Network,
    Address
  }
};
</script>
