<template lang="html">
  <div ref="chat">
    <v-card v-for="(log, index) in logs" v-bind:key="index" max-height="300">
      <v-card-text>
        <div>
          {{ log.id }}: {{ log.message }}
          <!-- <v-layout align-center>
            <v-flex sm2 class="text-xs-center">
              <v-img class="avatar text-xs-center"
                :src="item.avatar"
              ></v-img>
            </v-flex>
            <v-flex sm10>
              {{ log.message }}
            </v-flex>
          </v-layout> -->
        </div>
      </v-card-text>
      <hr />
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["logs"],
  watch: {
    logs() {
      setTimeout(() => {
        console.log(this.$refs);
        this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
      }, 0);
    }
  }
};
</script>

<style lang="css" scoped>

#chatLog {
  height: 80%;
  overflow: auto;
}

.avatar {
  height: 40px;
  width: 40px;
  border-radius: 100%;
}
</style>
