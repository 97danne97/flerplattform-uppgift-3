<template>
    <div class="col s12" v-if="drink">
        <div class="card medium grey lighten-4 hoverable">
            <div class="card-image">
                <img :src="drink.strDrinkThumb" />
            </div>
            <div class="card-content">
                <span class="card-title">{{drink.strDrink}}</span>
                <p>{{drink.strCategory}}</p>
            </div>
            <div class="card-action">
                <router-link :to="'/drinks/'+drink.idDrink" class="btn blue waves-effect">How to mix</router-link>
            </div>
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
        }
    };
</script>

<style scoped>
.card:hover{
    cursor: pointer;
}
</style>