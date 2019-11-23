<template>
  <div class="container">
    <modal name="modal-login">
      <b-form-group label="DNI" label-for="dni" invalid-feedback="El DNI es un campo requerido">
        <b-form-input id="dni" v-model="dni" required></b-form-input>
        <label>Contraseña</label>
        <input v-model="password" type="password" class="form-control" />
        <b-button size="sm" class="btn-info" @click="login">Ingresar</b-button>
        {{mensajeInvalido}}
      </b-form-group>No tenes usuario?
      <a href="#" @click="mostrarModalRegistro">Registrate!</a>
    </modal>

    <modal name="modal-register">
      <form>
        <div class="form-group form-inline">
          <label>Dni</label>
          <input class="form-control" v-model="dni" />
        </div>

        <div class="form-group form-inline">
          <label>Email</label>
          <input class="form-control" v-model="email" />
        </div>

        <div class="form-group form-inline">
          <label>Telefono</label>
          <input class="form-control" v-model="telefono" />
        </div>

        <div class="form-group form-inline">
          <label>Contraseña</label>
          <input v-model="password" type="password" class="form-control" />
        </div>

        <b-button size="sm" class="btn-info" @click="registrate">Registrate</b-button>
      </form>
    </modal>
    <h1>Crear Evento</h1>
    <form>
      <div class="form-group">
        <img :src="`/img/${categoria}icon.png`" width="50px" height="50px" />
        <br />
        <label>Categoria</label>
        <select class="form-control" v-model="categoria">
          <option>Partido Futbol</option>
          <option>Cartas Magic</option>
          <option>Mateada en la Plaza</option>
        </select>
      </div>

      <div class="form-group">
        <label>Titulo</label>
        <input
          class="form-control"
          placeholder="Ingresa el titulo de tu evento :D"
          v-model="titulo"
        />
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
        <datetime placeholder="Selecciona una fecha" type="datetime" v-model="fecha"></datetime>
      </div>

      <div class="form-group">
        <label>Cantidad Maxima</label>
        <input
          class="form-control"
          placeholder="Ingresa la cantidad Maxima de asistentes"
          v-model="cantMax"
        />
      </div>

      <div class="form-check">
        <input class="form-check-input" type="checkbox" v-model="privado" />
        <label class="form-check-label" for="defaultCheck1">Privado</label>
      </div>

      <input type="button" value="Crear" class="btn btn-success" v-on:click="agregarEvento" />
    </form>
  </div>
</template>

<script>
export default {
  name: "crearEvento",
  props: {},
  data: function() {
    return {
      titulo: "",
      descripcion: "",
      fecha: "",
      cantMax: 0,
      categoria: "",
      duracion: "",
      mensajeInvalido:"",
      modalShow: true,
      dni: "",
      telefono: "",
      email: "",
      password: "",
      privado: false,
      currentPlace: null
    };
  },
  mounted() {
    this.showModalLogin();
  },
  methods: {
    login: async function() {
      if (this.dni != null) {
        await this.$http
          .get("http://localhost:8080/api/usuarios/" + this.dni)
          .then(response => {
            if (
              response.status == 200 &&
              this.password == response.data.password
            ) {
              this.usrLogueado = response.data;
              this.logueado = true;
              this.hideModalLogin();
            } else {
              this.mensajeInvalido = response.descripcion;
            }
          })
          .catch(e => {
            // Podemos mostrar los errores en la consola
            console.log(e);
          });
      }
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
        })
        .catch(e => {
          console.log(e);
        });
    },
    mostrarModalRegistro: function() {
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

    agregarEvento: function() {
      //bd.eventos.push(this.categoria,this.currentPlace.formatted_address,this.currentPlace.geometry.location,this.date)

      this.$http
        .post("http://localhost:8080/api/eventos", {
          titulo: this.titulo,
          descripcion: this.descripcion,
          fecha: this.fecha,
          direccion: this.currentPlace.name,
          latitud: this.currentPlace.geometry.location.lat(),
          longitud: this.currentPlace.geometry.location.lng(),
          cantMax: this.cantMax,
          categoria: this.categoria,
          dniCreador: this.dni,
          duracion: 24,
          privado: this.privado
        })
        .catch(e => {
          console.log(e);
        });

      (this.titulo = ""),
        (this.descripcion = ""),
        (this.fecha = ""),
        (this.cantMax = 0),
        (this.categoria = ""),
        (this.currentPlace.name = ""),
        (this.dniCreador = ""),
        (this.duracion = ""),
        (this.privado = false),
        (this.currentPlace = null);
    },
    setPlace(place) {
      this.currentPlace = place;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 75%;
  margin-top: 20px;
}
</style>
