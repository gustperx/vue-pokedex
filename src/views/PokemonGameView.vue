<script lang="ts" setup>
import ThePokemonLayout from "@/components/ThePokemonLayout.vue";
import PokemonBase from "@/components/Game/PokemonBase.vue";
</script>

<template>
  <ThePokemonLayout>
    <template #header>
      <h1 class="text-3xl font-bold text-gray-900">Pokémon Game</h1>
    </template>

    <template #content>
      <PokemonBase />
    </template>
  </ThePokemonLayout>
</template>
