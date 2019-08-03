<template lang="html">
  <!-- using .prevent causes the submit event to no longer reload the page  -->
  <!-- Todo: Can't submit a message unless user is connected -->
  <!-- Todo: upgrade using?
    <v-card-actions>
      <v-btn flat color="orange">Share</v-btn>
      <v-btn flat color="orange">Explore</v-btn>
    </v-card-actions>
  -->

  <!-- v-card-actions restricts the width of the input area. -->
  <!-- <v-card-actions> -->
  <v-form v-on:submit.prevent="submit" class="mx-3">
    <v-layout>
      <v-flex>
        <v-text-field placeholder="Type message here" v-model="new_message" />
      </v-flex>
      <v-flex align-self-center shrink>
        <v-btn fab flat small color="primary" type="submit">
          <v-icon>send</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-form>
  <!-- </v-card-actions> -->
</template>

<script>
export default {
  data() {
    return {
      new_message: ""
    };
  },
  methods: {
    submit() {
      this.$emit("submit", this.new_message);
      this.new_message = "";
    }
  }
};
</script>

<style lang="css" scoped></style>
