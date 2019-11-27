<template>
  <div class="container">
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

            <div class="text-danger" v-if="mensajeError&&logueado">{{mensajeError}}</div>
      <input type="button" value="Crear" class="btn btn-success" v-on:click="agregarEvento" />
    </form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      titulo: "",
      descripcion: "",
      fecha: "",
      cantMax: 0,
      categoria: "",
      duracion: "",
      mensajeError: null,
      logueado: false,
      modalShow: true,
      dni: null,
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
  methods: {login: async function() {
      if (this.dni != null && this.dni !="") {
        await this.$http
          .get("http://localhost:8080/api/usuarios/" + this.dni)
          .then(response => {
            if (response.status == 200) {
              if (this.password == response.data.password) {
                this.usrLogueado = response.data;
                this.logueado = true;
                this.hideModalLogin();
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
          this.mensajeError=null;
          console.log(response)
        })
        .catch(e => {
          switch (e.status) {
            case 400:
              this.mensajeError= "Formato invalido o faltan datos"
              break;
          
            default:
              break;
          }
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
          switch (e.status) {
            case 400:
              this.mensajeError= "Formato invalido o faltan datos"
              break;
          
            default:
              break;
          }
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

#overflow {
  border: 1px solid blue;
  width: 100%;
  overflow-y: auto;
  height: 100%;
}
</style>