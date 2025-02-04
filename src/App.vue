<template>
  <v-app>
    <Header3D />
    <NavBar3D />

    <router-view/>
    
  </v-app>
</template>

<script>

import Header3D from './components/Header3D.vue';
import NavBar3D from './components/NavBar3D.vue';

export default {
  name: 'App',
  components: {
    Header3D,
    NavBar3D,
  },

  data: () => ({
    //
  }),
}
</script>
