<template lang="html">
  <v-toolbar flat color="blue" prominent>
    <v-toolbar-title>
      {{ active_connection }}
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  props: ["active_connection"]
};
</script>
