<template>
  <div>
    <div class="container">
      <br />
      <div class="btn-space">
        <div class="row">
          <div class="col-6" v-if="!busquedaAvanzada">
            <b-form-radio-group
              v-model="selectedFecha"
              :options="optionsFecha"
              buttons
              button-variant="btn btn-info"
              size="lg"
              name="buttons-Categoria"
              id="botoneraFechas"
            ></b-form-radio-group>
          </div>

          <form v-else>
            <div class="form-row">
              <div class="col">
                <datetime placeholder="Desde" type="datetime" v-model="dateDesde"></datetime>
              </div>
              <div class="col">
                <datetime placeholder="Hasta" type="datetime" v-model="dateHasta"></datetime>
              </div>
            </div>
          </form>

          <b-button class="btn btn-info avanzada" @click="busquedaAvanzadaMethod">{{textoAvanzada}}</b-button>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-10">
          <gmap-map :center="center" :zoom="13" style="width:100%;  height: 350px;">
            <gmap-marker
              :key="index"
              v-for="(m, index) in filtrarMarcadores"
              :position="{lat:m.latitud, lng:m.longitud}"
              :icon="{ url: `/img/${m.categoria}icon.png`}"
              @click="center=m.position"
            ></gmap-marker>
          </gmap-map>
        </div>

        <div class="col-2">
          <b-form-group>
            <b-form-checkbox-group
              v-model="selectedCategoria"
              :options="options"
              stacked
              buttons
              button-variant="btn btn-info ml-4"
              size="lg"
              name="buttons-Categoria"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
      </div>
    </div>
    <b-table striped hover :items="markers"></b-table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      test: this.cuantoDiasFaltan("2019-11-11T10:20:30Z"),
      selectedCategoria: [],
      selectedFecha: [],
      busquedaAvanzada: false,
      textoAvanzada: "BUSQUEDA AVANZADA",
      center: { lat: -34.59, lng: -58.45 },
      markers: [],
      options: [
        { text: "Magic", value: "Cartas Magic" },
        { text: "Futbol", value: "Partido Futbol" },
        { text: "Mateada", value: "Mateada en la Plaza" }
      ],
      optionsFecha: [
        { text: "Hoy", value: "1" },
        { text: "1 Semana", value: "7" },
        { text: "1 Mes", value: "30" },
        { text: "Todos", value: "99999" }
      ],
      todosLosEventos: null,
      dateDesde: "",
      dateHasta: ""
    };
  },
  mounted() {
    this.geolocate();

    this.$http
      .get("http://localhost:8080/api/eventos")
      .then(response => {
        this.todosLosEventos = response.data;
      })
      .catch(e => {
        // Podemos mostrar los errores en la consola
        console.log(e);
      });
  },
  methods: {
    busquedaAvanzadaMethod: function() {
      if (this.busquedaAvanzada) {
        this.dateDesde="",
        this.dateHasta="",
        this.busquedaAvanzada = false;
        this.textoAvanzada = "BUSQUEDA AVANZADA";
      } else {
        this.busquedaAvanzada = true;
        this.textoAvanzada = "BUSQUEDA SIMPLE";
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },

    formatearFecha(fecha){

      let fechaFormateada=fecha.replace('Z',' ');
      fechaFormateada=fechaFormateada.replace('T',' ');

      return fechaFormateada
    },

    cuantoDiasFaltan(fechaString) {
      let hoy = new Date();
      let fechaDate = new Date(fechaString);
      if (hoy.getMonth() == 11 && hoy.getDate() > 25) {
        fechaDate.setFullYear(fechaDate.getFullYear() + 1);
      }
      let one_day = 1000 * 60 * 60 * 24;

      return Math.ceil((fechaDate.getTime() - hoy.getTime()) / one_day);
    }
  },

  computed: {
    filtrarMarcadores: function() {
      //Digo que filtrados es igual a todos los eventos
      let filtrados = this.todosLosEventos;

      //Chequeo si algun boton de arriba esta seleccionado, Filtro por fecha
      if (this.selectedFecha.length != 0) {
        filtrados = filtrados.filter(
          m => this.cuantoDiasFaltan(m.fecha) <= this.selectedFecha
        );
      }
      //Chequeo si hay alguna categoria selecciona, Filtro por categoria
      if (this.selectedCategoria.length != 0) {
        filtrados = filtrados.filter(
          m => this.selectedCategoria.indexOf(m.categoria) >= 0
        );
      }

      //Chequeo si esta activada la busqueda avanzada y cancelo todos los filtros anteriores

      if (this.dateDesde != "" && this.dateHasta != "") {
        this.$http
          .get("http://localhost:8080/api/eventos", {
            params: {
              desde: this.formatearFecha(this.dateDesde),
              hasta: this.formatearFecha(this.dateHasta)
            } 
          })
          .then(response => {
            
            console.log(response.data)
            filtrados=[]
            filtrados=response.data
          })
          .catch(e => {
            console.log(this.formatearFecha(this.dateDesde),this.formatearFecha(this.dateHasta))
            // Podemos mostrar los errores en la consola
            console.log(e);
          });
      }
      console.log(filtrados)
      return filtrados
    }
  }
};
</script>
<style scoped>
.btn-space button {
  margin-right: 10px;
}

.btn-group-vertical button {
  margin-bottom: 10px;
}

.btn-avanzada {
}

#live {
  background: #f12849;
  padding: 5px 10px;
  color: #fff;
  border: none;
  border-radius: 5px;

  animation-name: flash;
  animation-duration: 1.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  -webkit-animation-name: flash;
  -webkit-animation-duration: 1.5s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;

  -moz-animation-name: flash;
  -moz-animation-duration: 1.5s;
  -moz-animation-timing-function: linear;
  -moz-animation-iteration-count: infinite;
}

@keyframes flash {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
