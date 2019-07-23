<template lang="html">
  <v-toolbar flat color="blue" prominent>
    <v-toolbar-title>
      {{ to }}
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  props: ["to"]
};
</script>
