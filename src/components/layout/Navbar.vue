<template>
    <nav>
        <div class="nav-wrapper purple darken-3">
            <router-link class="brand-logo center" to="/">Drinks</router-link>
            <transition name="slide-right">
                <ul v-show="$route.path != '/drinks'">
                    <li>
                        <router-link tag="a" class="waves-effect left" :to="'/drinks'">
                            <span class="hide-on-med-and-down">Home</span><i class="material-icons left">home</i>
                        </router-link>
                    </li>
                </ul>
            </transition>
            <transition name="slide-left">
                <ul v-show="$route.path != '/favorites'">
                    <li class="right">
                        <router-link tag="a" class="waves-effect left" :to="'/favorites'">
                            <span class="hide-on-med-and-down">Favorites</span><i class="material-icons right">star</i>
                        </router-link>
                    </li>
                </ul>
            </transition>
        </div>
    </nav>
</template>