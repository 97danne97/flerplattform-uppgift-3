<template>
    <nav>
        <div class="nav-wrapper purple darken-3">
            <router-link class="brand-logo center" to="/">Drinks</router-link>
            <transition name="slide-right">
                <ul v-show="$route.path != '/drinks'">
                    <li>
                        <router-link tag="a" class="waves-effect left" :to="'/drinks'">
                            <i class="material-icons">arrow_back</i>
                        </router-link>
                    </li>
                </ul>
            </transition>
        </div>
    </nav>
</template>