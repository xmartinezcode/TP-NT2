<template>
  <div>
    <h1>hola</h1>
    {{lista}}
    <button type="button" class="btn btn-info" @click="get">Mostra</button>
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
  created(){
      
          this.$http.get('http://localhost:8080/api/eventos/').then(function(data){
              this.lista=data.body;
        
          })
      }

  
  
  
};
</script>

<style>
</style>
