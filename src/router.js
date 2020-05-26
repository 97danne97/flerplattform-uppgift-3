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
            path: "/drinks",
            name: "drinks",
            component: Drinks
        },
        {
            path: "/drinks/:id",
            name: "drink",
            component: Drink,
            props: true
        }
    ]
});

export default router;