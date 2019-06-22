<template lang="html">
  <!-- <v-list color="none" ref="chat" id="logs">
    <template v-for="(log, index) in logs">
      <v-list-tile v-if="log" v-bind:key="index">
        {{ log }}
      </v-list-tile>
    </template>
  </v-list> -->

  <!-- <v-card>
    <v-card-title
      primary-title
      :key="receiver_id"
    >
      {{ receiver_id }}
    </v-card-title>
    <template v-for="(item, index) in logs[receiver_id]">



      <v-card-text>
        <v-list-tile-avatar   >
          <v-img
            :src="item.avatar"
          ></v-img>
        </v-list-tile-avatar>
        {{ item.title }}
      </v-card-text>
    </template>


  </v-card> -->


  <!-- <v-toolbar
    flat
    color="blue"
    prominent
  >
    <v-toolbar-title>
      {{ receiver_id }}
    </v-toolbar-title>
  </v-toolbar> -->

  <v-list class="py-0">
    <template v-for="(log, index) in logs">
      <v-list-tile
        :key="log.title"
        avatar
        @click=""
      >
        <v-list-tile-avatar>
          <img :src="log.avatar">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>
            {{log.title}}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>

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

#logs {
  height:80%;
  overflow: auto;
}


</style>
