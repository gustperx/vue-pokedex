<template>
  <div class="flex flex-col md:flex-row">
    <div v-if="isLoading">Cargando...</div>

    <template v-else>
      <div class="basis-full">
        <PokedexSearch @on:change="changeSearch" @on:click="resetSearch" />

        <div class="relative mx-auto py-2">
          <div class="flex justify-center">
            <v-pagination
              v-model="page"
              :pages="65"
              :range-size="1"
              active-color="#DCEDFF"
              @update:modelValue="paginateHandler"
            />
          </div>
        </div>

        <PokedexList :pokemons="pokemons" @on:click="getPokemon"></PokedexList>
      </div>

      <div class="basis-full rounded-lg bg-gray-300 shadow-2xl">
        <div v-if="!pokemon">Cargando Pokémon Inicial</div>
        <PodekexInformation
          v-else
          :pokemon="pokemon"
          :isLoadingPokedex="isLoadingPokedex"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import PokedexList from "./PokedexList.vue";
import PokedexSearch from "./PokedexSearch.vue";
import PodekexInformation from "./PodekexInformation.vue";

import { usePokemon } from "@/composables/usePokemon";

const {
  changeSearch,
  getPokemon,
  isLoading,
  isLoadingPokedex,
  page,
  paginateHandler,
  pokemon,
  pokemons,
  resetSearch,
} = usePokemon();
</script>
