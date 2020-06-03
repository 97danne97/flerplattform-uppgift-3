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
                            <i class="material-icons">settings</i>Settings
                            <span class="new badge purple darken-2" :data-badge-caption="filter_by" v-show="filter_by.length > 0"></span>
                        </div>
                        <div class="collapsible-body grey lighten-5">
                            <form>
                                <div class="row">
                                    <div class="col s12">
                                        <h3>Settings</h3>
                                        <div class="divider"></div>
                                        <div class="col s12 m6">
                                            <h4>Filters</h4>
                                            <div class="col">
                                                <label class="black-text">
                                                    <input class="with-gap" id="none" type="radio" value="" v-model="filter_by"/>
                                                    <span>No filter</span>
                                                </label>
                                            </div>
                                            <div class="col" v-for="(filter, index) in this.filters" :key="index">
                                                <h5>{{filter.name}}</h5>
                                                <div class="divider"></div>
                                                <div class="row section">
                                                    <div class="col s12" v-for="(item, index) in filter.list" :key="index">
                                                    <label class="black-text" :for="value" v-for="(value, key, index) in item" :key="index">
                                                        <input class="with-gap" :id="value" type="radio" :value="value" v-model="filter_by"/>
                                                        <span>{{value}}</span>
                                                    </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col s12 m6">
                                            <h4>Sort</h4>
                                            <div class="col">
                                                <label class="black-text">
                                                    <input class="with-gap" id="localId" type="radio" value="localId" v-model="sort_by.type"/>
                                                    <span>Default</span>
                                                </label>
                                            </div>
                                            <div class="col s12">
                                                <h5>Mode</h5>
                                                <div class="divider"></div>
                                                <div class="row section">
                                                    <div class="col s12" v-for="(filter, index) in this.filters" :key="index">
                                                        <label class="black-text">
                                                            <input class="with-gap" :id="filter.name" type="radio" :value="filter.code" v-model="sort_by.type"/>
                                                            <span>{{filter.name}}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <h5>Direction</h5>
                                                <div class="divider"></div>
                                                <div class="row section">
                                                    <div class="col s12" v-for="(sort_mode, index) in this.sort_modes" :key="index">
                                                        <label class="black-text" :for="sort_mode.name+'_'+sort_mode.value">
                                                            <input class="with-gap" :id="sort_mode.name+'_'+sort_mode.value" type="radio" :value="sort_mode.value" v-model="sort_by.mode"/>
                                                            <span>{{sort_mode.name}}</span>
                                                        </label>
                                                    </div>
                                                </div>
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
            <DrinkCard class="list-item" v-for="drink in orderBy(filterBy(filterItems), this.sort_by.type.toString(), this.sort_by.mode)" :key="drink.idDrink" :drink="drink"></DrinkCard>
        </transition-group>
        <div class="row">
            <div class="col s12 center">
                <button v-if="this.filter_by == ''" v-on:click="randomDrinks(8)" class="btn purple darken-2 waves-effect waves-light"><i class="material-icons left">add</i>load more</button>
            </div>
        </div>
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
            sort_by: {
                type:'localId',
                mode: 0
            },
            sort_modes: [
                {name:'Ascending (Default)', value: 0},
                {name:'Descending',value: -1}
            ],
            search_query: '',
            loading: true,
        };
    },
    computed: {
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
                    this.loading = false;
                });
        },
        onResponse: function (drinks, mode){
            let self = this;
            drinks.forEach(function(drink){
                drink.localId = drinks.length;
            });
            console.log(drinks);
            if (mode == 'set'){
                self.$store.state.drinks = drinks;
            }else if(mode == 'append'){
                drinks.forEach(function(drink){
                    if (self.$store.state.drinks.some(e => e['idDrink'] === drink.idDrink)) {
                        console.log('Drink already in list')
                    }
                    else{
                        self.$store.state.drinks.push(drink);
                        drink.localId = self.$store.state.drinks.length;
                    }
                });
            }
        },
        randomDrinks: function (amount = 8){
            this.loading = true;
            //GET-request till API för att hämta slumpade drinkar
            for (let i = amount; i--; i > 0 ) {
                axios
                    .get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
                    .then(res => {
                        this.onResponse(res.data.drinks, 'append'); // Kallar på onResponse vid svar från API
                        this.loading = false;
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