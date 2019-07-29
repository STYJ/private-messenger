<template lang="html">
  <v-card-title>
    <v-toolbar flat color="transparent" prominent>
      <v-toolbar-title>
        {{ to }}
      </v-toolbar-title>
    </v-toolbar>
  </v-card-title>
</template>

<script>
export default {
  props: ["to"]
};
</script>
