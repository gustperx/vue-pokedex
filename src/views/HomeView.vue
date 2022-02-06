<script setup lang="ts">
import ThePokemonLayout from "@/components/ThePokemonLayout.vue";
</script>

<template>
  <ThePokemonLayout>
    <template #header>
      <h1 class="text-3xl font-bold text-gray-900">Welcome</h1>
    </template>

    <template #content>
      <div class="text-zinc-700">
        <p class="text-xl font-medium">
          Esta es una aplicación construida con fines educativos utilizando Vue
          3 y herramientas del ecosistema de Vue junto a la API de Pokeapi.co
        </p>
        <p class="mt-4 text-xl font-medium">Herramientas utilizadas:</p>
        <div class="text-md mt-4 font-medium">
          <ul>
            <li>
              - Vue 3 con la
              <a
                class="text-teal-800"
                href="https://v3.vuejs.org/api/sfc-script-setup.html"
                target="_blank"
                >nueva sintaxis recomendada</a
              >
            </li>
            <li>- TypeScript</li>
            <li>
              -
              <a
                href="https://next.router.vuejs.org/"
                class="text-teal-800"
                target="_blank"
                >Vue Router 4</a
              >
            </li>
            <li>
              -
              <a
                href="https://pinia.vuejs.org/"
                class="text-teal-800"
                target="_blank"
                >Pinia</a
              >
              para manejar el estado (Si conoces Vuex Pinia es muy similar)
            </li>
            <li>- Axios</li>
            <li>
              -
              <a
                href="https://tailwindcss.com/"
                class="text-teal-800"
                target="_blank"
                >Tailwindcss</a
              >
            </li>
          </ul>
        </div>
        <p class="mt-4 text-xl font-medium">API:</p>
        <p class="text-md mt-4 font-medium">
          <a href="https://pokeapi.co/" class="text-teal-800" target="_blank"
            >Pokeapi.co</a
          >
        </p>
        <p class="mt-4 text-xl font-medium text-orange-700">
          ¿Te interesa aprender o actualizar tus conocimientos de Vue?
        </p>
        <p class="text-md mt-4 font-medium">
          Te recomiendo el curso de Vue 3 de
          <a
            href="https://fernando-herrera.com/"
            target="_blank"
            class="text-teal-800"
            >Fernando Herrera</a
          >, es de los mejores cursos de Vue y en Español, dejaré el enlace a su
          sitio web en donde puedes obtener descuentos en sus cursos.
        </p>
        <p class="text-md mt-4 font-medium">
          <a
            href="https://fernando-herrera.com/"
            target="_blank"
            class="text-teal-800"
            >https://fernando-herrera.com</a
          >
        </p>
      </div>
    </template>
  </ThePokemonLayout>
</template>
