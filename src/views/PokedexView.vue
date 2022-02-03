<script lang="ts" setup>
import ThePokemonLayout from "@/components/ThePokemonLayout.vue";
import PokedexBase from "@/components/Pokedex/PokedexBase.vue";
</script>

<template>
  <ThePokemonLayout>
    <template #header>
      <h1 class="text-3xl font-bold text-gray-900">Pokedex</h1>
    </template>

    <template #content>
      <PokedexBase />
    </template>
  </ThePokemonLayout>
</template>
