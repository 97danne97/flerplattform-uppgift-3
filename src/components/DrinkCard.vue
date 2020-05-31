<template>
    <div class="col s12 m4 l3 drink_card_column">
            <div class="card-image"><img :src="drink.strDrinkThumb" /></div>
            <div class="card-content">
                <span class="card-title">{{drink.strDrink}}</span>
                <p class="truncate grey-text text-darken-1">{{drink.strCategory}}</p>
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
    outline: 1px solid rgb(211, 211, 211);
}
.card:hover{
    cursor: pointer;
}
</style>