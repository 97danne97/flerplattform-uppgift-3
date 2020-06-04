<template>
    <div id="main">
        <Navbar></Navbar>
        <Favorites></Favorites>
        <transition :name=transitionName>
            <keep-alive include="Drinks">
                <router-view tag="div" class="container" :key="$route.fullPath"/>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import Navbar from './components/layout/Navbar';
import Favorites from './components/Favorites.vue';

export default {
    components: {
        Navbar,
        Favorites
    },
    watch: {
        $route(to, from) {
            const toDepth = to.meta.depth || 0;
            const fromDepth = from.meta.depth || 0;
            this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
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