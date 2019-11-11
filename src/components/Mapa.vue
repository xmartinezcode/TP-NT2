<template>
  <div class="container">
    <gmap-map :center="center" :zoom="13" style="width:100%;  height: 350px;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :icon="{ url: `/img/${m.categoria}icon.png`}"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>

var bd = require('./bd.js')


export default {
  name: "GoogleMap",
  data() {
    return {
      center: { lat: -34.59, lng: -58.45 },
      markers: [],
    };
  },

  mounted() {
    this.geolocate();

     
     this.markers.push(
       {position:{ "lat": -34.5876635, "lng": -58.45189970000001 },categoria:'Partido Futbol'},
       {position:{ "lat": -34.6078662, "lng": -58.3831004 },categoria:'Mateada en la PLaza'},
       {position:{ "lat": -34.6061884, "lng": -58.4022407 },categoria:'Partido Futbol'},
       {position:{ "lat": -34.6149214, "lng": -58.4180765 },categoria:'Cartas Magic'}
       )
     
  
  },

  methods: {
    // receives a place object via the autocomplete component
    
    
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  },


};
</script>

<style>
</style>