<template lang="html">
  <v-flex id="chat">
    <ChatLog v-bind:logs="logs" />
    <ChatAction v-on:submit="submit" />
  </v-flex>
</template>

<script>
import ChatLog from "@/components/ChatLog.vue";
import ChatAction from "@/components/ChatAction.vue";

export default {
  props: ["logs"],
  components: {
    ChatLog,
    ChatAction
  },
  methods: {
    submit(new_message) {
      this.$emit("submit", new_message);
    }
  }
};
</script>

<style lang="css" scoped>
#chat {
  margin: 3%;
}
</style>
