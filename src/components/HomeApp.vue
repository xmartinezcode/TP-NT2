<template>
  <div>
    <div>
      <modal name="modal-login" :clickToClose="false" class="bg-light">
        <div class="p-4 mb-2 bg-dark text-white">
          <h3>Log In</h3>
          <b-form-group label="DNI" label-for="dni" invalid-feedback="El DNI es un campo requerido">
            <b-form-input class="col-md-8" id="dni" v-model="dni" required></b-form-input>
            <label class="mt-2">Contraseña</label>
            <input v-model="password" type="password" class="form-control col-md-8" />

            <b-button size="sm" class="btn-info mt-3" @click="login">Ingresar</b-button>
            <span class="text-danger" v-if="mensajeError">{{mensajeError}}</span>
          </b-form-group>No tenes usuario?
          <a href="#" @click="mostrarModalRegistro">Registrate!</a>
        </div>
      </modal>

      <modal name="modal-register" :clickToClose="false" class="bg-light">
        <div id="overflow" class="p-4 mb-2 bg-dark text-white">
          <h3>Ingresa Tus Datos</h3>
          <form>
            <label>DNI</label>
            <input class="form-control col-md-8" v-model="dni" required />
            <label>Email</label>
            <input class="form-control col-md-8" v-model="email" />
            <label>Telefono</label>
            <input class="form-control col-md-8" v-model="telefono" />
            <label>Contraseña</label>
            <input class="form-control col-md-8" v-model="password" type="password" />
            <br />

            <div class="text-danger" v-if="mensajeError">{{mensajeError}}</div>
            <b-button size="sm" class="btn-info mt-3" @click="registrate">Registrate!</b-button>
            <b-button size="sm" class="btn-info mt-3 float-right" @click="volver">Volver</b-button>
          </form>
        </div>
      </modal>

      <div v-if="logueado">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">DNI: {{usrLogueado.dni}}</th>
              <th scope="col">Mail: {{usrLogueado.mail}}</th>
              <th scope="col">Telefono: 11{{usrLogueado.telefono}}</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <div class="container">
      <br />
      <div class="btn-space">
        <div class="row">
          <div class="col-6" v-if="!busquedaAvanzada">
            <b-form-radio-group
              v-model="selectedFecha"
              :options="optionsFecha"
              buttons
              button-variant="btn btn-info"
              size="lg"
              name="buttons-Categoria"
              id="botoneraFechas"
            ></b-form-radio-group>
          </div>

          <form v-else>
            <div class="form-row">
              <div class="col">
                <datetime placeholder="Desde" type="datetime" v-model="dateDesde"></datetime>
              </div>
              <div class="col">
                <datetime placeholder="Hasta" type="datetime" v-model="dateHasta"></datetime>
              </div>
            </div>
          </form>

          <b-button class="btn btn-info avanzada" @click="busquedaAvanzadaMethod">{{textoAvanzada}}</b-button>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-10">
          <gmap-map :center="center" :zoom="13" style="width:100%;  height: 350px;">
            <gmap-marker
              :key="index"
              v-for="(m, index) in filtrarMarcadores"
              :position="{lat:m.latitud, lng:m.longitud}"
              :icon="{ url: `/img/${m.categoria}icon.png`}"
              @click="center={lat:m.latitud, lng:m.longitud}"
              
            ></gmap-marker>



            
          </gmap-map>
        </div>

        <div class="col-2">
          <b-form-group>
            <b-form-checkbox-group
              v-model="selectedCategoria"
              :options="options"
              :icon="{ url: `/img/${options.value}icon.png`}"
              stacked
              buttons
              button-variant="btn btn-info ml-4"
              size="lg"
              name="buttons-Categoria"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
      </div>
    </div>
    <b-table striped hover :items="markers"></b-table>

    <div>
      <template>
        <div class="container">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Direccion</th>
                <th scope="col">Categoria</th>
                <th></th>
                <th scope="col">Fecha</th>
                <th scope="col">Asistir</th>
              </tr>
            </thead>
            <tbody v-for="item in filtrarMarcadores" :key="item.id">
              <tr>
                <td>{{item.id}}</td>
                <td>{{item.direccion}}</td>
                <td>{{item.categoria}}</td>
                <td><img :src="`/img/${item.categoria}icon.png`" width="30px" height="30px" /></td>
                <td>{{formatearFecha(item.fecha)}}</td>
                <td v-if="!siUsuarioAsiste(item.id)">
                  <b-button @click="asistir(item.id)" class="btn-info">Asistir</b-button>
                </td>
                <td v-else>
                  <b-button @click="asistir(item.id)" disabled>Asistido</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </div>
  </div>
</template>

 


<script>
export default {
  data() {
    return {
      test: this.cuantoDiasFaltan("2019-11-11T10:20:30Z"),
      selectedCategoria: [],
      selectedFecha: [],
      fields: ["direccion", "categoria", "fecha", "Asistir"],
      busquedaAvanzada: false,
      modalShow: true,
      dni: null,
      telefono: "",
      email: "",
      password: "",
      logueado: false,
      mensajeError: null,
      usrLogueado: {},
      variants: [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "info",
        "light",
        "dark"
      ],
      headerBgVariant: "dark",
      headerTextVariant: "light",
      bodyBgVariant: "light",
      bodyTextVariant: "dark",
      footerBgVariant: "warning",
      footerTextVariant: "dark",
      textoAvanzada: "BUSQUEDA AVANZADA",
      center: { lat: -34.59, lng: -58.45 },
      markers: [],
      options: [
        { text: "Magic", value: "Cartas Magic" },
        { text: "Futbol", value: "Partido Futbol" },
        { text: "Mateada", value: "Mateada en la Plaza" }
      ],
      optionsFecha: [
        { text: "Hoy", value: "1" },
        { text: "1 Semana", value: "7" },
        { text: "1 Mes", value: "30" },
        { text: "Todos", value: "99999" }
      ],
      todosLosEventos: null,
      dateDesde: "",
      dateHasta: "",
      listaBusquedaAvanzada: null,
      eventosAsistidos: [],
      activeClass: "btn-warning disabled",
      defaultClass: "btn-info"
    };
  },
  mounted() {
    this.showModalLogin();
    this.geolocate();

    this.$http
      .get("http://localhost:8080/api/eventos")
      .then(response => {
        this.todosLosEventos = response.data;
        this.todosLosEventos.sort(function(a, b) {
          var dateA = new Date(a.fecha).getTime();
          var dateB = new Date(b.fecha).getTime();
          return dateA > dateB ? 1 : -1;
        });
      })
      .catch(e => {
        // Podemos mostrar los errores en la consola
        console.log(e);
      });
  },

  watch: {
    dateHasta: async function() {
      if (this.dateDesde != "" && this.dateHasta != "") {
        console.log("Entre al if del watch");
        await this.$http
          .get("http://localhost:8080/api/eventos", {
            params: {
              desde: this.formatearFecha(this.dateDesde),
              hasta: this.formatearFecha(this.dateHasta)
            }
          })
          .then(response => {
            this.listaBusquedaAvanzada = response.data;
            this.listaBusquedaAvanzada.sort(function(a, b) {
              var dateA = new Date(a.fecha).getTime();
              var dateB = new Date(b.fecha).getTime();
              return dateA > dateB ? 1 : -1;
            });
          })
          .catch(e => {
            console.log(
              this.formatearFecha(this.dateDesde),
              this.formatearFecha(this.dateHasta)
            );
            // Podemos mostrar los errores en la consola
            console.log(e);
          });
      }
    }
  },

  methods: {
    asistir: function(id) {
      this.$http
        .post("http://localhost:8080/api/asistencias", {
          idEvento: id,
          dniUsuario: this.dni
        })
        .then(response => {
          this.getEventosAsistidos();
        })
        .catch(e => {
          console.log(e);
        });
    },
    login: async function() {
      if (this.dni != null && this.dni != "") {
        await this.$http
          .get("http://localhost:8080/api/usuarios/" + this.dni)
          .then(response => {
            if (response.status == 200) {
              if (this.password == response.data.password) {
                this.usrLogueado = response.data;
                this.logueado = true;
                this.hideModalLogin();
                this.getEventosAsistidos();
                this.mensajeError = null;
              } else {
                this.mensajeError = "La contraseña es invalida";
              }
            }
          })
          .catch(e => {
            switch (e.status) {
              case 404:
                this.mensajeError = "Usuario no encontrado";
                break;

              default:
                break;
            }
          });
      } else {
        this.mensajeError = "Ingresa un usuario";
      }
    },
    volver: function() {
      this.hideModalRegister();
      this.$modal.show("modal-login");
    },
    registrate: function() {
      this.$http
        .post("http://localhost:8080/api/usuarios", {
          dni: this.dni,
          mail: this.email,
          telefono: this.telefono,
          password: this.password
        })
        .then(response => {
          this.hideModalRegister();
          this.$modal.show("modal-login");
        })
        .catch(e => {
          console.log(e);
        });
    },
    mostrarModalRegistro: function() {
      this.$modal.hide("modal-login");
      this.showModalRegister();
    },
    showModalLogin() {
      this.$modal.show("modal-login");
    },
    hideModalLogin() {
      this.$modal.hide("modal-login");
    },

    showModalRegister() {
      this.$modal.show("modal-register");
    },
    hideModalRegister() {
      this.$modal.hide("modal-register");
    },

    busquedaAvanzadaMethod: function() {
      if (this.busquedaAvanzada) {
        this.dateDesde = "";
        this.dateHasta = "";
        this.busquedaAvanzada = false;
        this.textoAvanzada = "BUSQUEDA AVANZADA";
        this.listaBusquedaAvanzada = this.todosLosEventos;
      } else {
        this.dateDesde = "";
        this.dateHasta = "";
        this.busquedaAvanzada = true;
        this.textoAvanzada = "BUSQUEDA SIMPLE";
        this.listaBusquedaAvanzada = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },

    formatearFecha(fecha) {
      let fechaFormateada = fecha.replace("Z", " ");
      fechaFormateada = fechaFormateada.replace("T", " ");
      fechaFormateada = fechaFormateada.replace(":00.000", " ");
      return fechaFormateada;
    },

    cuantoDiasFaltan(fechaString) {
      let hoy = new Date();
      let fechaDate = new Date(fechaString);
      if (hoy.getMonth() == 11 && hoy.getDate() > 25) {
        fechaDate.setFullYear(fechaDate.getFullYear() + 1);
      }
      let one_day = 1000 * 60 * 60 * 24;

      return Math.ceil((fechaDate.getTime() - hoy.getTime()) / one_day);
    },

    getEventosAsistidos: async function() {
      await this.$http
        .get("http://localhost:8080/api/asistencias")
        .then(response => {
          let asistenciasUsuario = response.data.filter(
            m => m.dniUsuario == this.dni
          );
          let eventoAux;
          asistenciasUsuario.forEach(element => {
            eventoAux = this.todosLosEventos.filter(
              m => m.id == element.idEvento
            );
            this.eventosAsistidos.push(eventoAux[0]);
          });
          console.log(this.asistenciasUsuario);
          console.log(this.eventosAsistidos);
        })
        .catch(e => {
          // Podemos mostrar los errores en la consola
          console.log(e);
        });
    },

    siUsuarioAsiste: function(id) {
      let contiene = false;
      let i = 0;

      while (i < this.eventosAsistidos.length && !contiene) {
        if (this.eventosAsistidos[i].id == id) {
          contiene = true;
        } else {
          i++;
        }
      }

      return contiene;
    }
  },

  computed: {
    filtrarMarcadores: function() {
      //Digo que filtrados es igual a todos los eventos
      let filtrados = this.todosLosEventos;

      if (this.listaBusquedaAvanzada != null) {
        filtrados = this.listaBusquedaAvanzada;
      }

      //Chequeo si algun boton de arriba esta seleccionado, Filtro por fecha
      if (this.selectedFecha.length != 0) {
        filtrados = filtrados.filter(
          m => this.cuantoDiasFaltan(m.fecha) <= this.selectedFecha
        );
      }
      //Chequeo si hay alguna categoria selecciona, Filtro por categoria
      if (this.selectedCategoria.length != 0) {
        filtrados = filtrados.filter(
          m => this.selectedCategoria.indexOf(m.categoria) >= 0
        );
      }

      //Chequeo si esta activada la busqueda avanzada y cancelo todos los filtros anteriores

      console.log(filtrados);
      return filtrados;
    }
  }
};
</script>
<style scoped>
.btn-space button {
  margin-right: 10px;
}

.btn-group-vertical button {
  margin-bottom: 10px;
}

#live {
  background: #f12849;
  padding: 5px 10px;
  color: #fff;
  border: none;
  border-radius: 5px;

  animation-name: flash;
  animation-duration: 1.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  -webkit-animation-name: flash;
  -webkit-animation-duration: 1.5s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;

  -moz-animation-name: flash;
  -moz-animation-duration: 1.5s;
  -moz-animation-timing-function: linear;
  -moz-animation-iteration-count: infinite;
}

@keyframes flash {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

#overflow {
  border: 1px solid blue;
  width: 100%;
  overflow-y: auto;
  height: 100%;
}
</style>


