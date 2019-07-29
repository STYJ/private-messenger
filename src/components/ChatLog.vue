<template lang="html">
  <div ref="chat">
    <v-card-text>
      <v-list ref="chat" id="logs">
        <template v-for="(log, index) in logs">
          <v-subheader v-bind:key="index">
            {{ log.id }}: {{ log.message }}
          </v-subheader>
        </template>
      </v-list>
    </v-card-text>
    <!-- <v-card v-for="(log, index) in logs" v-bind:key="index" max-height="300">
      <v-card-text>
        <div>
          {{ log.id }}: {{ log.message }}
          <v-layout align-center>
            <v-flex sm2 class="text-xs-center">
              <v-img class="avatar text-xs-center"
                :src="item.avatar"
              ></v-img>
            </v-flex>
            <v-flex sm10>
              {{ log.message }}
            </v-flex>
          </v-layout>
        </div>
      </v-card-text>
      <hr />
    </v-card> -->
  </div>
</template>

<script>
export default {
  props: ["logs"],
  watch: {
    logs() {
      setTimeout(() => {
        console.log(this.$refs.chat);
        this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
      }, 0);
    }
  }
};
</script>

<style lang="css" scoped>

#logs {
  height: 100px;
  overflow: auto;
}

.avatar {
  height: 40px;
  width: 40px;
  border-radius: 100%;
}
</style>
