<template>
  <div>
    <template>
      <div class="container">
        <b-table striped hover :items="lista" :fields="fields">
          <template v-slot:cell(asistir)="row">
            <b-button size="sm" class="btn-info">Asistir</b-button>
          </template>
        </b-table>
      </div>
    </template>
  </div>
</template>

  </div>
</template>

<script>
export default {
  name: "listaEventos",

  data: function() {
    return {
      fields: ["direccion", "categoria", "fechaInicio", "Asistir"],
      lista: [
        {
          direccion: "Forest 366",
          categoria: "Partido Futbol",
          fechaInicio: "2019-11-11 10:20:30"
        },
        {
          direccion: "Pirngles 566",
          categoria: "Mateada en la Plaza",
          fechaInicio: "2019-11-23 10:20:30"
        },
        {
          direccion: "Av corta 346",
          categoria: "Partido Futbol",
          fechaInicio: "2019-11-14 10:20:30"
        },
        {
          direccion: "Manzana 366",
          categoria: "Cartas Magic",
          fechaInicio: "2019-11-29 10:20:30"
        }
      ]
    };
  },
  mounted() {
    
  },
  
};
</script>

<style>
</style>
