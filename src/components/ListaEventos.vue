<template>
  <div>

    {{lista.data[0]}}

  </div>
</template>

<script>

export default {
  name: "listaEventos",

  data: function() {
    return {
      lista: null
    };
  },
  mounted(){
    this.getLista()
  },
  methods:{
    getLista: function(){
      axios
      .get('http://localhost:8080/api/eventos')
      .then(response => (this.lista = response))
    }
  }
    
  
};
</script>

<style>
</style>
