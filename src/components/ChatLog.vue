<template lang="html">


  <v-card>
    <template v-for="(log, index) in logs">
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
      <hr>
    </template>


  </v-card>




</template>

<script>
export default {
  props: ["logs"],
  // watch: {
  //   logs() {
  //     setTimeout(() => {
  //       this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
  //     }, 0);
  //   }
  // }
};
</script>

<style lang="css" scoped>

#logs {
  height:80%;
  overflow: auto;
}

.avatar {
  height: 40px;
  width: 40px;
  border-radius: 100%;
}


</style>
