import CrearEvento from './components/CrearEvento.vue';
import MisEventos from './components/MisEventos.vue';
import Home from './components/Home.vue';
import HomeApp from './components/HomeApp.vue';
import Login from './components/Login.vue';
import Register  from './components/Register.vue';



export const routes = [
    {path:'/',name:'Home',component:Home},
    {path:'/CrearEvento',name:'CrearEvento',component:CrearEvento},
    {path:'/Register',name:'Register',component:Register},
    {path:'/MisEventos',name:'MisEventos',component:MisEventos},
    {path:'/Login',name:'Login',component:Login},
    {path:'/HomeApp',name:'HomeApp',component:HomeApp    }
]
