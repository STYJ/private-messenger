<template lang="html">
  <v-layout wrap shrink id="header">
    <Logo />
    <v-spacer />
    <ConnectionStatus />
  </v-layout>
</template>

<script>
import Logo from "@/components/Logo.vue";
import ConnectionStatus from "@/components/ConnectionStatus.vue";

export default {
  components: {
    Logo,
    ConnectionStatus
  }
};
</script>

<style lang="css" scoped>
#header {
  margin: 1% 0
}
</style>
