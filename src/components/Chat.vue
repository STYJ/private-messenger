<template lang="html">
  <v-flex id="chat">
    <!-- <v-card color="transparent"> -->
    <ChatHeader v-bind:to="to" />
    <v-divider></v-divider>
    <ChatLog v-bind:logs="logs" />
    <ChatAction v-on:submit="submit" />
    <!-- </v-card> -->
  </v-flex>
</template>

<script>
import ChatHeader from "@/components/ChatHeader.vue";
import ChatLog from "@/components/ChatLog.vue";
import ChatAction from "@/components/ChatAction.vue";

export default {
  props: ["logs", "to"],
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
}
</style>
