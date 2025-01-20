<template>
<div style="position: relative;" id="map" class="map">
</div>
</template>

<script>
import 'ol/ol.css';
import {
    Map,
    View
} from 'ol';
import TileLayer from 'ol/layer/Tile';
import BingMaps from 'ol/source/BingMaps';

export default {
    name: 'MapComponent',
    data() {
        return {
            layers: {},
            map: null,
        };
    },
    mounted() {

        const bing = new TileLayer({
            title: 'Bing',
            type: 'base',
            source: new BingMaps({
                key: "ArIdKOW0eb8TRcLZdt0l2cG8kHA_uW92yIvx1aFzsQ1xHxpnVRMGmO0N0neY8P90",
                imagerySet: 'AerialWithLabelsOnDemand',
            }),
            visible: true,
        });
        const map = new Map({
            target: 'map',
            layers: [bing],
            view: new View({
                projection: 'EPSG:4326',
                center: [82.0662, 26.2648],
                zoom: 6.5,
                minZoom: 6.5,
                maxZoom: 19,
                extent: [68.1, 6.46, 97.4, 37.09],
            }),
        });

        this.map = map;
    },
};
</script>

<style scoped>
.map {
    width: 100%;
    height: 87vh;
}
</style>
