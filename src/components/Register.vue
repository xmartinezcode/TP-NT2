<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label>
          <h5>Nombre</h5>
        </label>
        <input type="text" class="form-control" placeholder="Ingresa tu nombre" v-model="nombre" />
      </div>
      <div class="form-group">
        <label>
          <h5>Apellido</h5>
        </label>
        <input
          type="text"
          class="form-control"
          placeholder="Ingresa tu apellido"
          v-model="apellido"
        />
      </div>
      <div class="form-group">
        <label>
          <h5>Correo Electronico</h5>
        </label>
        <input type="email" class="form-control" placeholder="Ingresa tu correo" v-model="email" />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">
          <h5>Contraseña</h5>
        </label>
        <input type="password" class="form-control" v-model="password" placeholder="Contraseña" />
      </div>
      <div class="text-danger" v-if="mensajeError">El mail {{email}} ya se encuentra registrado</div>
      <button type="submit" class="btn btn-primary" @click="register">Registrar</button>
    </form>
    <br />Ya tenes una cuenta?
    <router-link to="/Login" tag="a">Incia Sesion!</router-link>
  </div>
</template>

<script>


export default {
  data: function() {
    return {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      mensajeError: false
    };
  },
  methods: {
    register: function() {
      let data = {
        nombre: this.nombre,
        email: this.email,
        password: this.password,
        apellido: this.apellido
      };
      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
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