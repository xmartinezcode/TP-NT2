import CrearEvento from './components/CrearEvento.vue';
import ListaEventos from './components/ListaEventos.vue';
import Home from './components/Home.vue';
import HomeApp from './components/HomeApp.vue';
import Login from './components/Login.vue';
import Mapa from './components/Mapa.vue';
import BusquedaAvanzada from './components/BusquedaAvanzada.vue';
import CrearUsuario  from './components/CrearUsuario.vue';
import Register  from './components/Register.vue';



export const routes = [
    {path:'/',name:'Home',component:Home},
    {path:'/CrearEvento',name:'CrearEvento',component:CrearEvento},
    {path:'/Register',name:'Register',component:Register},
    {path:'/ListaEventos',name:'ListaEventos',component:ListaEventos},
    {path:'/Login',name:'Login',component:Login},
    {path:'/CrearUsuario',name:'CrearUsuario',component:CrearUsuario},
    {path:'/BusquedaAvanzada',name:'BusquedaAvanzada',component:BusquedaAvanzada,
    children:[
        {path:'',name:'Mapa',component:Mapa},
    ]},
    {path:'/HomeApp',name:'HomeApp',component:HomeApp,
        children:[
            {path:'',name:'Mapa',component:Mapa},
        ]
    }
]
