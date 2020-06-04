<template>
    <ul id="slide-out" class="sidenav sidenav-fixed">
        <li>
            <div class="user-view">
                <a href="" class="">
                    <i class="material-icons large yellow-text text-darken-2">star</i>
                </a>
                <a href="#name">
                    <span class="name black-text">Favorited recipes</span>
                </a>
            </div>
        </li>
        <li>
            <div class="divider"></div>
        </li>
        <li v-for="drink in favorite_drinks" :key="drink.idDrink">
            <router-link tag="a" class="waves-effect sidenav-close" :to="'/drinks/'+drink.idDrink">{{drink.strDrink}}</router-link>
        </li>
    </ul>
</template>

<script>
import M from 'materialize-css'
export default {
    name: 'Favorites',
    data(){
        return{
            instances:undefined
        }
    },
    created(){
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.sidenav');
            this.instances = M.Sidenav.init(elems);
        });

        if (localStorage.getItem('favorite_drinks')) { // Om recept finns i localStorage
            this.favorite_drinks = JSON.parse(localStorage.getItem('favorite_drinks'));
        }else{
            localStorage.setItem('favorite_drinks', '[]');
        }
        
    }
};
</script>