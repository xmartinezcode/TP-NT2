<template>
  <div id="app" class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <img class="navbar-brand" src="./assets/logo.png" href="#">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse" 
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <router-link to="/" class="nav-item nav-link" tag="a">Home</router-link>
          <router-link to="/Login" class="nav-item nav-link" tag="a">Login</router-link>
          <router-link to="/CrearEvento" class="nav-item nav-link" tag="a">Crear Evento</router-link>
          <router-link to="/ListaEventos" class="nav-item nav-link" tag="a">Lista de Eventos</router-link>
          <router-link to="/BusquedaAvanzada" class="nav-item nav-link" tag="a">BusquedaAvanzada</router-link>

        </div>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style>

body {
	margin: 0;
	width: 100%;
	height: 100vh;
	font-family: "Exo", sans-serif;
	color: #fff;
	background: linear-gradient(-45deg,#9da6f5, #6341fd);
	
}


.btn-info {
    color: #fff;
    background-color: #150461;
    border-color: #150461;
}


.bg-light {
    background-color: #ecebeb94!important;
}
.nav a{
  color: #7c7493;
}
#navbarNavAltMarkup{
  
  font-size: 22px;
}
.container img {
  width: 17%;
  height: auto;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
