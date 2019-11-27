<template>
  <div>
    <div class="container">
      <img src="../assets/gente.jpg">    
        <div class="centered">
          <h1>Encontra eventos en base a tus gustos o crealos</h1>
          <router-link to="/HomeApp" class="btn btn-primary btn-lg" tag="button">Unite</router-link>
        </div>     
        
    </div>


    
  </div>
</template>


<script>
</script>
<style scoped>

.container img {
  width: 80%;
  height: auto;
  filter: brightness(0.5)
}

.container {
  position: relative;
  text-align: center;
  color: white;
  
}

.centered h1{
  margin-bottom: 30px;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.btn-primary{
  background-color:rgb(248, 61, 76); 
  border-color: rgb(245, 62, 62);
  width: 25%;
}
</style>
