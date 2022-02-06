<template>
  <div class="relative overflow-auto rounded-xl p-2">
    <div
      class="w-sm relative mx-auto flex h-96 max-w-sm cursor-pointer flex-col divide-y overflow-y-auto rounded-xl bg-white shadow-lg ring-1 ring-black/5"
    >
      <template v-for="pokemon in pokemons" :key="pokemon.id">
        <div
          class="flex items-center gap-4 p-4"
          @click="showPokemon(pokemon.id)"
        >
          <img
            class="h-20 w-20 rounded-sm"
            :src="pokemon.imagen"
            loading="lazy"
          />
          <div class="flex flex-col">
            <strong class="text-lg font-medium text-slate-900">{{
              pokemon.name
            }}</strong>
            <span class="text-lg font-medium text-slate-500">{{
              pokemon.name
            }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PokemonList } from "@/interfaces/pokemon";

defineProps<{
  pokemons: PokemonList[];
}>();

const emit = defineEmits<{
  (e: "on:click", pokemonId: number): void;
}>();

const showPokemon = (pokemonId: number) => {
  emit("on:click", pokemonId);
};
</script>
