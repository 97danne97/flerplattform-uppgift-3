<template> <!-- Komponent för sparade drinkar -->
    <ul class="section container">
        <div class="row">
            <div class="col s12">
                <h4>Favorites
                    <!-- Knappar som visas beroende på om användaren sorterar eller ej -->
                    <a class="btn-floating green lighten-1 waves-effect right" v-if="!sortDisabled" v-on:click="sortDisabled = !sortDisabled"><i class="material-icons right">done</i></a>
                    <a class="btn-floating purple darken-2 waves-effect right tooltipped" data-tooltip="Edit" v-else v-on:click="sortDisabled = !sortDisabled"><i class="material-icons right">edit</i></a>
                </h4>
            </div>
        </div>
        <div class="row section">
            <draggable v-model="$store.state.favorite_drinks" :disabled="sortDisabled">
                <transition-group tag="div" name="list" id="favorites_list" class="row">
                    <DrinkCard class="list-item" v-for="(drink, index) in favorite_drinks" :key="drink.idDrink" :drink="drink" :index="index" :sortDisabled="sortDisabled"></DrinkCard>
                </transition-group>
            </draggable>
        </div>
    </ul>
</template>

<script>
import M from 'materialize-css'
import draggable from 'vuedraggable'
import DrinkCard from '../components/DrinkCard.vue'
export default {
    name: 'Favorites',
    components:{
        draggable,
        DrinkCard
    },
    data(){
        return{
            instances:undefined, // För materialize
            sortDisabled:true
        }
    },
    computed:{
        favorite_drinks(){
            return this.$store.state.favorite_drinks
        }
    },
    mounted(){
        let elems = document.querySelectorAll('.tooltipped');
        this.instances = M.Tooltip.init(elems);
    }
};
</script>
<style scoped>
.sidenav{
    width: 100%;
}
#sidenav_header{
    position:sticky;
    top:0;
    z-index:2;
}
#favorites_list{
    display: flex;
    flex-wrap: wrap;
}
</style>