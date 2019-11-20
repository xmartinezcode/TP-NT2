<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label>
          <h5>Dni</h5>
        </label>
        <input type="text" class="form-control" placeholder="Ingresa tu Dni" v-model="dni">
      </div>
      <div class="form-group">
        <label>
          <h5>Teléfono</h5>
        </label>
        <input
          type="text"
          class="form-control"
          placeholder="Ingresa tu Teléfono"
          v-model="telefono"
        >
      </div>
      <div class="form-group">
        <label>
          <h5>Correo Electronico</h5>
        </label>
        <input type="email" class="form-control" placeholder="Ingresa tu correo" v-model="email">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">
          <h5>Contraseña</h5>
        </label>
        <input type="password" class="form-control" v-model="password" placeholder="Contraseña">
      </div>
      <div class="text-danger" v-if="mensajeError">El mail {{email}} ya se encuentra registrado</div>
      <button type="submit" class="btn btn-primary" @click="register">Registrar</button>
    </form>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      dni: null,
      telefono: "",
      email: "",
      password: "",
      mensajeError: false
    };
  },
  methods: {
    register: function() {
      
      

       this.$http
        .post("http://localhost:8080/api/usuarios", {

        dni: this.dni,
        mail: this.email,
        telefono: this.telefono,
        password: this.password

        }).catch(e => {
            console.log(e);
        });

        this.dni=null,
        this.mail="",
        this.telefono="",
        this.password=""
    
    }
  }
};
</script>

<style scoped>
.container {
  width: 35%;
  margin-top: 20px;
}
</style>