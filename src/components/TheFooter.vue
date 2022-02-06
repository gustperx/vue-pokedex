<template>
  <footer class="bottom-0 flex justify-center bg-gray-800 px-4 text-gray-100">
    <div class="container py-6">
      <hr class="mt-6 h-px border-none bg-gray-700" />

      <div class="mt-6 flex flex-col items-center justify-between md:flex-row">
        <div>
          <a
            href="https://gustperx.com"
            target="_blank"
            class="text-xl font-bold"
            >Gustperx</a
          >
        </div>
        <div class="mt-4 flex md:m-0">
          <div class="-mx-4">
            <RouterLink
              v-for="footerLink in footerLinks"
              :key="footerLink.to"
              class="px-4 text-sm"
              :to="{ name: footerLink.to }"
              >{{ footerLink.name }}</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { footerLinks } from "@/router/global-routes";
</script>
