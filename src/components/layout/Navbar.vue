<template>
    <nav>
        <div class="nav-wrapper purple darken-3">
            
            <!-- Den besökta routens namn visas och börjar med stor bokstav -->
            <router-link class="brand-logo center" to="/">{{$route.name.charAt(0).toUpperCase() + $route.name.slice(1)}}</router-link>
            
            <!-- Visar router-länk när användaren inte befinner sig på länkens route.
                 Animationer visas när dessa döljs eller kommer fram  -->
            <transition name="slide-right">
                <ul v-show="$route.path != '/drinks'">
                    <li>
                        <router-link tag="a" class="waves-effect left" :to="'/drinks'">
                            <span class="hide-on-med-and-down">Home</span>
                            <i class="material-icons left">home</i>
                        </router-link>
                    </li>
                </ul>
            </transition>
            <transition name="slide-left">
                <ul v-show="$route.path != '/favorites'">
                    <li class="right">
                        <router-link tag="a" class="waves-effect left" :to="'/favorites'">
                            <span class="hide-on-med-and-down">Favorites</span>
                            <i class="material-icons right">star</i>
                        </router-link>
                    </li>
                </ul>
            </transition>
        </div>
    </nav>
</template>