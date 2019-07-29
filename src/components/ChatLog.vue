<template lang="html">
  <v-card-text>
    <v-list color="success" ref="chat" id="logs">
      <template v-for="(log, index) in logs">
        <p v-bind:key="index" class="log">{{ log.id }}: {{ log.message }}</p>
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
</template>

<script>
export default {
  props: ["logs"],
  watch: {
    logs() {
      setTimeout(() => {
        this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
      }, 0);
    }
  }
};
</script>

<style lang="css" scoped>

.log {
  max-width: 100%;
  max-height: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

#logs {
  height: 400px;
  overflow-y: auto;
}

.avatar {
  height: 40px;
  width: 40px;
  border-radius: 100%;
}
</style>
