import crearEvento from './components/crearEvento.vue';
import navBar from './components/navBar.vue';
import listaEventos from './components/listaEventos.vue';
import home from './components/home.vue';
import aux1 from './components/aux1.vue';




export const routes = [

    {path:'/crearEvento',name:'crearEvento',component:crearEvento},
    {path:'/navBar',name:'navBar',component:navBar},
    {path:'/listaEventos',name:'listaEventos',component:listaEventos},
    {path:'/',name:'home',component:home,
        children:[
            {path:'/aux1',name:'aux1',component:aux1}
        ]
    }
]
