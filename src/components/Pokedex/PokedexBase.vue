<template>
  <div class="flex flex-col md:flex-row">
    <div class="basis-full">
      <PokedexSearch @on:change="inputUpdated" @on:click="resetSearch" />

      <div class="relative mx-auto py-2">
        <div class="flex justify-center">
          <v-pagination
            v-model="page"
            :pages="65"
            :range-size="1"
            active-color="#DCEDFF"
            @update:modelValue="updateHandler"
          />
        </div>
      </div>

      <PokedexList :pokemons="pokemons"></PokedexList>
    </div>

    <div class="basis-full bg-red-200">
      <h3>Details</h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import PokedexList from "./PokedexList.vue";
import PokedexSearch from "./PokedexSearch.vue";
import { usePokemonHook } from "@/composables/usePokemon";

const { getPokemonPage, searchByName, getPokemon } = usePokemonHook();

const page = ref(1);
const pokemons = ref();
const pokemonSearch = ref();
pokemons.value = getPokemonPage(1);

watch(pokemonSearch, (newValue) => {
  if (newValue.length < 3) return;
  pokemons.value = searchByName(newValue);
});

/* const pokemon = async (pokemonId: number) => {
  const poke = await getPokemon(pokemonId);
  console.log(poke);
  return poke;
};
pokemon(21); */

const updateHandler = () => {
  pokemons.value = getPokemonPage(page.value);
};

const inputUpdated = (text: string) => {
  pokemonSearch.value = text;
};

const resetSearch = () => {
  pokemonSearch.value = "";
  page.value = 1;
  pokemons.value = getPokemonPage(1);
};
</script>
