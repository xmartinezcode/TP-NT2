<template>

  <div class="col-md-6 col-xs-12">
    <h1>Crear Evento</h1>

    <div class="form-group">
      <label>Categoria</label>
      <img v-bind:src="'./assets/'+categoria+'.png'" width="50px" height="50px" />
      <select class="form-control" v-model="categoria">
        <option disabled selected>Selecciona una categoria</option>
        <option>Partido Futbol</option>
        <option>Cartas Magic</option>
        <option>Mateada en la Plaza</option>
      </select>
    </div>

    <div class="form-group">
      <label>Descripción</label>
      <textarea
        class="form-control"
        placeholder="Breve descripcion de tu evento"
        rows="2"
        v-model="descripcion"
      ></textarea>
    </div>

    <div class="form-group">
      <label>Direccion</label>
      <gmap-autocomplete class="form-control my-0 py-1" @place_changed="setPlace"></gmap-autocomplete>
    </div>

    <div class="form-group">
      <label>Fecha</label>
      <datetime placeholder="Selecciona una fecha" type="datetime" v-model="date"></datetime>
    </div>

    <div class="form-group">
      <label>Subi la portada de tu evento</label>
      <input type="file" class="form-control-file" />
    </div>

    <input type="button" value="Crear" class="btn btn-success" v-on:click="agregarEvento" />
  
  </div>
</template>

<script>
var bd = require("./bd.js");

export default {
  name: "crearEvento",
  props: {},
  data: function() {
    return {
      eventos: bd.eventos,
      categoria: "Selecciona una categoria",
      descripcion: "",
      direccion: "",
      latitud: "",
      longitud: "",
      date: "",
      currentPlace: null
    };
  },
  methods: {
    agregarEvento: function() {
      //bd.eventos.push(this.categoria,this.currentPlace.formatted_address,this.currentPlace.geometry.location,this.date)
      bd.eventos.push({
        categoria: this.categoria,
        direccion: this.currentPlace.formatted_adress,
        coordenadas: this.currentPlace.geometry.location,
        fecha: this.date
      });
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
