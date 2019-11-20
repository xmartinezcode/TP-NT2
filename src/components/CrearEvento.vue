<template>
  <div class="container">
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
      dniCreador: "",
      duracion: "",
      privado: false,
      currentPlace: null
    };
  },
  methods: {
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
        dniCreador: Math.floor(Math.random() * (4000 - 50) + 50),
        duracion: 24,
        privado: this.privado
        }).catch(e => {
            console.log(e);
        });

      this.titulo= "",
      this.descripcion= "",
      this.fecha= "",
      this.cantMax= 0,
      this.categoria= "",
      this.currentPlace.name="",
      this.dniCreador= "",
      this.duracion= "",
      this.privado= false,
      this.currentPlace= null
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
