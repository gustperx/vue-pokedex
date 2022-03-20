import { createRouter, createWebHistory } from "vue-router";
//import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      //component: HomeView,
      component: () => import("@/views/PokedexView.vue"),
    },
    {
      path: "/pokedex",
      name: "pokedex",
      component: () => import("@/views/PokedexView.vue"),
    },
    {
      path: "/pokemon",
      name: "pokemon",
      component: () => import("@/views/PokemonGameView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
    },
  ],
});

export default router;
