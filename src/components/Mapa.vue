<template>
  <div class="container">
    <gmap-map :center="center" :zoom="13" style="width:100%;  height: 350px;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
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

     
     this.markers.push({position:bd.eventos[0].coordenadas});
     
  
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