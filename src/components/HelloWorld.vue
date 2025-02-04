<template>
  <v-main>
    <MapComponent />
    <LeftBar />
    <CarouselCard />
  </v-main>
</template>

<script>
import LeftBar from './LeftBar.vue';
import MapComponent from './MapComponent.vue';
import CarouselCard from './CarouselCard.vue';

export default {
  name: 'HelloWorld',
  components: {
    MapComponent,
    LeftBar, 
    CarouselCard,
  },

};
</script>
