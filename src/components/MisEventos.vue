<template>
  <div class>
 
  
    <div>
      <h3>Eventos Asistidos</h3>
      <table class="table">
        <thead>
          <tr>			
            <th scope="col">Direccion</th>
            <th scope="col">Categoria</th>
            <th scope="col">Fecha</th>
            
          </tr>
        </thead>
        <tbody  v-for="item in eventosAsistidos" :key="item.id">
          <tr>
            
            <td>{{item.direccion}}</td>
            <td>{{item.categoria}}</td>
            <td>{{item.fecha}}</td>
            
          </tr>
        </tbody>
      </table>


      <h3>Eventos Creados</h3>
      <table class="table">
        <thead>
          <tr>			
            <th scope="col">Direccion</th>
            <th scope="col">Categoria</th>
            <th scope="col">Fecha</th>
            
          </tr>
        </thead>
        <tbody  v-for="item in eventosCreados" :key="item.id">
          <tr>
            
            <td>{{item.direccion}}</td>
            <td>{{item.categoria}}</td>
            <td>{{item.fecha}}</td>
            
          </tr>
        </tbody>
      </table>
    </div>
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
  </div>
</template>


<script>
export default {
  name: "listaEventos",

  data: function() {
    return {
      fields: ["direccion", "categoria", "fechaInicio", "Asistir"],
      dni: "",
      telefono: "",
      email: "",
      password: "",
      logueado: false,
      mensajeInvalido: "",
      todosLosEventos:[],
      eventosCreados: [],
      asistenciasUsuario:[],
      eventosAsistidos: []
    };
  },
  mounted() {
    this.showModalLogin();
  },

  methods: {
    getAll: async function() {
      this.$http
        .get("http://localhost:8080/api/eventos")
        .then(response => {
          this.todosLosEventos=response.data
          this.eventosCreados = this.todosLosEventos.filter(
            m => m.dniCreador == this.dni
          );
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

          this.asistenciasUsuario.forEach(element => {
            this.eventosAsistidos = this.todosLosEventos.filter(
            m => m.id == element.idEvento
          );
          });

        })
        .catch(e => {
          // Podemos mostrar los errores en la consola
          console.log(e);
        });
    },
    login:  function() {
      if (this.dni != null) {
         this.$http
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
</style>
