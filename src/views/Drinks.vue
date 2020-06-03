<template>
    <div class="section">
        <div class="row">
            <div id="drink_search_container" class="input-field col s12">
                <i class="material-icons prefix black-text">search</i>
                <input id="drink_search" type="text" v-model="search_query" v-on:keyup="search()" v-on:keyup.enter="$event.target.blur()" />
                <label for="drink_search" class="black-text">Search drinks...</label>
            </div>
            <div class="col s12">
                <ul class="collapsible z-depth-0">
                    <li>
                        <div class="collapsible-header grey lighten-3 waves-effect">
                            <i class="material-icons">settings</i>Filter
                            <span class="new badge purple darken-2" :data-badge-caption="filter_by" v-show="filter_by.length > 0"></span>
                        </div>
                        <div class="collapsible-body grey lighten-5">
                            <form>
                                <div class="row">
                                    <label>
                                        <input class="with-gap" id="none" type="radio" value="" v-model="filter_by"/>
                                        <span>No filter</span>
                                    </label>
                                    <div class="col" v-for="(filter, index) in this.filters" :key="index">
                                        <h5>{{filter.name}}</h5>
                                        <div class="divider"></div>
                                        <div class="row section">
                                            <div class="col s12 m6" v-for="(item, index) in filter.list" :key="index">
                                            <label class="black-text" :for="value" v-for="(value, key, index) in item" :key="index" v-on:click="filter_type=key">
                                                <input class="with-gap" :id="value" type="radio" :value="value" v-model="filter_by"/>
                                                <span>{{value}}</span>
                                            </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <transition-group name="list" tag="div" class="row" id="drinks_list">
            <DrinkCard class="list-item" v-for="drink in filterBy(filterItems)" :key="drink.idDrink" :drink="drink"></DrinkCard>
        </transition-group>
    </div>
</template>

<script>
import DrinkCard from "../components/DrinkCard";
import Vue2Filters from "vue2-filters";
import M from "materialize-css";
import axios from 'axios';

export default {
    components: {
        DrinkCard
    },
    name: "Drinks",
    mixins: [Vue2Filters.mixin],
    data() {
        return {
            instances: [],
            filter_by: '',
            filter_type: undefined,
            search_query: '',
        };
    },
    computed: {
        favorite_drinks() {
            return this.$store.state.drinks;
        },
        filters() {
            return this.$store.state.filters;
        },
        filterItems: function() {
            let self = this;
            let category = self.filter_by;

            if (category.length < 1) {
                return self.$store.state.drinks;
            } else {
                return self.$store.state.drinks.filter(drink => {
                    let matchFilter = false;
                        if (category == drink.strCategory || category == drink.strAlcoholic) {
                            matchFilter = true;
                        }
                    return matchFilter;
                });
            }
        }
    },
    mounted() {
        document.addEventListener("DOMContentLoaded", function() {
            var elems = document.querySelectorAll(".collapsible");
            this.instances = M.Collapsible.init(elems);
        });

        this.randomDrinks();
    },
    methods:{
        search: function(){
            let self = this;
            let search_query = this.search_query;

            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            if (this.search_query.length > 3) { // Om användaren matat in minst 3 karaktärer i sökrutan
                 this.timeout = setTimeout(function () {
                    console.log(search_query);
                    self.fetchDrinks(search_query);
                }, 700); // Startar timer
            }
        },
        fetchDrinks: function(query){
            axios
                .get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + query)
                .then(res => {
                    this.onResponse(res.data.drinks, 'set');
                });
        },
        onResponse: function (drinks, mode){
            let self = this;
            console.log(drinks)
            if (mode == 'set'){
                self.$store.state.drinks = drinks;
            }else if(mode == 'append'){
                drinks.forEach(function(drink){
                    self.$store.state.drinks.push(drink);
                });
            }
        },
        randomDrinks: function (amount = 10){
        //GET-request till API för att hämta slumpade drinkar
        for (let i = amount; i--; i > 0 ) {
            axios
                .get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
                .then(res => {
                    this.onResponse(res.data.drinks, 'append'); // Kallar på onResponse vid svar från API
                });
            }
        }
    }
};
</script>

<style scoped>
#drink_search{
    padding-left: 5px;
}
#drink_search:focus{
    border-color: #6a1b9a;
    box-shadow: none;
}

label>input[type=radio]:checked + span::before, label>input[type=radio]:checked + span::after{
    border-color: #9c27b0;
}
label>input[type=radio]:checked + span::after{
    background-color: #9c27b0;
}

#drinks_list{
    display: flex;
    flex-wrap: wrap;
}
</style>