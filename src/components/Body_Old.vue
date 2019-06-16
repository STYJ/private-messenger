<template lang="html">
  <v-layout wrap id="body">
    <v-flex xs6>
      <h3>Sender</h3>
      <v-btn small v-on:click="s_init">Initialise Sender</v-btn>
      <v-form v-on:submit.prevent="s_connect(receiver_id)">
        <v-layout align-center justify-space-around>
          <v-flex shrink>
            <v-btn fab flat small color="primary" type="submit">
              Connect
            </v-btn>
          </v-flex>
          <v-flex shrink xs8>
            <v-text-field
              placeholder="Enter receiver ID."
              v-model="receiver_id"
            />
          </v-flex>
        </v-layout>
      </v-form>
      <v-list ref="chat" id="logs">
        <template v-for="(log, index) in logs">
          <v-subheader v-if="log" v-bind:key="index">
            {{ log }}
          </v-subheader>
        </template>
      </v-list>

      <v-form v-on:submit.prevent="s_submit">
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

    <v-flex xs6>
      <h3>Receiver</h3>
      <v-btn small v-on:click="r_init">Initialise Receiver</v-btn>

      <v-form v-on:submit.prevent="r_submit">
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
      new_message: "",
      logs: [
        "older message #1",
        "this is newer and very very very very very very very very very very  extremely long message #2"
      ]
    };
  },
  methods: {
    s_submit() {
      if (this.new_message.length > 0) {
        let peer = this.$store.getters["peerjs/s_peer"];
        let conn = this.$store.getters["peerjs/s_conn"];
        console.log(this.$store.getters["peerjs/r_peer"]);
        console.log(peer);
        console.log(conn);
        peer !== null ? (peer = peer.id) : (peer = "Sender undefined");
        conn.send(`${this.new_message}`);

        this.logs.push(`${peer}: ${this.new_message}`);
        this.new_message = "";
      }
    },
    r_submit() {
      if (this.new_message.length > 0) {
        let peer = this.$store.getters["peerjs/r_peer"];
        peer !== null ? (peer = peer.id) : (peer = "Receiver undefined");
        this.logs.push(`${peer}: ${this.new_message}`);
        this.new_message = "";
      }
    },
    s_init() {
      this.$store.dispatch("peerjs/s_init");
    },
    s_connect(receiver_id) {
      this.$store.dispatch("peerjs/s_connect", { receiver_id: receiver_id });
    },
    r_init() {
      this.$store.dispatch("peerjs/j_init");
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
