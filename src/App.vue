<template>
    <div>
        <Navbar></Navbar>
        <transition :name=transitionName>
            <keep-alive include="Drinks">
                <router-view tag="div" class="container" :key="$route.fullPath"/>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import Navbar from './components/layout/Navbar';
import axios from 'axios';

export default {
    components: {
        Navbar
    },
    watch: {
        $route(to, from) {
            const toDepth = to.meta.depth || 0;
            const fromDepth = from.meta.depth || 0;
            this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
        }
    },
    methods: {
        onResponse: function(res) {
            this.$store.state.drinks = res.data.drinks;
            this.response = true;
        }
    },
    mounted() {
        //GET-request till API
        axios
            .get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a")
            .then(res => {
                this.onResponse(res); // Kallar på onResponse vid svar från API
            });
    }
}
</script>

<style>
body {
    /*För att sidan inte ska hoppa vid övergångar*/
    overflow-x: hidden;
}

/* fade-övergång för routade element i <transition>-taggar (router-views) */
.slide-right-enter-active, .slide-right-leave-active {
    transition: .2s cubic-bezier(0.19, 1, 0.22, 1);
}

.slide-right-enter-active {
    transition-delay: .2s;
    height: 0;
}
.slide-right-enter {
    opacity: 0;
    transform: translateX(-200px);
}
.slide-right-leave-active {
    transform: translateX(200px);
    opacity: 0;
    height: 0;
}

/* fade-animation för element i <transition>-taggar (router-views) */
.slide-left-enter-active, .slide-left-leave-active {
    transition: .2s cubic-bezier(0.19, 1, 0.22, 1);
}
.slide-left-enter-active {
    transition-delay: .2s;
    height: 0;
}
.slide-left-enter {
    opacity: 0;
    transform: translateX(200px);
}
.slide-left-leave-active {
    opacity: 0;
    transform: translateX(-200px);
    height: 0;
}

/* Animation för element i <transition-group> -element */
.list-item {
  transition: all .3s;
}
.list-enter, .list-leave-to{
  opacity: 0;
}
.list-leave-active {
  position: absolute;
}
</style>