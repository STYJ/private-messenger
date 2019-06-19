<template lang="html">
  <v-list color="none" ref="chat" id="logs">
    <template v-for="(log, index) in logs">
      <v-list-tile color="success" v-if="log" v-bind:key="index">
        {{ log }}
      </v-list-tile>
    </template>
  </v-list>

</template>

<script>
export default {
  props: ['logs'],
  watch: {
    logs() {
      setTimeout(() => {
        this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
      }, 0);
    }
  }
}
</script>

<style lang="css" scoped>

#logs {
  height:80%;
  overflow: auto;
}
</style>
