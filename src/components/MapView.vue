<template>
  <div id="map" style="height: 100vh; width: 100%;"></div>
</template>

<script>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'MapView',
  setup() {
    const map = ref(null);

    onMounted(() => {
      map.value = L.map('map').setView([31.99735, -102.07791], 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map.value);
    });

    return { map };
  }
};
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>