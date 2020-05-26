<template>
    <div class="col s6 m4 l3">
        <router-link :to="'/drinks/'+drink.idDrink" tag="div" class="card grey lighten-4 hoverable">
            <div class="card-image">
                <img :src="drink.strDrinkThumb" />
            </div>
            <div class="card-content">
                <span class="card-title">{{drink.strDrink}}</span>
                <div class="chip truncate">
                {{drink.strCategory}}
                </div>
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
.card:hover{
    cursor: pointer;
}
</style>