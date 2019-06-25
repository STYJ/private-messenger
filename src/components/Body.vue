<template lang="html">
  <v-layout id="body">
    <v-flex xs2>
      <v-navigation-drawer permanent class="transparent">
        <v-toolbar flat class="transparent">
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title">
                Chats
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-tile
            v-for="item in items"
            :key="item.title"
            @click=""
          >
            <!-- <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action> -->

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-flex>
    <v-flex >
      Chat appears here.
    </v-flex>
  </v-layout>

  <!-- <v-layout wrap id="body">
    <v-flex sm3 id="connections">
      <v-btn small v-on:click="connectMetamask">Connect Metamask</v-btn>
      <v-form v-on:submit.prevent="connect(active_id)">
        <v-layout align-center justify-space-around>
          <v-flex shrink>
            Todo: Add search functionality but this requires a server....?
            Todo: Connect automatically happens when you search for someone and try to message them.
            <v-btn fab flat small color="primary" type="submit">
              Connect
            </v-btn>
          </v-flex>
          <v-flex shrink sm8>
            <v-text-field
              placeholder="Enter receiver ID"
              v-model="active_id"
            />
          </v-flex>
        </v-layout>
      </v-form>
      Todo: Change to a clickable list where you can change between logs
      <h1>Lists of connections</h1>
      {{ connections }}
    </v-flex>
    <Chat
      v-bind:logs="logs[active_id]"
      v-bind:active_id="active_id"
      v-on:submit="submit"
    />
  </v-layout> -->
</template>
<style lang="css" scoped>
.give-me-borders {
  border-style: solid;
  border-width: 5px;
  border-color: grey !important;
}
</style>
<script>
import Chat from "@/components/Chat.vue";
export default {
  data() {
    return {
      active_id: "",
      active_connection: null,
      logs: "",
      // logs: this.$store.getters["peerjs/logs"]
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      right: null
    };
  },
  components: {
    Chat
  },
  computed: {
    connections: function() {
      return this.$store.getters["peerjs/connections"];
    }
  },
  methods: {
    createMessage(id, message) {
      return {
        id: id,
        message: message
      };
    },
    submit(new_message) {
      if (new_message.length > 0) {
        let peer = this.$store.getters["peerjs/peer"];
        console.log(peer);
        console.log(this.$store);
        // Todo: Error validation check if connection exists. Maybe use activeConnection?
        if (peer !== null) {
          let messagePayload = this.createMessage(peer.id, new_message);
          peer.connections[this.active_id][0].send(messagePayload);
          // You need to do this to update your own logs
          // The receiver's logs are being updated via "setupConnection".

          let logs = this.$store.getters["peerjs/logs"];
          console.log(logs);
          logs[this.active_id].push(messagePayload);
          this.$store.dispatch("peerjs/setLogs", logs);

          // Need to pull logs again to auto refresh logs.
          this.logs = this.$store.getters["peerjs/logs"];
          console.log(this.logs);
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
    // Todo: Add error handling for empty active_id and self.
    // Todo: Get updated list of connections whenever someone connects
    connect(active_id) {
      // If you want to send more than 1 param to the action, use an object {}
      this.$store.dispatch("peerjs/connect", active_id);
      console.log(this.$store.getters["peerjs/peer"]);
      console.log(this.$store);
      // this.active_id = ""; // If I do this, I need a way to get the active connection
    }
  }
};
</script>
