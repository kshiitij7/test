<template>
    <div id="map" ref="mapContainer" style="position: relative; width: 100%; height: 85vh;"> 
    </div>
  </template>
  
  <script>
  import "ol/ol.css";
  import { Map, View } from "ol";
  import TileLayer from "ol/layer/Tile";
  import OSM from "ol/source/OSM";
import TileWMS from 'ol/source/TileWMS';
import {get as getProjection} from 'ol/proj';
// import eventBus from "@/event-bus";

  export default {
    name: "MapComponent",
    data() {
      return {
        layers: [],
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

        this.baseMaps = [osm];

        const evapo = new TileLayer({
            name: 'Evapotranspiration',
            type: 'overlay',
            source: new TileWMS({
                url: 'http://192.168.17.37:8080/geoserver/Geo-Ganga/wms?',
                params: {'LAYERS': 'EV_20240001','TILED': true,'VERSION': '1.1.1',},
                serverType: 'geoserver',
                tileGrid: new TileWMS().getTileGridForProjection(getProjection('EPSG:4326')),
            }),
            visible: true,
        });

        const preci = new TileLayer({
            name: 'Precipitation',
            type: 'overlay',
            source: new TileWMS({
                url: 'http://192.168.17.37:8080/geoserver/Geo-Ganga/wms?',
                params: {'LAYERS': 'Chirps','TILED': true,'VERSION': '1.1.1',},
                serverType: 'geoserver',
                tileGrid: new TileWMS().getTileGridForProjection(getProjection('EPSG:4326')),
            }),
            visible: false,
        });
        this.rasterLayers = [evapo, preci];
        // Initialize the map
        this.map = new Map({
            target: 'map',
            layers: [...this.baseMaps, ...this.rasterLayers],
            view: new View({projection: 'EPSG:4326',center: [82.0662, 26.2648],zoom: 6.5,minZoom: 6.5,maxZoom: 19,extent: [68.1, 6.46, 97.4, 37.09],}),
        });
  },
};

  </script>
  