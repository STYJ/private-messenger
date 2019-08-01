message<template lang="html">
  <v-layout id="body">
    <v-flex shrink>
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
          <v-layout align-center justify-space-around wrap>
            <v-flex shrink>
              <v-text-field
                placeholder="Enter receiver ID"
                v-model="new_connection"
              />
            </v-flex>
            <v-flex md3 class="text-xs-center">
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

    <Chat v-bind:logs="logs" v-on:submit="submit" v-bind:to="to" />
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
      to: "Privacy focused messenging app",
      logs: [
        { id: "Admin", message: "Hi!" },
        {
          id: "Admin",
          message: "Please read the following instructions before proceeding."
        },
        {
          id: "Admin",
          message:
            "This dapp currently only works with metamask so ensure that you have metamask installed."
        },
        { id: "Admin", message: "Click on the 'Connect Metamask' button." },
        {
          id: "Admin",
          message:
            "If not enabled, a prompt will be triggered to request for permission to allow the dapp to connect."
        },
        {
          id: "Admin",
          message:
            "After enabling it, enter an Ethereum address (this address must also be currently connected to the dapp) into the input field and click connect."
        },
        {
          id: "Admin",
          message: "Voila! You're done. You may begin your conversation."
        },
        {
          id: "Admin",
          message:
            "Before you go, remember that if you were to accidentally or purposely refresh your tab, you will lose all your connections and chat history."
        }
      ]
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
    updateLogs() {
      // this.logs = this.$store.getters["peerjs/logs"][this.to];
      this.logs = this.to ? this.$store.getters["peerjs/logs"][this.to] : [];
    },
    setActiveConnection(to) {
      this.to = to;
      this.updateLogs();
    },
    async submit(message) {
      // Todo: Should not be able to submit message until connection has been established
      if (message.length > 0) {
        let peer = this.$store.getters["peerjs/peer"];
        if (peer !== null) {
          let messagePayload = this.createMessage(peer.id, message);
          // To handle dropped connetions
          if (
            peer.connections[this.to].length > 0 &&
            peer.connections[this.to][0].open
          ) {
            peer.connections[this.to][0].send(messagePayload);
            // You need to do this to update your own logs
            let logs = this.$store.getters["peerjs/logs"];
            logs[this.to].push(messagePayload);
            await this.$store.dispatch("peerjs/setLogs", logs);
          } else {
            console.error(`${this.to} is no longer active.`);
          }

          this.updateLogs();
        } else {
          console.error("Error peer undefined! Please initiate a new peer.");
        }
      } else {
        console.error("Message length cannot be 0.");
      }
    },
    // Todo: Add error handling for empty to, self or if havent created peer
    // Todo: Get updated list of connections whenever someone connects
    async connect(to) {
      // If you want to send more than 1 param to the action, use an object {}
      await this.$store.dispatch("peerjs/connect", to);
      // console.log(`${this.$store.getters["peerjs/peer"].id}'s store contains `, this.$store);
      this.new_connection = "";
    }
  }
};
</script>
