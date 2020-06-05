<template> <!-- Kort för bild och lite information om drink -->
    <div class="col s12 m4 xl3 drink_card_column">
        
        <!-- Kortet fungerar som länk till drinkens recept -->
        <router-link :to="'/drinks/'+drink.idDrink" tag="div" class="card grey lighten-4" :class="{'z-depth-5': !sortDisabled}">
            <div class="card-image"><img :src="drink.strDrinkThumb" /></div>
            <div class="card-content">
                <p class="truncate grey-text text-darken-1">{{drink.strCategory}}</p>
                <span class="card-title">{{drink.strDrink}}</span>
                <p class="truncate grey-text">{{drink.strAlcoholic}}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "DrinkCard",
    props: ['drink', 'sortDisabled'] /* Data som skickas från förälder-komponenter */
}
</script>

<style scoped>
.drink_card_column{
    margin-left: 0 !important; /* Korten håller sig till vänster, skriver över Materialize */
}
.card{
    height: calc(100% - 25px); /* Kortet fyller upp höjden av containern - margin */
}
.card:hover{
    cursor: pointer;
}
</style>