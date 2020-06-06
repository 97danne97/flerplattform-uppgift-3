<template>
    <div id="main">
        <Navbar></Navbar>
        <transition :name=transitionName> <!-- Animation baserat på navigation -->
            <!-- Router vy, keep alive håller Drinks aktiv alltid -->
            <keep-alive include="Drinks">
                <router-view tag="div" class="container" :key="$route.fullPath"/>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import Navbar from './components/layout/Navbar';

export default {
    components: {
        Navbar
    },
    computed:{
        favorite_drinks(){ // Skapar variabel med samma namn och som uppdateras när favorite_drinks i store ändras
            return this.$store.state.favorite_drinks;
        }
    },
    created(){ // När komponenten har skapats hämtas och sparas drinkar från localStorage
        let self = this;
        if (localStorage.getItem('favorite_drinks')) { // Om recept finns i localStorage
            self.$store.state.favorite_drinks = JSON.parse(localStorage.getItem('favorite_drinks'));
        }
    },
    watch: { // Håller utkit på om $route eller favorite_drinks ändras och kör då funktioner
        $route(to, from) { // Väljer animation beroende på hur man navigerar mellan routes
            const toDepth = to.meta.depth || 0;
            const fromDepth = from.meta.depth || 0;
            this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
        },
        favorite_drinks(val){ // Uppdaterar localStorage när favorite_drinks ändras
            localStorage.setItem('favorite_drinks', JSON.stringify(val));
        }
    }
}
</script>

<style>
body {
    /*För att sidan inte ska hoppa vid övergångar*/
    overflow-x: hidden;
    overflow-y: scroll;
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
  transition: all .5s cubic-bezier(0, 0.510, 0.255, 1);
  transform-origin: top;
}
.list-enter, .list-leave-to{
  opacity: 0;
  transform:  translateY(-20px);
}
.list-leave-active {
  position: absolute;
}
</style>