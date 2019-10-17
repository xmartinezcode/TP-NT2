<template>
  <div class="col-md-6 col-xs-12">
    <h1>Crear Evento</h1>
    <label>Tipo</label>
    <img v-bind:src="'img/'+tipo+'.png'" width="50px" height="50px" />

    <select class="form-control" v-model="tipo" id="tipo">
      <option>Partido Futbol</option>
      <option>Cartas Magic</option>
      <option>Mateada en la Plaza</option>
    </select>

    <label>Direccion</label>

    <gmap-autocomplete class="form-control"></gmap-autocomplete>
    <label>Fecha</label>
    <datepicker />

    <input type="button" value="Crear" class="btn btn-success" v-on:click="agregarEvento" />
    
  </div>
</template>

<script>

import Datepicker from 'vuejs-datepicker'


export default {
  name: "crearEvento", 
  components:{Datepicker},
  props: {},
  data: function() {
    return {
      lista: [],
      tipo: "",
      direccion: "",
      latitud: "",
      longitud: "",
      date:""
      
    };
  },
  methods: {
    agregarEvento: function() {
      var direccion = this.direccion.value;
      this.lista.push({
        tipo: this.tipo,
        direccion,
        latitud: this.latitud,
        longitud: this.longitud
      });
      this.tipo = "";
      this.direccion = "";
      this.direccion = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
