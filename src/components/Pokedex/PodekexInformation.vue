<template>
  <div v-if="isLoadingPokedex">Recuperando Data</div>

  <template v-else>
    <div class="m-4 flex h-40 shadow-md">
      <div class="basis-3/5 bg-gray-100">
        <p class="flex justify-center text-2xl font-semibold text-zinc-700">
          {{ pokemon.name }}
        </p>
        <p class="flex justify-center font-semibold text-zinc-700">
          {{ pokemon.species.genera[0] }}
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
          <span
            class="mr-1 rounded bg-stone-500 py-1 px-2 align-middle text-sm font-medium tracking-wide text-slate-50"
          >
            Height: {{ pokemon.height }}
          </span>
          <span
            class="mr-1 rounded bg-stone-500 py-1 px-2 align-middle text-sm font-medium tracking-wide text-slate-50"
          >
            Weight:
            {{ pokemon.weight }}
          </span>
          <span
            class="mr-1 rounded bg-stone-500 py-1 px-2 align-middle text-sm font-medium tracking-wide text-slate-50"
          >
            Experience:
            {{ pokemon.base_experience }}
          </span>
        </div>
      </div>
      <div class="basis-2/5 bg-slate-700">
        <div class="flex justify-center">
          <img
            class="mt-4 h-32 w-32"
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
      <div class="grid grid-cols-3 gap-4">
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
            class="h-28 w-28"
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
</template>

<script lang="ts" setup>
import { pokemonIconStat, pokemonTypes } from "@/helpers/pokemonDetails";
import { planeEvolutionChain } from "@/helpers/pokemonHelper";
import {
  ChainModel,
  PlainEvolutionChain,
  PokemonPokedex,
} from "@/interfaces/pokemon";

defineProps<{
  isLoadingPokedex: boolean;
  pokemon: PokemonPokedex;
}>();

interface ColorTypes {
  name: string;
  color: string;
}

const pokemonColorTypes = (types: string[]) => {
  const colors = types.map((type): ColorTypes => {
    return (
      pokemonTypes.find((color) => color.name == type) || {
        name: type,
        color: "bg-gray-400",
      }
    );
  });
  return colors;
};

const randomText = (flavor_text_entries: string[]): string => {
  const idx = Math.floor(Math.random() * (flavor_text_entries.length - 1));
  return flavor_text_entries[idx];
};

const processEvolutions = (
  evolutions: ChainModel | null
): PlainEvolutionChain[] => {
  if (!evolutions) return [];
  return planeEvolutionChain(evolutions);
};
</script>
