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
                name: 'Glass Type',
                list: [{"strGlass":"Highball glass"},{"strGlass":"Cocktail glass"},{"strGlass":"Old-fashioned glass"},{"strGlass":"Collins glass"},{"strGlass":"Pousse cafe glass"},{"strGlass":"Champagne flute"},{"strGlass":"Whiskey sour glass"},{"strGlass":"Brandy snifter"},{"strGlass":"White wine glass"},{"strGlass":"Nick and Nora Glass"},{"strGlass":"Hurricane glass"},{"strGlass":"Coffee mug"},{"strGlass":"Shot glass"},{"strGlass":"Jar"},{"strGlass":"Irish coffee cup"},{"strGlass":"Punch bowl"},{"strGlass":"Pitcher"},{"strGlass":"Pint glass"},{"strGlass":"Copper Mug"},{"strGlass":"Wine Glass"},{"strGlass":"Cordial glass"},{"strGlass":"Beer mug"},{"strGlass":"Margarita / Coupette glass"},{"strGlass":"Beer pilsner"},{"strGlass":"Beer Glass"},{"strGlass":"Parfait glass"},{"strGlass":"Mason jar"},{"strGlass":"Margarita glass"},{"strGlass":"Martini Glass"},{"strGlass":"Balloon Glass"},{"strGlass":"Coupe Glass"}]
            },
            {
                name: 'Alcohol',
                list: [{"strAlcoholic":"Alcoholic"},{"strAlcoholic":"Non alcoholic"},{"strAlcoholic":"Optional alcohol"}]
            }
        ]
    },
    actions: {
        //
    }, 
    mutations: {
        set(state, drinks) {
            // mutate state
            state.drinks = drinks
          }
    }
})