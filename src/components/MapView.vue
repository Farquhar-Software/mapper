<template>
  <div id="map" style="height: 100vh; width: 100%;">
    <button class="form-button" @click="showForm = true">Add Polygon</button>
    <FormComponent :visible="showForm" @close="showForm = false" />
  </div>
</template>

<script>
import { onMounted, watch, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import FormComponent from './FormComponent.vue';
import {usePolygonStore} from '../stores/polygonStore.js'

export default {
  name: 'MapView',
  components: {
    FormComponent
  },
  setup() {
    const map = ref(null);
    const showForm = ref(false);
    const polygonStore = usePolygonStore();

    onMounted(() => {
      map.value = L.map('map').setView([31.99735, -102.07791], 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map.value);
    }),

    watch(() => polygonStore.polygonData,
      (newPolygonData) => {
        if (newPolygonData) {
          addPolygonToMap(newPolygonData);
        }
    });

    const addPolygonToMap = (polygonData) => {
      if (map.value) {
        const polygon = L.polygon(polygonData.coordinates, { color: 'red' }).addTo(map.value);
        map.value.fitBounds(polygon.getBounds());
      }
    };

    return { map, showForm };
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