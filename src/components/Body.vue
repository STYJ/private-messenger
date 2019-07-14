<template lang="html">
  <v-layout id="body">
    <v-flex xs2>
      <v-navigation-drawer permanent class="transparent">
        <!-- <v-toolbar flat class="transparent">
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title">
                Chats
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-divider></v-divider> -->
        <v-form v-on:submit.prevent="connect(new_connection)">
          <v-layout align-center justify-space-around>
            <v-flex shrink sm8>
              <v-text-field
                placeholder="Enter receiver ID"
                v-model="new_connection"
              />
            </v-flex>
            <v-flex shrink>
              <!-- Todo: Add search functionality but this requires a server....?
              Todo: Connect automatically happens when you search for someone and try to message them. -->
              <v-btn fab flat small color="primary" type="submit">
                Connect
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>

        <v-list dense>
          <v-list-tile
            v-for="connection in connections"
            v-bind:key="connection"
            v-on:click="setActiveConnection(connection)"
          >
            <!-- <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action> -->

            <v-list-tile-content>
              <v-list-tile-title>{{ connection }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-flex>

    <Chat
      v-bind:logs="logs"
      v-on:submit="submit"
      v-bind:active_connection="active_connection"
    />
  </v-layout>
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
      new_connection: "",
      active_connection: null,
      logs: "",
      // logs: this.$store.getters["peerjs/logs"]
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ]
    };
  },
  components: {
    Chat
  },
  computed: {
    connections: function() {
      return this.$store.getters["peerjs/connections"];
    },
  },
  methods: {
    updateLogs() {
      this.logs = this.$store.getters["peerjs/logs"][this.active_connection];
    },
    setActiveConnection(connection) {
      this.active_connection = connection;
      this.updateLogs();
    },
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
          // Todo: Dropped clients don't have [0].
          peer.connections[this.active_connection][0].send(messagePayload);
          // You need to do this to update your own logs
          // The receiver's logs are being updated via "setupConnection".

          let logs = this.$store.getters["peerjs/logs"];
          logs[this.active_connection].push(messagePayload);
          this.$store.dispatch("peerjs/setLogs", logs);
          console.log("Updated Sender logs", this.$store.getters["peerjs/logs"]);


          // Need to pull logs again to auto refresh logs.
          // this.logs = this.$store.getters["peerjs/logs"];
          // console.log(this.logs);
        } else {
          console.error("Error peer undefined! Please initiate a new peer.");
        }
      }
    },
    // Todo: Add error handling for empty active_connection and self.
    // Todo: Get updated list of connections whenever someone connects
    connect(active_connection) {
      // If you want to send more than 1 param to the action, use an object {}
      this.$store.dispatch("peerjs/connect", this.new_connection);
      console.log("inside connect function");
      console.log("peer: ", this.$store.getters["peerjs/peer"]);
      console.log("store: ", this.$store);
      this.new_connection = "";
    }
  }
};
</script>
