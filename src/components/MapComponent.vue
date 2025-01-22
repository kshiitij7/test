<template>
    <div>
      <div id="map" ref="mapContainer" style="width: 100%; height: 100vh;"></div>
      <div id="popup" ref="popup" class="ol-popup" v-show="popupContent">
        <div v-html="popupContent"></div>
      </div>
    </div>
  </template>
  
  <script>
  import 'ol/ol.css';
  import { Map, View } from 'ol';
  import TileLayer from 'ol/layer/Tile';
  import BingMaps from 'ol/source/BingMaps';
  import TileWMS from 'ol/source/TileWMS';
  import Overlay from 'ol/Overlay';
  import { get as getProjection } from 'ol/proj';
  import eventBus from '@/event-bus';
  
  export default {
    name: 'MapComponent',
    data() {
      return {
        map: null,
        layers: [], // Store all WMS layers
        popupContent: null, // Content for the popup
        popup: null, // Overlay for the popup
        featureInfoEnabled: false, // Controlled by the event bus
      };
    },
    mounted() {
      this.$nextTick(() => {
        // Initialize popup overlay
        this.popup = new Overlay({
          element: this.$refs.popup,
          positioning: 'bottom-center',
          stopEvent: false,
        });
  
        // Add popup to map
        this.map.addOverlay(this.popup);
      });
  
      // Listen for feature info toggle from event bus
      eventBus.on('toggleFeatureInfo', (isEnabled) => {
        this.featureInfoEnabled = isEnabled;
      });
  
      // Define layers
      const bing = new TileLayer({
        title: 'Bing',
        type: 'base',
        source: new BingMaps({
          key: 'ArIdKOW0eb8TRcLZdt0l2cG8kHA_uW92yIvx1aFzsQ1xHxpnVRMGmO0N0neY8P90',
          imagerySet: 'AerialWithLabelsOnDemand',
        }),
        visible: true,
      });
  
      const basinBoundary = new TileLayer({
        title: 'Ganga Basin',
        type: 'overlay',
        source: new TileWMS({
          url: 'http://192.168.17.37:8080/geoserver/Geo-Ganga/wms?',
          params: {
            LAYERS: 'Ganga_Basin_v4',
            TILED: true,
            VERSION: '1.1.1',
          },
          serverType: 'geoserver',
          tileGrid: new TileWMS().getTileGridForProjection(
            getProjection('EPSG:4326')
          ),
        }),
        visible: true,
      });
  
      const SubDistrictsBoundary = new TileLayer({
        type: 'overlay',
        source: new TileWMS({
          url: 'http://192.168.17.37:8080/geoserver/Geo-Ganga/wms?',
          params: {
            LAYERS: 'subdistrict_touch',
            TILED: true,
            VERSION: '1.1.1',
          },
          serverType: 'geoserver',
          tileGrid: new TileWMS().getTileGridForProjection(
            getProjection('EPSG:4326')
          ),
        }),
        visible: true,
      });
  
      // Add layers to an array for easier management
      this.boundary = [basinBoundary, SubDistrictsBoundary];
  
      // Initialize the map
      this.map = new Map({
        target: 'map',
        layers: [bing, ...this.boundary],
        view: new View({
          projection: 'EPSG:4326',
          center: [82.0662, 26.2648],
          zoom: 6.5,
          minZoom: 6.5,
          maxZoom: 19,
          extent: [68.1, 6.46, 97.4, 37.09],
        }),
      });
  
      // Add click event for feature info
      this.map.on('singleclick', this.handleMapClick);
    },
    methods: {
      async handleMapClick(event) {
        if (!this.featureInfoEnabled) return; // Skip if feature info is disabled
  
        const coordinate = event.coordinate;
        const resolution = this.map.getView().getResolution();
        let featureInfoResults = [];
  
        // Loop through all visible WMS layers
        for (const layer of this.boundary) {
          if (layer.getVisible()) {
            const wmsSource = layer.getSource();
            const url = wmsSource.getFeatureInfoUrl(
              coordinate,
              resolution,
              'EPSG:4326',
              { INFO_FORMAT: 'application/json' }
            );
  
            if (url) {
              try {
                const response = await fetch(url);
                const data = await response.json();
  
                if (data.features && data.features.length > 0) {
                  featureInfoResults = featureInfoResults.concat(
                    data.features.map((feature) => ({
                      layer: layer.get('title'),
                      properties: feature.properties,
                    }))
                  );
                }
              } catch (error) {
                console.error(
                  `Error fetching feature info for layer '${layer.get(
                    'title'
                  )}':`,
                  error
                );
              }
            }
          }
        }
  
        // Update popup content and position
        if (featureInfoResults.length > 0) {
          this.popupContent = featureInfoResults
            .map(
              (result) => `
            <strong>Layer: ${result.layer}</strong><br/>
            ${Object.entries(result.properties)
              .map(([key, value]) => `<b>${key}:</b> ${value}`)
              .join('<br/>')}
          `
            )
            .join('<hr/>');
  
          this.popup.setPosition(coordinate);
        } else {
          this.popup.setPosition(undefined); // Hide the popup
          this.popupContent = null; // Clear content
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .ol-popup {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    min-width: 150px;
    pointer-events: none;
    transform: translateY(-10px);
  }
  </style>
  