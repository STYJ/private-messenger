<template lang="html">
  <v-layout shrink id="header">
    <Logo />
    <v-spacer></v-spacer>
    <ConnectMetamask />
  </v-layout>
</template>


<style lang="css" scoped>
#header {
  background-color: yellow
}
</style>

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
