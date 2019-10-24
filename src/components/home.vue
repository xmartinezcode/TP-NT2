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
          <router-view></router-view>
        </div>

        <div class="col-2">
          <!-- <div class="btn-group-vertical">
            <button type="button" class="btn btn-info">Magic</button>
            <button type="button" class="btn btn-info">Futbol</button>
            <button type="button" class="btn btn-info">Mateada</button>
            <button type="button" class="btn btn-info">Musica</button>
            <button type="button" class="btn btn-info">Previa</button>
            <router-link to="/BusquedaAvanzada" class="btn btn-info" tag="button">BUSQUEDA AVANZADA</router-link>
          </div> -->

          <!-- <b-form-group label="Stacked (vertical) button-group style checkboxes"> -->
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

          <div class="btn-group-vertical">
            <router-link to="/BusquedaAvanzada" class="btn btn-info" tag="button">BUSQUEDA AVANZADA</router-link>
          </div>


        </div>
      </div>
    </div>


    
  </div>
</template>


<script>
export default {
  data() {
      return {
        selected: [], // Must be an array reference!
        options: [
          { text: 'Magic', value: 'Magic' },
          { text: 'Futbol', value: 'Futbol' },
          { text: 'Mateada', value: 'Mateada' },
          { text: 'Musica', Musica: 'Musica' },
          { text: 'Previa', Musica: 'Previa' }
        ]
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

#live{
	background:#f12849;
	padding:5px 10px;
	color:#fff;
	border:none;
	border-radius:5px;
	
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
    0% { opacity: 1.0; }
    50% { opacity: 0.5; }
    100% { opacity: 1.0; }
}
</style>