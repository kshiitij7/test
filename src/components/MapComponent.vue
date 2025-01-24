<template>
    <div id="map" ref="mapContainer" style="position: relative; width: 100%; height: 85vh;">
      <div class="baseSwitcher">
        <v-menu location="top">
      <template v-slot:activator="{ props }">
        <v-btn color="rgb(2, 42, 56)" dark v-bind="props"><div style="color: wheat;">Base Maps</div></v-btn>
      </template>
  <v-list>
    <v-list-item v-for="(basemap, index) in basemaps" :key="index" class="mx-2" @click="switchBasemap(basemap.name)">
        <v-img :src="basemap.icon" alt="Basemap Option" contain max-width="900" max-height="300" />
      <v-list-item-title>{{ basemap.label }}</v-list-item-title>
    </v-list-item>
  </v-list>
</v-menu>
      </div>
    </div>
  </template> 
 
<script>
import 'ol/ol.css';
import {Map,View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import BingMaps from 'ol/source/BingMaps';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';
import {get as getProjection} from 'ol/proj';
import eventBus from '@/event-bus';

export default {
    name: 'MapComponent',
    data() {
        return {
            map: null,
            layers: [],
      basemaps: [
        { name: 'osm', label: 'Open Street Map', icon: require('@/assets/images/openstreetmap.png') },
        { name: 'bing', label: 'Bing Map', icon: require('@/assets/images/bing.png') },
        { name: 'bhuvan', label: 'Bhuvan Satellite Imagery', icon: require('@/assets/images/bhuvan.png') },
      ],
          
      
        };
    },
    mounted() {
        // Define layers
        const osm = new TileLayer({
            title: 'osm',
            type: 'base',
            source: new OSM(),
            visible: true,
        });
        const bing = new TileLayer({
            title: 'Bing',
            type: 'base',
            source: new BingMaps({
                key: "ArIdKOW0eb8TRcLZdt0l2cG8kHA_uW92yIvx1aFzsQ1xHxpnVRMGmO0N0neY8P90",
                imagerySet: 'AerialWithLabelsOnDemand',
            }),
            visible: false,
        });
        const bhuvan = new TileLayer({
            title: 'Bhuvan',
            type: 'base',
            source: new TileWMS({
                params: {
                    FORMAT: "image/jpeg",
                    VERSION: "1.1.1",
                    tiled: true,
                    LAYERS: "bhuvan_imagery",
                    exceptions: "application/vnd.ogc.se_inimage",
                },
                url: "https://bhuvan-ras2.nrsc.gov.in/tilecache/tilecache.py",
            }),
            visible: false,
        });

        this.baseMaps = [bhuvan, bing, osm];

        // Other overlays (India and Ganga Basin boundaries)
        const indiaCountryBoundary = new TileLayer({
            name: 'India',
            type: 'overlay',
            source: new TileWMS({
                url: 'http://192.168.17.37:8080/geoserver/Geo-Ganga/wms?',
                params: {
                    'LAYERS': 'india_country_boundary_4326',
                    'TILED': true,
                    'VERSION': '1.1.1'
                },
                serverType: 'geoserver',
                tileGrid: new TileWMS().getTileGridForProjection(getProjection('EPSG:4326')),
            }),
            visible: true,
        });

        const basinBoundary = new TileLayer({
            name: 'Ganga Basin',
            type: 'overlay',
            source: new TileWMS({
                url: 'http://192.168.17.37:8080/geoserver/Geo-Ganga/wms?',
                params: {
                    LAYERS: 'Ganga_Basin_v4',
                    TILED: true,
                    VERSION: '1.1.1'
                },
                serverType: 'geoserver',
                tileGrid: new TileWMS().getTileGridForProjection(getProjection('EPSG:4326')),
            }),
            visible: true,
        });

        this.boundaries = [basinBoundary, indiaCountryBoundary];

        // Initialize the map
        this.map = new Map({
            target: 'map',
            layers: [...this.baseMaps, ...this.boundaries],
            view: new View({
                projection: 'EPSG:4326',
                center: [82.0662, 26.2648],
                zoom: 6.5,
                minZoom: 6.5,
                maxZoom: 19,
                extent: [68.1, 6.46, 97.4, 37.09],
            }),
        });

        this.layers = {
            'Ganga Basin': basinBoundary,
            'India Boundary': indiaCountryBoundary,
        };

        eventBus.on('toggle-layer-visibility', ({
            name,
            visible
        }) => {
            const layer = this.layers[name];
            if (layer) {
                layer.setVisible(visible);
            } else {
                console.log(`"${name}" not found`);
            }
        });
    },

    methods: {
        switchBasemap(baseMapName) {
      // Set the visibility of basemaps
      this.baseMaps.forEach((layer) => {
        layer.setVisible(layer.get('title').toLowerCase() === baseMapName.toLowerCase());
      });

      // Update the current basemap icon
      const selectedBasemap = this.basemaps.find(
        (basemap) => basemap.name.toLowerCase() === baseMapName.toLowerCase()
      );
      if (selectedBasemap) {
        this.currentBasemapIcon = selectedBasemap.icon;
      }
    },
  },
};
</script>

  
  
<style scoped>
.baseSwitcher{
    position:absolute;
    z-index: 2;
    bottom: 5%;
    right: .5%;
}
</style>

