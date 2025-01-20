<template>
  <v-main>
    <MapComponent />
    <LeftBar />
  </v-main>
</template>

<script>
import LeftBar from './LeftBar.vue';
import MapComponent from './MapComponent.vue';


export default {
  name: 'HelloWorld',
  components: {
    MapComponent,
    LeftBar 
  },

};
</script>
