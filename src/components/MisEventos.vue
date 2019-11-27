<template>
  <div class="container-fluid">
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
    <div class="row">
      <div class="col-md-6">
        <h3>Eventos Asistidos</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Direccion</th>
              <th scope="col">Categoria</th>
              <th scope="col"></th>
              <th scope="col">Fecha</th>
            </tr>
          </thead>
          <tbody v-for="item in eventosAsistidos" :key="item.id">
            <tr>
              <td>{{item.id}}</td>
              <td>{{item.direccion}}</td>
              <td>{{item.categoria}}</td>
              <td><img :src="`/img/${item.categoria}icon.png`" width="30px" height="30px" /></td>
              <td>{{formatearFecha(item.fecha)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6">
        <h3>Eventos Creados</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Direccion</th>
              <th scope="col">Categoria</th>
              <th scope="col"></th>
              <th scope="col">Fecha</th>
            </tr>
          </thead>
          <tbody v-for="item in eventosCreados" :key="item.id">
            <tr>
              <td>{{item.id}}</td>
              <td>{{item.direccion}}</td>
              <td>{{item.categoria}}</td>
              <td><img :src="`/img/${item.categoria}icon.png`" width="30px" height="30px" /></td>
              <td>{{formatearFecha(item.fecha)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
  </div>
</template>


<script>
export default {
  name: "listaEventos",

  data: function() {
    return {
      fields: ["direccion", "categoria", "fechaInicio", "Asistir"],
      dni: null,
      telefono: "",
      email: "",
      password: "",
      logueado: false,
      mensajeError: null,
      todosLosEventos: [],
      eventosCreados: [],
      asistenciasUsuario: [],
      eventosAsistidos: []
    };
  },
  mounted() {
    this.showModalLogin();
  },

  methods: {
    formatearFecha(fecha) {
      let fechaFormateada = fecha.replace("Z", " ");
      fechaFormateada = fechaFormateada.replace("T", " ");
      fechaFormateada = fechaFormateada.replace(":00.000", " ");
      return fechaFormateada;
    },
    getAll: async function() {
      this.$http
        .get("http://localhost:8080/api/eventos")
        .then(response => {
          this.todosLosEventos = response.data;
          this.eventosCreados = this.todosLosEventos.filter(
            m => m.dniCreador == this.dni
          );

          this.eventosCreados.sort(function(a, b) {
            var dateA = new Date(a.fecha).getTime();
            var dateB = new Date(b.fecha).getTime();
            return dateA > dateB ? 1 : -1;
          });
        })
        .catch(e => {
          // Podemos mostrar los errores en la consola
          console.log(e);
        });

      this.$http
        .get("http://localhost:8080/api/asistencias")
        .then(response => {
          this.asistenciasUsuario = response.data.filter(
            m => m.dniUsuario == this.dni
          );
          let eventoAux;
          this.asistenciasUsuario.forEach(element => {
            eventoAux = this.todosLosEventos.filter(
              m => m.id == element.idEvento
            );
            this.eventosAsistidos.push(eventoAux[0]);
          });
          console.log(this.asistenciasUsuario);
          console.log(this.eventosAsistidos);
          this.eventosAsistidos.sort(function(a, b) {
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
    login: async function() {
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
          this.mensajeError = null;
          console.log(response)
        })
        .catch(e => {
          switch (e.status) {
            case 400:
              this.mensajeError = "Formato invalido o faltan datos";
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
    }
  },
  watch: {
    logueado: function(val) {
      if (val == true) {
        this.getAll();
      }
    }
  }
};
</script>

<style>
#overflow {
  border: 1px solid blue;
  width: 100%;
  overflow-y: auto;
  height: 100%;
}
</style>