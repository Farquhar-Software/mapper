<template>
  <div id="map" style="height: 100vh; width: 100%">
    <button class="form-button" @click="showForm = true">Add Polygon</button>
    <FormComponent
      :visible="showForm"
      @close="showForm = false"
      @geojson="addGeoJSONToMap"
    />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import FormComponent from './FormComponent.vue';

import markerIcon from '../../public/images/marker-icon.png';
import markerIcon2x from '../../public/images/marker-icon-2x.png';
import markerShadow from '../../public/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default {
  name: 'MapView',
  components: {
    FormComponent,
  },
  setup() {
    const map = ref(null);
    const showForm = ref(false);

    onMounted(() => {
      map.value = L.map('map').setView(
        [32.71180328837194, -94.121577724154],
        13
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map.value);
    });
    const addGeoJSONToMap = (geojson) => {
      L.geoJSON(geojson).addTo(map.value);
    };
    return { map, showForm, addGeoJSONToMap };
  },
};
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 0;
}

.form-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.form-button:hover {
  background-color: #0056b3;
}
</style>
