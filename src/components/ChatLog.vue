<template lang="html">
  <v-card-text>
    <v-list ref="chat" id="logs">
      <template v-for="(log, index) in logs">
        <p v-bind:key="index" class="log">{{ log.id }}: {{ log.message }}</p>
      </template>
    </v-list>
  </v-card-text>
</template>

<script>
export default {
  props: ["logs"],
  watch: {
    logs() {
      setTimeout(() => {
        this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
      }, 0);
    }
  }
};
</script>

<style lang="css" scoped>

.log {
  max-width: 100%;
  max-height: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

#logs {
  height: 400px;
  overflow-y: auto;
}

.avatar {
  height: 40px;
  width: 40px;
  border-radius: 100%;
}
</style>
