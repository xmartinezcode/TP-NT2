<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
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
          <router-link to="/HomeApp" class="nav-item nav-link" tag="a" v-if="logeado">Home</router-link>

          <router-link to="/" class="nav-item nav-link" tag="a" v-if="!logeado">Iniciar Sesion</router-link>

          <router-link
            to="/CrearEvento"
            class="nav-item nav-link"
            tag="a"
            v-if="logeado"
          >Crear Evento</router-link>
          <router-link
            to="/MisEventos"
            class="nav-item nav-link"
            tag="a"
            v-if="logeado"
          >Mis Eventos</router-link>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data: function() {
    return {
      navbarLogin: true,
      logeado: true
    };
  },

  methods: {},
  created() {}
};
</script>

<style>
body {
  margin: 0;
  width: 100%;
  height: 100vh;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #fff;
  background: rgb(255, 255, 255);
}

.btn-info {
  color: #fff;
  background-color: #150461;
  border-color: #150461;
}

.bg-light {
  background-color: #6200ff94 !important;
}
nav {
  border-bottom: black;
}

.nav a {
  color: #7c7493;
}
#navbarNavAltMarkup {
  font-size: 22px;
}
.navbar img {
  width: 17%;
  height: auto;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
