<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <router-view />
      </div>

      <div class="col-6">
        <div class="col-md-6 col-xs-12">
        
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
          <datetime type="datetime" v-model="date"></datetime>

          <input type="button" value="Crear" class="btn btn-success" v-on:click="agregarEvento" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>

</style>