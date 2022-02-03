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

        <PokedexList :pokemons="pokemons"></PokedexList>
      </div>

      <div class="basis-full bg-red-200">
        <h3>Details</h3>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import PokedexList from "./PokedexList.vue";
import PokedexSearch from "./PokedexSearch.vue";
import { usePokemon } from "@/composables/usePokemon";

const {
  changeSearch,
  isLoading,
  page,
  paginateHandler,
  pokemon,
  pokemons,
  resetSearch,
} = usePokemon();

pokemon(15);
</script>
