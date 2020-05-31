import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        drinks: [],
        filters: [
            {
                name: 'Drink type',
                list: [{"strCategory":"Ordinary Drink"},{"strCategory":"Cocktail"},{"strCategory":"Milk / Float / Shake"},{"strCategory":"Other or Unknown"},{"strCategory":"Cocoa"},{"strCategory":"Shot"},{"strCategory":"Coffee / Tea"},{"strCategory":"Homemade Liqueur"},{"strCategory":"Punch / Party Drink"},{"strCategory":"Beer"},{"strCategory":"Soft / Drink / Soda"}]
            },
            {
                name: 'Alcohol',
                list: [{"strAlcoholic":"Alcoholic"},{"strAlcoholic":"Non alcoholic"},{"strAlcoholic":"Optional alcohol"}]
            }
        ]
    },
    mutations: {
        set(state, drinks) {
            // mutate state
            state.drinks = drinks
        }
    }
})