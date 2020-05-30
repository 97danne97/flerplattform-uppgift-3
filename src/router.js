import Vue from "vue";
import Router from "vue-router";
import Drinks from "./components/Drinks";
import Drink from "./components/Drink"

Vue.use(Router);

const router = new Router({
    mode: 'hash', // historik-metod för routes. hash används för att undvika extra konfigurering av webbserver.
    base: '/',
    routes: [
        {
            path: '*',
            redirect: '/drinks'
        },
        {
            meta: {depth: 0},
            path: "/drinks",
            name: "drinks",
            component: Drinks
        },
        {
            meta: {depth: 1},
            path: "/drinks/:id",
            name: "drink",
            component: Drink,
            props: true
        }
    ],
    scrollBehavior () {
        if(router.path != '/drinks'){
            return { x: 0, y: 0 };
        }
    }
});

export default router;