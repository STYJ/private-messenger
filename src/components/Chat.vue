<template lang="html">
  <v-flex sm8 id="chat">
    <ChatHeader v-bind:receiver_id="receiver_id" />
    <ChatLog v-bind:logs="logs" />
    <ChatAction v-on:submit="submit" />
  </v-flex>
</template>

<script>
import ChatHeader from "@/components/ChatHeader.vue";
import ChatLog from "@/components/ChatLog.vue";
import ChatAction from "@/components/ChatAction.vue";

export default {
  props: ["logs", "receiver_id"],
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
