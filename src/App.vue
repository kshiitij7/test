<template>
  <v-app>
    <v-app-bar color="blue" height="80" elevation="0"></v-app-bar>
    <v-app-bar color="cyan" height="40" elevation="0"></v-app-bar>
    <HelloWorld />
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';


export default {
  name: 'App',
  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
}
</script>
