<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label><h5>Correo Electronico</h5></label>
        <input type="email" class="form-control" placeholder="Ingresa tu correo" v-model="email" />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1"> <h5>Contraseña</h5> </label>
        <input type="password" class="form-control" v-model="password" placeholder="Contraseña" />
      </div>
      <div class="text-danger" v-if="mensajeError">Usuario o Contraseña invalida</div>
      <button type="submit" class="btn btn-primary" @click="login">Iniciar</button>
    </form>
    <br>
    No tenes cuenta? <router-link to="/Register" tag="a">Registrate!</router-link>
 
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      email: "",
      password: "",
      mensajeError:false
    };
  },
  methods:{
    
     login: function () {
        let email = this.email 
        let password = this.password
        this.$store.dispatch('login', { email, password })
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
   
  },
};
</script>

<style scoped>
.container {
  width: 35%;
  margin-top: 20px;
}
</style>