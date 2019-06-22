<template lang="html">
  <v-layout wrap id="body">
    <v-flex sm3 id="connections">
      <v-btn small v-on:click="connectMetamask">Connect Metamask</v-btn>
      <v-form v-on:submit.prevent="connect(receiver_id)">
        <v-layout align-center justify-space-around>
          <v-flex shrink>
            <!-- Todo: Add search functionality but this requires a server....? -->
            <!-- Todo: Connect automatically happens when you search for someone and try to message them. -->
            <v-btn fab flat small color="primary" type="submit">
              Connect
            </v-btn>
          </v-flex>
          <v-flex shrink sm8>
            <v-text-field
              placeholder="Enter receiver ID"
              v-model="receiver_id"
            />
          </v-flex>
        </v-layout>
      </v-form>
      <!-- Todo: Change to a clickable list where you can change between logs -->
      <h1>Lists of connections</h1>
      {{ connections }}
    </v-flex>
    <Chat v-bind:logs="logs" v-on:submit="submit" />
  </v-layout>
</template>
<style lang="css" scoped>
#body {
  background-color: lightblue
}
</style>
<script>
import Chat from "@/components/Chat.vue";
export default {
  data() {
    return {
      receiver_id: "",
      active_connection: null,
      connections: [],
      logs: this.$store.getters["peerjs/logs"]
    };
  },
  components: {
    Chat
  },
  methods: {
    submit(new_message) {
      if (new_message.length > 0) {
        let peer = this.$store.getters["peerjs/peer"];
        console.log(peer);
        console.log(this.$store);
        // Todo: Error validation check if connection exists. Maybe use activeConnection?
        if (peer !== null) {
          peer.connections[this.receiver_id][0].send(`${new_message}`);
          // You need to do this to update your own logs
          // The receiver's logs are being updated via "setupConnection".
          this.logs = this.$store.getters["peerjs/logs"];
          this.logs.push(`${peer.id}: ${new_message}`);
          this.$store.dispatch("peerjs/setLogs", this.logs);
        } else {
          console.error("Error peer undefined! Please initiate a new peer.");
        }
      }
    },
    // Todo: Add error handling if metamask not connected.
    // Todo: Get ethereum address and somehow pass that into the peer as meta data.
    // Todo: Create mapping between ethereum address and peer id.
    // Todo: When change account, peer also changes. Must update the connectProvider function inside web3
    connectMetamask() {
      this.$store.dispatch("web3/connect");
      this.$store.dispatch("peerjs/init");
    },
    // Todo: Add error handling for empty receiver_id and self.
    // Todo: Get updated list of connections whenever someone connects
    connect(receiver_id) {
      // If you want to send more than 1 param to the action, use an object {}
      this.$store.dispatch("peerjs/connect", receiver_id);
      this.connections.push(receiver_id);
      // this.receiver_id = ""; // If I do this, I need a way to get the active connection
    }
  }
};
</script>
