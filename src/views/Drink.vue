<template> <!-- Drink recept -->
    <div class="section drink_details_container" v-if="drink"> <!-- När drinken har laddats in -->
        <div id="drink_details_card" class="card z-depth-0 grey lighten-4">
            <div class="card-content">
                
                <!-- Bild på drinken -->
                <div class="row center">
                    <div class="col s12 center">
                        <img id="drink_img" class="responsive-img z-depth-1" :src="drink.strDrinkThumb" />
                    </div>
                </div>

                <!-- Namn och kort information om drinken -->
                <div class="row center">
                    <div class="col s12">
                        <h3>{{drink.strDrink}}</h3>
                        <div class="chip">{{drink.strCategory}}</div>
                        <div class="chip">{{drink.strGlass}}</div>
                        <div class="chip">{{drink.strAlcoholic}}</div>
                    </div>
                </div>

                <div class="row center">
                    <a v-if="isSaved" v-on:click="toggleFavorite()" class="btn-flat yellow darken-2 waves-effect"><i class="material-icons left">star</i>Remove favorite</a>
                    <a v-else v-on:click="toggleFavorite()" class="btn blue lighten-1 waves-effect"><i class="material-icons left">star_outline</i>Add as favorite</a>
                </div>

                <!-- Ingredienser -->
                <div class="row">
                    <div id="ingredients" class="col s12">
                        <h5>Ingredients</h5>
                        <div id="ingredients_list" class="col s12">

                            <!-- Kör för varje ingrediens -->
                            <div class="col" v-for="i in 15" :key="i" v-show='drink[strCombine("strIngredient", i)] != null && drink[strCombine("strIngredient", i)] != ""'>
                                <div class="card z-depth-0 grey lighten-3">
                                    <div class="card-image">
                                        <img id="ingredient_img" :src="'https://www.thecocktaildb.com/images/ingredients/'+drink[strCombine('strIngredient', i)]+'-Small.png'" v-if="drink[strCombine('strIngredient', i)] != null && drink[strCombine('strIngredient', i)] != ''" />
                                    </div>
                                </div>
                                <div>
                                    <p><b>{{drink[strCombine('strMeasure', i)]}}</b></p>
                                    <p>{{drink[strCombine('strIngredient', i)]}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Receptets instruktioner -->
                <div class="row">
                    <div id="mixing" class="col s12">
                        <h5>Instructions</h5>
                        <p>{{drink.strInstructions}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Drink",
    data() {
        return{
            // Ursprungligt värde falskt eftersom drinken inte hämtats än
            drink:false
        }
    },
    computed:{
        isSaved(){ // Returnerar om drinken har sparats eller ej
            let self = this;
            if(self.$store.state.favorite_drinks.some(e => e['idDrink'] === self.drink.idDrink)){
                return true;
            }
            else{
                return false;
            }
        },
        favorite_drinks(){
            return this.$store.state.favorite_drinks;
        }
    },
    methods: {
        strCombine: function (str, index) { // För att slå ihop sträng med nummer (ingredienser)
            index = index.toString();
            let combinedString = str+index;
            return combinedString;
        },
        toggleFavorite(){ // Lägga till och ta bort drink från sparade drinkar
            let self = this;

            // Om drinken är sparad, ta bort 
            if(self.$store.state.favorite_drinks.some(e => e['idDrink'] === self.drink.idDrink)){
                self.favorite_drinks.forEach(function (drink, index) {
                    if (self.drink.idDrink == drink['idDrink']) {
                        self.$store.state.favorite_drinks.splice(index, 1);
                    }
                });
            }
            
            // Annars lägg till
            else{
                self.$store.state.favorite_drinks.push(self.drink);
            }
        }
    },
    created(){ // När komponenten skapats hämtas information om drink
        let drink;
        let drink_id = this.$route.params.id;
        
        // Om drinken redan har hämtats från api:et hämtas informationen lokalt
        if (this.$store.state.drinks.some(e => e['idDrink'] === drink_id)) {
            for (let i = 0; i < this.$store.state.drinks.length; i++) {
                console.log(this.$store.state.drinks[i])
                if (this.$store.state.drinks[i].idDrink == drink_id) {
                    drink = this.$store.state.drinks[i];
                }
            }
            this.drink = drink;
        }

        // Annars från api (t.ex. om användaren besöker via direktlänk till receptet)
        else{
            axios
                .get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+drink_id)
                .then(res => {
                    drink = res.data.drinks[0];
                    console.log(drink)
                    this.drink = drink;
                });
        }
    }
}
</script>

<style scoped>
.drink_details_container{
    max-width: 600px; /* Max-bredd på receptrutan */
    margin: auto; /* Förhålla sig centrerat */
}
.card{
    border: 1px solid rgb(226, 226, 226);
}
#drink_img{
    max-height: 200px;
    margin: auto;
}
#ingredients_list{ /* För horisontell layout på ingredienslistan */
    display: flex;
    overflow-x: auto;
}
#ingredients_list > div{ /* Fast bredd på ingrediens-elementen */
    width: 110px;
}

#ingredient_img{ /* Fast bredd på ingrediensbilderna samt padding för utseende */
    height: 90px;
    padding: 10px;
    width: 90px;
}
</style>