<template>
  <ul>
    <li
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      @click="showPokemon(pokemon.id)"
      class="mb-2 w-56 cursor-pointer rounded-2xl bg-slate-600 py-1 text-center font-medium capitalize text-gray-100 hover:bg-slate-800 hover:text-slate-100"
    >
      {{ pokemon.name }}
    </li>
  </ul>
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
