<template>
  <v-teaser
    img="https://www.gostudy.com.au/wp-content/uploads/2018/10/Job-Type-Barista-02-header.jpg"
    title="Barista Bro"
  />
  <v-button href="//google.com">Go to Google</v-button>
</template>

<script>
import Button from "./components/Button.vue";
import Teaser from "./components/Teaser.vue";

export default {
  name: "App",
  components: {
    [Button.name]: Button,
    [Teaser.name]: Teaser
  },
  methods: {
    clicked() {
      console.error("Clicked!");
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
