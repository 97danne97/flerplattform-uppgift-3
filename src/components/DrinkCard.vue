<template> <!-- Kort för bild och lite information om drink -->
    <div class="col s12 m4 xl3 drink_card_column">
        
        <!-- Kortet fungerar som länk till drinkens recept -->
        <router-link :to="'/drinks/'+drink.idDrink" tag="div" class="card grey lighten-5 z-depth-0" :class="{'z-depth-5': !sortDisabled}">
            <div class="card-image"><img :src="drink.strDrinkThumb" /></div>
            <div class="card-content">
                <div class="row">
                    <div class="col s12 truncate grey-text">{{drink.strCategory}}
                        <i v-if="isSaved" class="material-icons right yellow-text text-darken-1">star</i>
                    </div>
                    <span class="col s12 flow-text truncate">{{drink.strDrink}}</span>
                    <div class="col s12 truncate" :class="alcoholicColor+'-text'">{{drink.strAlcoholic}}</div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "DrinkCard",
    props: ['drink', 'sortDisabled'] /* Data som skickas från förälder-komponenter */,
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
        alcoholicColor(){
            if(this.drink.strAlcoholic == 'Alcoholic'){
                return 'green';
            }else if(this.drink.strAlcoholic == 'Optional alcohol'){
                return 'blue';
            }else{
                return 'orange';
            }
        }
    }
}
</script>

<style scoped>
.drink_card_column{
    margin-left: 0 !important; /* Korten håller sig till vänster, skriver över Materialize */
}
.card{
    height: calc(100% - 25px); /* Kortet fyller upp höjden av containern - margin */
    border: 1px solid rgb(226, 226, 226);
}
.card:hover{
    cursor: pointer;
}
</style>