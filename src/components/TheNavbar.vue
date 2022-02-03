<template>
  <nav class="bg-sky-700">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-sky-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            @click="openMenuMobile"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                v-if="isActiveMenuMobile"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />

              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex flex-shrink-0 items-center">
            <img
              class="block h-8 w-auto lg:hidden"
              src="@/assets/logo.svg"
              alt="vue"
            />
            <img
              class="hidden h-8 w-auto lg:block"
              src="@/assets/logo.svg"
              alt="vue"
            />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <NavLink
                v-for="headerLink in headerLinks"
                :to="headerLink.to"
                :name="headerLink.name"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div v-if="isActiveMenuMobile" id="mobile-menu" class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <NavLinkResponsive
          v-for="headerLink in headerLinks"
          :to="headerLink.to"
          :name="headerLink.name"
        />
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import NavLink from "./NavLink.vue";
import NavLinkResponsive from "./NavLinkResponsive.vue";
import { headerLinks } from "@/router/global-routes";

const isActiveMenuMobile = ref(false);

const openMenuMobile = () => {
  isActiveMenuMobile.value = !isActiveMenuMobile.value;
};
</script>
