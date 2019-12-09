<template>
  <div id="app">
    num: {{this.$store.state.num}}
    getNum: {{this.$store.getters.getNum}}
    <button @click="myIncreate">增加</button>
    <button @click="myMinus">减少</button>
    <button @click="aynscIncreate">异步增加</button>
  </div>
</template>

<script>

export default {
  name: "app",
  methods: {
    myIncreate() {
      this.$store.commit('increate', 1);
    },
    myMinus() {
      this.$store.commit('minus', 1);
    },
    aynscIncreate() {
      this.$store.dispatch('asyncIncreate', 2);
    }
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
