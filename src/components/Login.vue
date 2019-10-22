<template>
  <div class="container ">
    <div class="mx-auto">
      <h3>Email</h3>
      <input type="email" v-model="usuario" />
    </div>
    <h3>Contraseña</h3>
    <div class="mx-auto">
      <input type="password" v-model="contraseña"/>
    </div>
    <div class="mx-auto">
        <br>
      <button type="button" class="btn btn-info btn-lg">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      usuario: "",
      contraseña: ""
    };
  }
};
</script>

<style scoped>
.mx-auto {
  
}
</style>