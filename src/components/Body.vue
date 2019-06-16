<template lang="html">
  <v-layout wrap id="body">
    <v-flex xs3>
      <v-btn small v-on:click="init">Initialise Account</v-btn>
      <v-form v-on:submit.prevent="connect(receiver_id)">
        <v-layout align-center justify-space-around>
          <v-flex shrink>
            <v-btn fab flat small color="primary" type="submit">
              Connect
            </v-btn>
          </v-flex>
          <v-flex shrink xs8>
            <v-text-field
              placeholder="Enter receiver ID"
              v-model="receiver_id"
            />
          </v-flex>
        </v-layout>
      </v-form>
      <h1>Lists of connections</h1>
      {{ connections }}
    </v-flex>
    <v-flex xs6>
      <v-list ref="chat" id="logs">
        <template v-for="(log, index) in logs">
          <v-subheader v-if="log" v-bind:key="index">
            {{ log }}
          </v-subheader>
        </template>
      </v-list>

      <v-form v-on:submit.prevent="submit">
        <v-layout>
          <v-flex xs11>
            <v-text-field
              placeholder="Type something here..."
              v-model="new_message"
            />
          </v-flex>
          <v-flex align-self-center>
            <v-btn fab flat small color="primary" type="submit">
              <v-icon>send</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-flex>
  </v-layout>
</template>
<style lang="css" scoped>
#body {
  background-color: lightblue
}

#logs {
  height:110px;
  overflow: auto;
}
</style>
<script>
export default {
  data() {
    return {
      receiver_id: "",
      active_connection: null,
      connections: [],
      new_message: "",
      logs: this.$store.getters["peerjs/logs"]
    };
  },
  methods: {
    submit() {
      if (this.new_message.length > 0) {
        let peer = this.$store.getters["peerjs/peer"];
        console.log(peer);
        console.log(this.$store);
        // Todo: Error validation check if connection exists. Maybe use activeConnection?
        if (peer !== null) {
          peer.connections[this.receiver_id][0].send(`${this.new_message}`);
          // You need to do this to update your own logs
          // The receiver's logs are being updated via "setupConnection".
          this.logs = this.$store.getters["peerjs/logs"];
          this.logs.push(`${peer.id}: ${this.new_message}`);
          this.$store.dispatch("peerjs/setLogs", this.logs);
        } else {
          console.error("Error peer undefined! Please initiate a new peer.");
        }
        this.new_message = "";
      }
    },
    init() {
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
  },
  watch: {
    logs() {
      setTimeout(() => {
        this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
      }, 0);
    }
  }
};
</script>
