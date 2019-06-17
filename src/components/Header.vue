<template lang="html">
  <v-layout shrink id="header">
    <Logo />
    <v-spacer />
    <ConnectMetamask />
  </v-layout>
</template>

<script>
import Logo from "@/components/Logo.vue";
import ConnectMetamask from "@/components/ConnectMetamask.vue";

export default {
  components: {
    Logo,
    ConnectMetamask
  }
};
</script>

<style lang="css" scoped></style>
