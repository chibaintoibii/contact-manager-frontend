<template>
  <Navbar/>
<!--  <Loader/>-->
  <router-view/>
</template>
<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import Loader from "@/components/Loader.vue";
export default {
  name: 'App',
  components: {
    Loader,
    Navbar
  }
}
</script>
<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
</style>
