// src/stores/polygonStore.js
import { defineStore } from 'pinia';

export const usePolygonStore = defineStore('polygon', {
  state: () => ({
    polygonData: null,
  }),
  actions: {
    setPolygonData(polygonData) {
      this.polygonData = polygonData;
    },
  },
});