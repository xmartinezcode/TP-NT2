<template>
  <div class="col-md-6 col-xs-12">
    
    <h1>Crear Evento</h1>
    <label>categoria</label>
    <img v-bind:src="'.src/assets/'+categoria+'.png'" width="50px" height="50px" />

    <select class="form-control" v-model="categoria">
      <option>Partido Futbol</option>
      <option>Cartas Magic</option>
      <option>Mateada en la Plaza</option>
    </select>

    <label>Direccion</label>

    <gmap-autocomplete @place_changed="setPlace" id="autocomplete" class="form-control"></gmap-autocomplete>
    {{direccion}}
    <label>Fecha</label>
    <datetime type="datetime" v-model="date"></datetime>

    <input type="button" value="Crear" class="btn btn-success" v-on:click="agregarEvento" />
    {{eventos}}
  </div>
</template>

<script>


var bd = require('./bd.js')


export default {
  name: "crearEvento", 
  props: {},
  data: function() {
    return {
      eventos:bd.eventos,
      categoria: "",
      direccion: "",
      latitud: "",
      longitud: "",
      date:"",
      currentPlace:null
      
    };
  },
  methods: {
    agregarEvento: function() { 
      bd.eventos.push(this.categoria,this.currentPlace.formatted_address,this.currentPlace.geometry.location,this.date)      
    },
    setPlace(place) {
      this.currentPlace = place;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
