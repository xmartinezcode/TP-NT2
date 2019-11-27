import CrearEvento from './components/CrearEvento.vue';
import MisEventos from './components/MisEventos.vue';
import Home from './components/Home.vue';
import HomeApp from './components/HomeApp.vue';




export const routes = [
    {path:'/',name:'Home',component:Home},
    {path:'/CrearEvento',name:'CrearEvento',component:CrearEvento},
    {path:'/MisEventos',name:'MisEventos',component:MisEventos},
    {path:'/HomeApp',name:'HomeApp',component:HomeApp    }
]
