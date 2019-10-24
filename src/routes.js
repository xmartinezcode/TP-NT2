import CrearEvento from './components/CrearEvento.vue';
import NavBar from './components/NavBar.vue';
import ListaEventos from './components/ListaEventos.vue';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Mapa from './components/Mapa.vue';
import BusquedaAvanzada from './components/BusquedaAvanzada.vue';
import CrearUsuario  from './components/CrearUsuario.vue';




export const routes = [

    {path:'/CrearEvento',name:'CrearEvento',component:CrearEvento},
    {path:'/NavBar',name:'NavBar',component:NavBar},
    {path:'/ListaEventos',name:'ListaEventos',component:ListaEventos},
    {path:'/Login',name:'Login',component:Login},
    {path:'/CrearUsuario',name:'CrearUsuario',component:CrearUsuario},
    {path:'/BusquedaAvanzada',name:'BusquedaAvanzada',component:BusquedaAvanzada,
    children:[
        {path:'',name:'Mapa',component:Mapa},
    ]},
    {path:'/',name:'Home',component:Home,
        children:[
            {path:'',name:'Mapa',component:Mapa},
        ]
    }
]
