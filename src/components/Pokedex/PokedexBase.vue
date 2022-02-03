<template>
  <div class="flex flex-col md:flex-row">
    <div class="basis-full">
      <div class="relative mx-auto py-2">
        <div class="flex flex-col sm:flex-row sm:justify-center">
          <input
            type="text"
            placeholder="Mínimo 3 caracteres"
            class="rounded-lg px-4 py-2"
            v-model="pokemonSearch"
          />
          <span class="mx-1 mt-1 sm:mt-0"></span>
          <button
            type="button"
            class="rounded-lg bg-gray-700 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
            @click="resetSearch"
          >
            Reset
          </button>
        </div>
      </div>

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
import { usePokemonHook } from "@/composables/usePokemon";

const { getPokemonPage, searchByName } = usePokemonHook();

const page = ref(1);
const pokemons = ref();
const pokemonSearch = ref();
pokemons.value = getPokemonPage(1);

watch(pokemonSearch, (newValue) => {
  if (newValue.length < 3) return;
  pokemons.value = searchByName(newValue);
});

const updateHandler = () => {
  pokemons.value = getPokemonPage(page.value);
};

const resetSearch = () => {
  pokemonSearch.value = "";
  pokemons.value = getPokemonPage(1);
};
</script>
