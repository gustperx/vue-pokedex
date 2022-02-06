<template>
  <div class="vld-parent">
    <loading
      :active="isLoadingPokedex"
      loader="dots"
      color="#075985"
      :opacity="0.3"
      :height="128"
      :width="128"
      :can-cancel="false"
      :is-full-page="false"
    />

    <div
      v-if="isLoadingPokedex"
      class="relative flex h-[31rem] w-full flex-col items-center justify-start"
    >
      <div class="mt-16 text-center">
        <h3 class="text-2xl">Loading Pokémon</h3>
        <h4 class="mt-4 text-xl">Please wait</h4>
      </div>
    </div>

    <template v-else>
      <div class="m-4 flex h-48 shadow-md">
        <div class="basis-4/5 bg-gray-100">
          <p
            class="mt-2 flex justify-center text-2xl font-semibold text-zinc-700"
          >
            {{ pokemon.name }}
          </p>
          <p class="flex justify-center font-semibold text-zinc-700">
            {{ pokemon.species.genera[0] }}
          </p>
          <p class="flex justify-center font-semibold text-zinc-700">
            Legendary: {{ pokemon.species.is_legendary ? "Yes" : "No" }}
          </p>
          <p class="flex justify-center font-semibold text-red-500">
            {{ pokemon.species.generation }}
          </p>
          <div class="flex justify-center py-2">
            <span
              v-for="typeColor in pokemonColorTypes([...pokemon.types])"
              :key="typeColor.name"
              class="mr-1 rounded py-1 px-2 align-middle text-sm font-medium tracking-wide text-slate-50"
              :class="[typeColor.color]"
              >{{ typeColor.name }}</span
            >
          </div>
          <div class="flex justify-center">
            <PokedexTag
              :text="decimetroToMetros(pokemon.height)"
              svgCode="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"
            />
            <PokedexTag
              :text="hectogramToKilos(pokemon.weight)"
              svgCode="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z"
            />
            <PokedexTag
              :text="pokemon.base_experience"
              svgCode="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </div>
        </div>

        <div class="basis-1/5 bg-gray-100">
          <div class="flex justify-center">
            <img
              loading="lazy"
              class="mt-0 mr-8 h-32 w-32 md:mr-12 lg:mt-4 lg:mr-24"
              :src="pokemon.imagen"
              :alt="pokemon.name"
            />
          </div>
        </div>
      </div>
      <div class="m-4 flex">
        <p class="text-md font-semibold text-cyan-800">Description</p>
      </div>
      <div class="m-4 flex">
        <p class="text-sm">
          {{ randomText(pokemon.species.flavor_text_entries) }}
        </p>
      </div>
      <div class="m-4 flex">
        <p class="text-md font-semibold text-cyan-800">Stats</p>
      </div>
      <div class="m-4 flex justify-center">
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
          <div
            v-for="(stat, idx) in pokemon.stats"
            :key="idx"
            class="shadow-xs flex items-center rounded-lg bg-zinc-100 p-4"
          >
            <div class="mr-4 rounded-full bg-neutral-300 p-3 text-cyan-800">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path :d="pokemonIconStat[idx].icon"></path>
              </svg>
            </div>
            <div>
              <p class="mb-2 text-sm font-semibold text-red-900">
                {{ stat.name }}
              </p>
              <p class="text-md font-semibold text-green-700">
                {{ stat.base_start }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="m-4 flex">
        <p class="text-md font-semibold text-cyan-800">Evolutions</p>
      </div>
      <div class="m-4 flex justify-evenly">
        <template
          v-for="evolution in processEvolutions(pokemon.evolution_chain)"
          :key="evolution.id"
        >
          <div class="">
            <img
              loading="lazy"
              class="h-20 w-20 md:h-32 md:w-32"
              :src="evolution.imagen"
              :alt="evolution.name"
            />
            <p class="flex justify-center pt-4 font-semibold text-orange-700">
              {{ evolution.name }}
            </p>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import { PokemonPokedex } from "@/interfaces/pokemon";
import PokedexTag from "./PokedexTag.vue";

import {
  pokemonIconStat,
  randomText,
  processEvolutions,
  pokemonColorTypes,
  decimetroToMetros,
  hectogramToKilos,
} from "@/helpers/pokemonDetails";

defineProps<{
  isLoadingPokedex: boolean;
  pokemon: PokemonPokedex;
}>();
</script>
