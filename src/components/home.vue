<template>
  <div>
    
    <button type="button" class="btn btn-info">Live</button>
    <button type="button" class="btn btn-info">Hoy</button>
    <button type="button" class="btn btn-info">1 Sem</button>
    <button type="button" class="btn btn-info">1 Mes</button>
    
    <div class="container">
      <br>
      <div class="row">
        <div class="col-10">
          <gmap-map :center="center" :zoom="12" style="width:100%;  height: 200px;">
            <gmap-marker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              @click="center=m.position"
            ></gmap-marker>
          </gmap-map>
        </div>


        <div class="col-2">
          <div class="btn-group-vertical">
            <button type="button" class="btn btn-info">Magic</button>
            <button type="button" class="btn btn-info">Futbol</button>
            <button type="button" class="btn btn-info">Mateada</button>
            <button type="button" class="btn btn-info">Musica</button>
            <button type="button" class="btn btn-info">Previa</button>
          </div>
        </div>
      </div>
    </div>

    <router-link to="/aux1">Aux1</router-link>
    
    <router-view></router-view>
  </div>

  
  
  
</template>


<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>