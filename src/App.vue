<template>
    <div id="app">
      <MapView />
    </div>
  </template>
  
  <script>
  import MapView from './components/MapView.vue';
  
  export default {
    name: 'App',
    components: {
      MapView
    }
  };
  </script>
  
  <style>
  html, body, #app {
    height: 100%;
    margin: 0;
  }
  </style>