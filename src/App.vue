<template>
  <div id="app">

  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  created() {
    this.$axios.get(this.$api.tree({ owner: 'ge-ge', repo: 'button', sha: 'master' }), { params: { recursive: 1, access_token: '9d053d3169a7592863033712835d78a0' } }).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
