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
            <NavLink
              v-for="footerLink in footerLinks"
              :key="footerLink.to"
              :to="footerLink.to"
              :name="footerLink.name"
            />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { footerLinks } from "@/router/global-routes";
import NavLink from "./NavLink.vue";
</script>
