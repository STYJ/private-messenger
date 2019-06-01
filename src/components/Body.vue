<template lang="html">
  <v-layout wrap id="body">
    <v-flex>
      <h3>Sender</h3>
      <v-btn small v-on:click='s_init'>Initialise Sender</v-btn>
      <v-flex xs9>
        <v-textarea
          solo
          autofocus
          placeholder="type message here"
        ></v-textarea>
        <v-btn small v-on:click='print_console()'>console me!</v-btn>
      </v-flex>
      <!-- <v-layout>
        <v-flex xs12 sm8 md4>
          <v-card>
            <v-toolbar dark color="primary darken-1">
              <v-toolbar-title>PM with XYZ</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-list ref="chat" id="logs">
                <template v-for="(item, index) in logs">
                  <v-subheader v-if="item" :key="index">{{ item }}</v-subheader>
                </template>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-form @submit.prevent="submit">
                <v-text-field v-model="msg" label="Message" single-line solo-inverted></v-text-field>
                <v-btn fab dark small color="primary" type="submit">
                  <v-icon dark>send</v-icon>
                </v-btn>
              </v-form>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout> -->

    </v-flex>

    <v-flex>
      <h3>Receiver</h3>
      <v-btn small v-on:click='r_init'>Initialise Receiver</v-btn>

    </v-flex>
  </v-layout>
</template>


<style lang="css" scoped>
#body {
  background-color: lightblue
}
</style>

<script>
export default {
  data() {
    return {
      message: "Hello",
      // logs: [],
      // msg: null
    };
  },
  methods: {
    // submit() {
    //   this.logs.push(this.msg);
    //   this.msg = "";
    // },
    print_console(msg) {
      console.log(msg);
    },
    s_init() {
      this.$store.dispatch("peerjs/s_init");
    },
    r_init() {
      this.$store.dispatch("peerjs/j_init");
    },
  },
  // watch: {
  //   logs() {
  //     setTimeout(() => {
  //       this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
  //     }, 0);
  //   }
  // }
};
</script>
