<script setup>
  import { ref } from 'vue'

  const mobileMenuIsOpen = ref(false);
  let pages = [
    { name: 'Home', href: '/' },
    { name: 'Eradøx', href: 'https://paradoxguild.github.io' }
  ];

  function toggleMenu() {
    mobileMenuIsOpen.value = !mobileMenuIsOpen.value;
  }

  defineProps({
    page: String
  });
</script>

<template>
  <nav aria-label="penguin ui menu" class="w-full px-4 py-2">
    <div class="w-full max-w-[1000px] flex items-center justify-between mx-auto">
      <!-- Brand Logo -->
      <a href="/" class="text-2xl font-bold text-gray-950 dark:text-gray-100">
        <img src="/src/assets/images/freshadox-transparent.png" alt="Paradøx Logo" class="w-10 mr-1 inline" />
        <span>Para<span class="text-primary">døx</span></span>
      </a>
      <!-- Desktop Menu -->
      <ul class="hidden items-center gap-4 md:flex">
        <li v-for="pageItem of pages">
          <a :href="pageItem.href" class="nav-link-desktop" :class="page === pageItem.name ? 'current-page' : null"
              :aria-current="page === pageItem.name ? 'page' : null">{{ pageItem.name }}</a>
        </li>
      </ul>
    </div>
    <!-- Mobile Menu Button -->
    <button @click="toggleMenu" :aria-expanded="mobileMenuIsOpen"
      :class="mobileMenuIsOpen ? 'fixed top-6 right-6 z-20' : null" type="button" class="mobile-menu"
      aria-label="mobile menu" aria-controls="mobile-menu">
      <svg v-if="!mobileMenuIsOpen" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true"
        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
      <svg v-if="mobileMenuIsOpen" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true"
        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
    <!-- Mobile Menu -->
    <Transition name="slide-from-top">
      <ul id="mobile-menu" v-if="mobileMenuIsOpen">
        <li v-for="pageItem of pages" class="py-4">
          <a :href="pageItem.href" class="nav-link-mobile" :class="page === pageItem.name ? 'current-page' : null"
              :aria-current="page === pageItem.name ? 'page' : null">{{ pageItem.name }}</a>
        </li>
      </ul>
    </Transition>
  </nav>
</template>

<style scoped>
  nav {
    @apply flex items-center justify-between bg-light border-b border-medium px-6 py-4 dark:border-medium dark:bg-dark;
  }
  .nav-link-desktop {
    @apply font-medium text-dark-gray underline-offset-2 hover:text-primary-light focus:outline-none focus:underline dark:text-light dark:hover:text-primary;
  }
  .nav-link-desktop.current-page {
    @apply font-bold text-primary-light underline-offset-2 hover:text-primary-light focus:outline-none focus:underline dark:text-primary dark:hover:text-primary;
  }
  .mobile-menu {
    @apply flex text-dark-gray dark:text-light md:hidden;
  }
  .nav-link-mobile {
    @apply w-full text-lg font-medium text-dark-gray focus:underline dark:text-light hover:text-primary-light dark:hover:text-primary;
  }
  .nav-link-mobile.current-page {
    @apply w-full text-lg font-bold text-primary-light focus:underline dark:text-primary;
  }
  #mobile-menu {
    @apply fixed max-h-svh overflow-y-auto inset-x-0 top-0 z-10 flex flex-col divide-y divide-medium rounded-b-md border-b border-medium bg-light px-6 pb-6 pt-20 dark:divide-medium dark:border-medium dark:bg-darkish md:hidden;
  }

  .slide-from-top-enter-active,
  .slide-from-top-leave-active {
    transition: all 0.3s ease-in-out;
  }

  .slide-from-top-enter-from,
  .slide-from-top-leave-to {
    transform: translateY(-100%);
    opacity: 0;
  }
</style>