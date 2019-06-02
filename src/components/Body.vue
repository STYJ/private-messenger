<template lang="html">
  <v-layout wrap id="body">
    <v-flex xs6>
      <h3>Sender</h3>
      <v-btn small v-on:click="s_init">Initialise Sender</v-btn>
      <v-form v-on:submit.prevent="s_connect(receiver_id)">
        <v-layout>
          <v-flex shrink>
            <v-btn fab flat small color="primary" type="submit">
              Connect
            </v-btn>
          </v-flex>

          <!-- <v-flex>
            <v-text-field
              solo
              full-width
              placeholder="Enter receiver ID."
              v-model="receiver_id"
            />
          </v-flex> -->

        </v-layout>
      </v-form>



      <!-- <v-list ref="chat" id="logs">
        <template v-for="(log, index) in logs">
          <v-subheader v-if="log" v-bind:key="index">
            {{ log }}
          </v-subheader>
          <v-list-tile v-bind:key="index">
            <v-list-tile-content>
              <v-list-tile-title>{{ log }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>

      <v-form v-on:submit.prevent="submit">
        <v-layout>
          <v-flex xs11>
            <v-text-field
              full-width
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
      </v-form> -->

    </v-flex>

    <v-flex xs6>
      <h3>Receiver</h3>
      <v-btn small v-on:click="r_init">Initialise Receiver</v-btn>

    </v-flex>
  </v-layout>
</template>
<style lang="css" scoped>
#body {
  background-color: lightblue
}

#logs {
  height:112px;
  overflow: auto;
}

</style>
<script>
export default {
  data() {
    return {
      receiver_id: "",
      new_message: "",
      logs: ["older message #1", "this is newer and very very very very very very very very very very  extremely long message #2"]
    };
  },
  methods: {
    submit() {
      if (this.new_message.length > 0) {
        this.logs.push(this.new_message)
        this.new_message = "";
      }
    },
    s_init() {
      this.$store.dispatch("peerjs/s_init");
    },
    s_connect(receiver_id) {
      this.$store.dispatch("peerjs/s_connect", {receiver_id: receiver_id});
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
