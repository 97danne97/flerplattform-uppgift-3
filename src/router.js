import Vue from "vue";
import Router from "vue-router";
import Drinks from "./views/Drinks";
import Drink from "./views/Drink"

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
    scrollBehavior(to, from, savedPosition) { // Scrolla till sparad position mellan routes
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
});

export default router;