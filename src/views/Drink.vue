<template>
    <div class="section row" v-if="drink">
        <div class="row">
            <router-link class="btn btn-flat white waves-effect" :to="'/drinks'">
                <i class="material-icons">arrow_back</i>
            </router-link>
        </div>
        <div class="col s12 m6 xl5 center-align">
            <img id="drink_img" class="responsive-img" :src="drink.strDrinkThumb" />
        </div>
        <div class="col s12 m6 xl7">
            <h4 class="card-title">{{drink.strDrink}}</h4>
            <div class="chip truncate pink white-text lighten-2">{{drink.strCategory}}</div>
            <div class="chip truncate white-text purple lighten-1">{{drink.strGlass}}</div>
            <div class="chip truncate white-text green lighten-1">{{drink.strAlcoholic}}</div>
        </div>
        <div id="ingredients" class="col s12 m6 xl7">
            <h4>Ingredients</h4>
            <div id="ingredients_list" class="col s12">
                <div class="col" v-for="i in 15" :key="i" v-show="drink[strCombine('strIngredient', i)] != null">
                    <div class="card z-depth-0 grey lighten-3">
                        <div class="card-image">
                            <img id="ingredient_img" :src="'https://www.thecocktaildb.com/images/ingredients/'+drink[strCombine('strIngredient', i)]+'-Small.png'" />
                        </div>
                    </div>
                        <div class="">
                            <h5 class="flow-text">{{drink[strCombine('strMeasure', i)]}}</h5>
                            <span>{{drink[strCombine('strIngredient', i)]}}</span>
                        </div>
                </div>
            </div>
        </div>
        <div id="mixing" class="col">
            <h4>Instructions</h4>
            <blockquote>{{drink.strInstructions}}</blockquote>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DrinkCard",
        computed:{
            drink () {
                let x;
                for (var i = 0; i < this.$store.state.drinks.length; i++) {
                    console.log(this.$store.state.drinks[i])
                    if (this.$store.state.drinks[i].idDrink == this.$route.params.id) {
                        x = this.$store.state.drinks[i];
                    }
                }
                return x;
            },
        },
        methods: {
            strCombine: function (k, i) {
                k = k.toString()
                i = i.toString()
                let x = k+i
                return x
            }
        }
    };
</script>

<style scoped>

    #ingredients_list{
        display: flex;
        overflow-x: auto;
    }

    #ingredient_img{
        height: 100px;
        padding: 10px;
        width: 100px;
    }
</style>