<template>
    <div class="section drink_details_container" v-if="drink">
        <div id="drink_details_card" class="card grey lighten-4">
            <div class="card-content">
                <div class="row">
                    <div class="col s12 center">
                        <img id="drink_img" class="responsive-img z-depth-1" :src="drink.strDrinkThumb" />
                    </div>
                </div>
                <div class="row">
                    <div class="col s12">
                        <h4>{{drink.strDrink}}</h4>
                        <div class="chip truncate grey lighten-2">{{drink.strCategory}}</div>
                        <div class="chip truncate grey lighten-2">{{drink.strGlass}}</div>
                        <div class="chip truncate grey lighten-2">{{drink.strAlcoholic}}</div>
                    </div>
                </div>
                <div class="row">
                    <div id="ingredients" class="col s12">
                        <h5>Ingredients</h5>
                        <div id="ingredients_list" class="col s12">
                            <div class="col" v-for="i in 15" :key="i" v-show='drink[strCombine("strIngredient", i)] != null && drink[strCombine("strIngredient", i)] != ""'>
                                <div class="card z-depth-0 grey lighten-3">
                                    <div class="card-image">
                                        <img id="ingredient_img" :src="'https://www.thecocktaildb.com/images/ingredients/'+drink[strCombine('strIngredient', i)]+'-Small.png'" v-if="drink[strCombine('strIngredient', i)] != null" />
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
import axios from 'axios'

export default {
    name: "Drink",
    data() {
        return{
            drink:false
        }
    },
    methods: {
        strCombine: function (str, index) {
            str = str.toString()
            index = index.toString()
            let x = str+index
            return x
        }
    },
    created(){
        let drink;
        let drink_id = this.$route.params.id;
        if (this.$store.state.drinks.some(e => e['idDrink'] === drink_id)) {
            for (let i = 0; i < this.$store.state.drinks.length; i++) {
                console.log(this.$store.state.drinks[i])
                if (this.$store.state.drinks[i].idDrink == drink_id) {
                    drink = this.$store.state.drinks[i];
                }
            }
            this.drink = drink;
        }
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
};
</script>

<style scoped>
.drink_details_container{
    max-width: 600px;
    margin: auto;
}
#drink_img{
    max-height: 200px;
    margin: auto;
}
#ingredients_list{
    display: flex;
    overflow-x: auto;
}
#ingredients_list>div{
    width: 110px;
}

#ingredient_img{
    height: 90px;
    padding: 10px;
    width: 90px;
}
</style>