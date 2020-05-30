<template>
    <div>
        <div class="row">
            <div class="input-field col s12">
                <i class="material-icons prefix black-text">search</i>
                <input id="drink_search" type="text" v-model="drink_search" />
                <label for="drink_search" class="black-text">Search drinks...</label>
            </div>
        </div>
        <div class="row">
            <ul class="collapsible">
                <li>
                    <div class="collapsible-header">
                        <i class="material-icons">settings</i>Search settings
                    </div>
                    <div class="collapsible-body">
                        <form>
                            <div class="row">
                                <div class="col" v-for="(filter, index) in this.filters" :key="index">
                                    <h5>{{filter.name}}</h5>
                                    <div class="divider"></div>
                                    <div class="row section">
                                        <div class="col s12 m6" v-for="(item, index) in filter.list" :key="index">
                                        <label :for="value" v-for="(value, key, index) in item" :key="index" v-on:click="filter_type=key">
                                            <input
                                                class="with-gap"
                                                :id="value"
                                                type="radio"
                                                :value="value"
                                                v-model="filter_by"
                                            />
                                            <span class="truncate">{{value}}</span>
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
        <div class="row">
            <DrinkCard
                v-for="(drink, index) in this.$store.state.drinks"
                :key="index"
                :drink="drink"
            ></DrinkCard>
        </div>
    </div>
</template>

<script>
import DrinkCard from "../components/DrinkCard";
import Vue2Filters from "vue2-filters";
import M from "materialize-css";

export default {
    components: {
        DrinkCard
    },
    name: "Drinks",
    mixins: [Vue2Filters.mixin],
    props: ["data", "response"],
    data() {
        return {
            instances: [],
            filter_by: [],
            filter_type: undefined
        };
    },
    computed: {
        favorite_drinks() {
            return this.$store.state.drinks;
        },
        filters() {
            return this.$store.state.filters;
        }
        /* filterItems: function() {
            
        } */
    },
    mounted() {
        document.addEventListener("DOMContentLoaded", function() {
            var elems = document.querySelectorAll(".collapsible");
            this.instances = M.Collapsible.init(elems);
        });
    }
};
</script>

<style scoped>
</style>