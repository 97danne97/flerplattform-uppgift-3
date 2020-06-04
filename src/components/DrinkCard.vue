<template>
    <div class="col s12 m4 xl3 drink_card_column">
        <router-link :to="'/drinks/'+drink.idDrink" tag="div" class="card grey lighten-4 hoverable">
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
        props: ["drink"]
    };
</script>

<style scoped>
.drink_card_column{
    margin-left: 0 !important;
}
.card{
    height: calc(100% - 25px);
}
.card:hover{
    cursor: pointer;
}
</style>