<template lang="html">
  <v-flex id="chat">
    <ChatHeader v-bind:active_connection="active_connection" />
    <ChatLog v-bind:logs="logs" />
    <ChatAction v-on:submit="submit" />
  </v-flex>
</template>

<script>
import ChatHeader from "@/components/ChatHeader.vue";
import ChatLog from "@/components/ChatLog.vue";
import ChatAction from "@/components/ChatAction.vue";

export default {
  props: ["logs", "active_connection"],
  components: {
    ChatHeader,
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
