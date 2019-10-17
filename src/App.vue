<template>
 <div
    id="app"
    class="container"
  >
    <h1>Quorum</h1>
    <p>Esta seccion es solo para mostrar que estamos en el componente que <mark>no cambia</mark></p>
    <ul class="nav nav-pills nav-fill">
      <router-link to="/" tag="li" class="nav-link">Home</router-link>
      <router-link to="/crearEvento" tag="li" exact class="nav-link">crearEvento</router-link>
      <router-link to="/listaEventos" tag="li" class="nav-link">Lista Eventos</router-link>
    </ul>
    <hr>
    <router-view></router-view>
  </div>


</template>

<script>




export default {
  name: 'app',
  components: { 

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
