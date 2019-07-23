<template lang="html">
  <v-layout id="body">
    <v-flex xs2>
      <v-navigation-drawer permanent class="transparent">
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
      to: null
    };
  },
  components: {
    Chat
  },
  computed: {
    connections: function() {
      return this.$store.getters["peerjs/connections"];
    },
    logs: function() {
      let logs = this.to ? this.$store.getters["peerjs/logs"][this.to] : [];
      return logs;
    }
  },
  methods: {
    createMessage(id, message) {
      return {
        id: id,
        message: message
      };
    },
    // monitorLogs() {
    //   this.logs = this.$store.getters["peerjs/logs"][this.to];
    // },
    setActiveConnection(to) {
      this.to = to;
      // this.monitorLogs();
    },
    submit(new_message) {},
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
