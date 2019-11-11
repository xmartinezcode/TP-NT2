<template>
  <div>
    <div class="container">
      <br />
      <div class="btn-space">
        <div class="row">
          <div class="col-4">
            <button type="button" class="btn btn-info" id="live">Live</button>
            <button type="button" class="btn btn-info">Hoy</button>
            <button type="button" class="btn btn-info">1 Semana</button>
            <button type="button" class="btn btn-info">1 Mes</button>
          </div>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-10">
          <gmap-map :center="center" :zoom="13" style="width:100%;  height: 350px;">
            <gmap-marker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :icon="{ url: `/img/${m.categoria}icon.png`}"
              @click="center=m.position"
            ></gmap-marker>
          </gmap-map>
        </div>

        <div class="col-2">

          <b-form-group>
            <b-form-checkbox-group
              v-model="selected"
              :options="options"
              stacked
              buttons
              button-variant="btn btn-info"
              size="lg"
              name="buttons-Categoria"
            ></b-form-checkbox-group>
          </b-form-group>
          {{selected}}
          <div class="btn-group-vertical avanzada">
            <button class="btn btn-info avanzada" @click="busquedaAvanzadaMethod">BUSQUEDA AVANZADA</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="busquedaAvanzada">ACA VA LA BUSQUEDA AVANZADA</div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      selected: [],
      busquedaAvanzada: false,
      center: { lat: -34.59, lng: -58.45 },
      markers: [],
      options: [
        { text: "Magic", value: "Cartas Magic" },
        { text: "Futbol", value: "Partido Futbol" },
        { text: "Mateada", value: "Mateada en la Plaza" },
        { text: "Musica", Musica: "Musica" },
        { text: "Previa", Musica: "Previa" }
      ],
      todosLosEventos:[{
        position: { lat: -34.5876635, lng: -58.45189970000001 },
        categoria: "Partido Futbol"
      },
      {
        position: { lat: -34.6078662, lng: -58.3831004 },
        categoria: "Mateada en la Plaza"
      },
      {
        position: { lat: -34.6061884, lng: -58.4022407 },
        categoria: "Partido Futbol"
      },
      {
        position: { lat: -34.6149214, lng: -58.4180765 },
        categoria: "Cartas Magic"
      }]
    };
  },
  mounted() {

    this.geolocate();

    this.markers=this.todosLosEventos
  },
  methods: {
    busquedaAvanzadaMethod: function() {
      this.busquedaAvanzada = true;
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
   
    actualizarMarkers(Array){
      let listaFiltrada=[];
      
      let i=0;
      let j=0;
      console.log(this.todosLosEventos.length)
      while(i<this.todosLosEventos.length){

        while(j<Array.length){

          if(this.todosLosEventos[i].categoria==Array[j]){
            listaFiltrada.push(this.todosLosEventos[i])
          }
          
          j++
        }
        j=0
        i++
      }


      return listaFiltrada
    }
  },
  watch:{

    selected: function (val) {
      if(val.length!=0){
        this.markers=this.actualizarMarkers(val)
      }else{
        this.markers=this.todosLosEventos
      }
      
    },

  }
};
</script>
<style scoped>
.avanzada {
}
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
