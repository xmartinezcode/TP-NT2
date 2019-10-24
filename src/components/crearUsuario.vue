<template>
  <div class="col-md-6 col-xs-12">
    <form class="needs-validation" novalidate>
      <div class="form-row">
        <label for="validationServer01">Nombre Completo</label>
        <input
          type="text"
          class="form-control is-valid"
          id="validationServer01"
          placeholder="Nombre y Apellido"
          required
          v-model="nombre"
        />
        <div class="valid-feedback">Parece Correcto!</div>
      
        <label for="validationServer02">Dni</label>
        <input
          type="text"
          class="form-control is-valid"
          id="validationServer02"
          placeholder="Dni"
          required
          v-model="dni"
        />
        <div class="valid-feedback">Parece Correcto!</div>
      

        <label for="validationServer03">Email address</label>
        <input
          type="email"
          class="form-control is-valid"
          id="validationServer03"
          aria-describedby="emailHelp"
          placeholder="Ingrese email"
          v-model="email"
        />
        <div class="invalid-feedback">
          Please choose a username.
        </div>
        <small
          id="emailHelp"
          class="form-text text-muted"
        >We'll never share your email with anyone else.</small>
      </div>

      <input type="button" value="Crear" class="btn btn-success" v-on:click="agregarUsuario" />
    </form>
  </div>
</template>

<script>
export default {
  name: "CrearUsuario",
  props: {},
  data: function() {
    return {
      lista: [],
      nombre: "",
      dni: "",
      mail: "",
      telefono: ""
    };
  },
  methods: {
    agregarUsuario: function() {
      this.lista.push({
        nombre: this.nombre,
        dni: this.dni,
        mail: this.mail,
        telefono: this.telefono
      });
      this.nombre = "";
      this.dni = "";
      this.mail = "";
      this.telefono = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>