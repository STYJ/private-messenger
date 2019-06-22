<template lang="html">
  <v-toolbar
    flat
    color="blue"
    prominent
  >
    <v-toolbar-title>
      {{ receiver_id }}
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  props: ["receiver_id"]
}
</script>
