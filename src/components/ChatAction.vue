<template lang="html">
  <!-- using .prevent causes the submit event to no longer reload the page  -->
  <!-- Todo: Can't submit a message unless user is connected -->
  <v-form v-on:submit.prevent="submit">
    <v-layout>
      <v-flex sm11>
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
