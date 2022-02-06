<template>
  <div class="flex flex-col items-center justify-center">
    <div
      v-if="!pokemonActive"
      class="flex h-96 w-full flex-col items-center justify-start"
    >
      <div class="mt-16 text-center">
        <h3 class="text-2xl">Loading Pokémon Game</h3>
        <h4 class="mt-4 text-xl">Please wait</h4>
      </div>
    </div>

    <template v-else>
      <div>
        <p class="text-2xl font-medium tracking-wide text-zinc-700">
          ¿Who is that Pokemon?
        </p>
      </div>

      <div class="px-8 py-4">
        <PokemonPicture
          :imgSrc="pokemonActive.imagen"
          :showPokemon="showPokemon"
        />
      </div>

      <template v-if="message">
        <p class="text-xl font-medium text-orange-700">
          {{ message }}
        </p>
        <button
          @click="startGame"
          class="mt-2 bg-sky-600 py-1 px-2 text-sm font-medium text-slate-200 hover:bg-sky-700"
        >
          New game
        </button>
      </template>

      <div class="px-8 py-4">
        <PokemonOptions
          :pokemons="pokemonOptions"
          @on:click="pokemonSelected"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { usePokemonGame } from "@/composables/usePokemonGame";
import PokemonPicture from "@/components/Game/PokemonPicture.vue";
import PokemonOptions from "@/components/Game/PokemonOptions.vue";

const {
  message,
  pokemonActive,
  pokemonOptions,
  pokemonSelected,
  showPokemon,
  startGame,
} = usePokemonGame();
</script>
