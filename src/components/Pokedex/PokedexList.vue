<template>
  <div class="relative overflow-auto rounded-xl p-2">
    <div
      class="relative mx-auto flex h-96 max-w-sm flex-col divide-y overflow-y-auto rounded-xl bg-white shadow-lg ring-1 ring-black/5"
    >
      <div
        class="flex items-center gap-4 p-4"
        v-for="pokemon in pokemons"
        :key="pokemon.id"
      >
        <img class="h-20 w-20 rounded-full" :src="pokemon.imagen" />
        <div class="flex flex-col">
          <strong class="text-lg font-medium text-slate-900">{{
            pokemon.name
          }}</strong>
          <span class="text-lg font-medium text-slate-500">{{
            pokemon.name
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PokemonList } from "@/interfaces/pokemon";

defineProps<{
  pokemons: PokemonList[];
}>();
</script>
