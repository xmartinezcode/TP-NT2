<template>
  <div>
    <div class="container">
      <br />
      <div class="btn-space">
        <div class="row">
          <div class="col-6">
            <button type="button" class="btn btn-info" id="live">Live</button>

            <b-form-radio-group
              v-model="selectedFecha"
              :options="optionsFecha"
              buttons
              button-variant="btn btn-info"
              size="lg"
              name="buttons-Categoria"
              id="botoneraFechas"
            ></b-form-radio-group>
            {{selectedFecha}}
          </div>
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

          <div class="btn-group-vertical avanzada">
            <b-button class="btn btn-info avanzada" @click="show">BUSQUEDA AVANZADA</b-button>
          </div>
        </div>
      </div>
      <modal name="hello-world">
        <div class="container">
          <h3>Busqueda Avanzada por Fecha</h3>
          <div class="form-group">
            <label>Desde</label>
            <datetime placeholder="Selecciona una fecha" type="datetime" v-model="dateDesde"></datetime>
          </div>
          <div class="form-group">
            <label>Hasta</label>
            <datetime placeholder="Selecciona una fecha" type="datetime" v-model="dateHasta"></datetime>
            <br />
            <b-button class="btn btn-info avanzada" @click="buscarPorFechas">BUSQUEDA AVANZADA</b-button>
          </div>
        </div>
      </modal>
    </div>
    <b-table striped hover :items="markers"></b-table>
  </div>
</template>


<script>
import axios from "axios"

export default {
  data() {
    return {
      test: this.cuantoDiasFaltan("2019-11-11T10:20:30Z"),
      selectedCategoria: [],
      selectedFecha: [],
      busquedaAvanzada: false,
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
      dateDesde:'',
      dateHasta:''
    };
  },
  mounted() {
    this.geolocate();

    axios
        .get("http://localhost:8080/api/eventos")
        .then(response => {
          console.log([
        {
          position: { lat: -34.5876635, lng: -58.45189970000001 },
          categoria: "Partido Futbol",
          fechaHora: "2019-11-11T10:20:30Z"
        }
      ])
          console.log(response.data)
          this.todosLosEventos = response.data;
        })
        .catch(e => {
          // Podemos mostrar los errores en la consola
          console.log(e);
        });
    },
  methods: {
    busquedaAvanzadaMethod: function() {},
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },

    actualizarMarkersPorCategoria(ArraysCategorias) {
      let listaFiltrada = [];

      let i = 0;
      let j = 0;
      console.log(this.markers.length);

      if (ArraysCategorias.length != 0) {
        while (i < this.markers.length) {
          while (j < ArraysCategorias.length) {
            if (this.markers[i].categoria == ArraysCategorias[j]) {
              listaFiltrada.push(this.markers[i]);
            }

            j++;
          }
          j = 0;
          i++;
        }
      }else{
        listaFiltrada=this.markers
      }
      return listaFiltrada;
    },

    actualizarMarkersPorFecha(fecha) {
      let i = 0;
      let lista = [];
      if(this.selectedFecha.length!=0){

        while (i < this.todosLosEventos.length) {
          if (this.cuantoDiasFaltan(this.todosLosEventos[i].fechaHora) <= fecha) {
            lista.push(this.todosLosEventos[i]);
          }
          i++;
        }
      }else{
        lista=this.todosLosEventos
      }
      console.log(lista);
      return lista;
    },

    cuantoDiasFaltan(fechaString) {
      let hoy = new Date();
      let fechaDate = new Date(fechaString);
      if (hoy.getMonth() == 11 && hoy.getDate() > 25) {
        fechaDate.setFullYear(fechaDate.getFullYear() + 1);
      }
      let one_day = 1000 * 60 * 60 * 24;

      return Math.ceil((fechaDate.getTime() - hoy.getTime()) / one_day);
    },
    show() {
      this.$modal.show("hello-world");
    },
    hide() {
      this.$modal.hide("hello-world");
    },
    buscarPorFechas(){
      let i=0
      let busquedaDesde=new Date(this.dateDesde)
      let busquedaHasta=new Date(this.dateHasta)
      let lista = []
      while(i<this.todosLosEventos.length){
        let fechaEvento=new Date(this.todosLosEventos[i].fechaHora)
        if(fechaEvento>busquedaDesde && fechaEvento<busquedaHasta){
          lista.push(this.todosLosEventos[i])
        }
        i++
      }
      this.markers=lista;
      this.hide()
    }
  },

  computed:{
    filtrarMarcadores: function(){
      //Digo que filtrados es igual a todos los eventos
      let filtrados = this.todosLosEventos

      //Chequeo si algun boton de arriba esta seleccionado, Filtro por fecha
       if (this.selectedFecha.length!=0) {
        filtrados = filtrados.filter(
          m => this.cuantoDiasFaltan(m.fechaHora) <= this.selectedFecha
        );
      }
      //Chequeo si hay alguna categoria selecciona, Filtro por categoria
      if(this.selectedCategoria.length!=0){
        filtrados=filtrados.filter(
          m=>this.selectedCategoria.indexOf(m.categoria) >=0
        );
      }
      return filtrados
    }
  }
/*
  watch: {
    selected: function(val) {
      this.markers = this.actualizarMarkersPorFecha(this.selectedFecha);
      this.markers = this.actualizarMarkersPorCategoria(val);
    },
    selectedFecha: function(val) {
      this.markers = this.actualizarMarkersPorFecha(val);
      this.markers = this.actualizarMarkersPorCategoria(this.selected);
    }
  }*/
};
</script>
<style scoped>
.btn-space button {
  margin-right: 10px;
}

.btn-group-vertical button {
  margin-bottom: 10px;
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
