<template>
  <div class="vld-parent flex flex-col md:flex-row">
    <loading
      :active="isLoading"
      loader="dots"
      color="#075985"
      :opacity="0.3"
      :height="128"
      :width="128"
      :can-cancel="false"
      :is-full-page="false"
    />

    <div
      v-if="isLoading"
      class="flex h-96 w-full flex-col items-center justify-start"
    >
      <div class="mt-16 text-center">
        <h3 class="text-2xl">Loading Pokemon list</h3>
        <h4 class="mt-4 text-xl">Please wait</h4>
      </div>
    </div>

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

      <div class="vld-parent basis-full rounded-lg bg-gray-300 shadow-2xl">
        <loading
          :active="!pokemon"
          loader="dots"
          color="#075985"
          :opacity="0.3"
          :height="128"
          :width="128"
          :can-cancel="false"
          :is-full-page="false"
        />

        <div
          v-if="!pokemon"
          class="flex h-96 w-full flex-col items-center justify-start"
        >
          <div class="mt-16 text-center">
            <h3 class="text-2xl">Loading Starter Pokémon</h3>
            <h4 class="mt-4 text-xl">Please wait</h4>
          </div>
        </div>
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

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

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
