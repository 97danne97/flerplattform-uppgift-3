<template>
    <ul id="slide-out" class="sidenav">
        <li>
            <h5 class="black-text center-align">Saved recipes</h5>
        </li>
        <div class="divider"></div>
        <transition-group name="list" tag="div" class="collection with-header section">
            <li class="list-item collection-item avatar" v-for="(drink, index) in favorite_drinks" :key="index">
                <i v-on:click="removeFavorite(drink.idDrink)" class="material-icons right waves-effect red-text text-darken-4">remove_circle_outline</i>
                <div class="valign-wrapper">
                    <img :src="drink.strDrinkThumb" :alt="drink.strDrink" class="circle responsive-img"> <!-- notice the "circle" class -->
                    <router-link tag="a" :to="'/drinks/' + drink.idDrink"  class="black-text blue-text sidenav-close">{{drink.strDrink}}</router-link>
                </div>
            </li>
        </transition-group>
    </ul>
</template>

<script>
import M from 'materialize-css'
import Vue2Filters from 'vue2-filters';
export default {
    name: 'Favorites',
    mixins:[Vue2Filters.mixin],
    data(){
        return{
            instances:undefined
        }
    },
    computed:{
        favorite_drinks(){return this.$store.state.favorite_drinks}
    },
    created(){
        let self = this;
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.sidenav');
            this.instances = M.Sidenav.init(elems);
        });

        if (localStorage.getItem('favorite_drinks')) { // Om recept finns i localStorage
            self.$store.state.favorite_drinks = JSON.parse(localStorage.getItem('favorite_drinks'));
        }
        
    },
    watch:{
        favorite_drinks(val){
            localStorage.setItem('favorite_drinks', JSON.stringify(val));
        }
    },
    methods:{
        removeFavorite(id){
            let self = this;
            if(self.$store.state.favorite_drinks.some(e => e['idDrink'] === id)){
                self.$store.state.favorite_drinks.forEach(function (drink, index) {
                    if (id == drink['idDrink']) {
                        self.$store.state.favorite_drinks.splice(index, 1)
                    }
                });
            }
        }
    }
};
</script>
<style scoped>
.collection, .collection-item{
    border:none !important;
    width: 100%;
}
</style>