<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { logout } from '../utils/auth.js'

// Props
defineProps({
  user: { type: Object, default: null },
  page: { type: String, default: '' }
})

// Router
const router = useRouter()

// Mobile menu state
const isMenuOpen = ref(false)

// Notyf instance
const notyf = new Notyf({ duration: 5000 })

// Toggle mobile menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Close menu on navigation (mobile)
const closeMenu = () => {
  isMenuOpen.value = false
}

// Handle logout
const handleLogout = () => {
  if (logout(router)) {
    notyf.success('Logged out successfully')
  } else {
    notyf.error('Logout canceled or failed')
  }
  closeMenu()
}
</script>

<template>
  <header class="bg-white shadow-md">
    <div class="mx-auto px-6 py-2.5 flex justify-between items-center">
      <!-- Logo + Page Title -->
      <div class="flex max-md:grow md:flex-col items-center gap-x-4">
        <h2 class="text-xl font-bold">TicketsPlease</h2>
        <h4
          class="border-b-2 text-xs rounded-2xl px-3 py-0.5 mt-0.5 max-md:mx-auto"
        >
          {{ page }}
        </h4>
      </div>

      <!-- Hamburger Button (Mobile) -->
      <button
        @click="toggleMenu"
        class="md:hidden focus:outline-none"
        aria-label="Toggle navigation menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'"
          />
        </svg>
      </button>

      <!-- Navigation Menu -->
      <nav
        :class="[
          'md:flex md:flex-row flex-col items-end md:items-center grow gap-4',
          'absolute md:static top-14 right-2 rounded-2xl max-md:border-2 border-[var(--primary-light)]',
          'bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 z-10 max-md:w-fit',
          { 'flex': isMenuOpen, 'hidden': !isMenuOpen }
        ]"
      >
        <span class="flex max-md:flex-col gap-4 grow place-content-center md:ml-20">
          <!-- Dashboard Link -->
          <router-link
            to="/dashboard"
            @click="closeMenu"
            class="block"
            :class="$route.path === '/dashboard' ? 'font-bold border-b-2 border-blue-600' : ''"
          >
            Dashboard
          </router-link>

          <!-- Tickets Link -->
          <router-link
            to="/tickets"
            @click="closeMenu"
            class="block"
            :class="$route.path === '/tickets' ? 'font-bold border-b-2 border-blue-600' : ''"
          >
            Tickets
          </router-link>
        </span>

        <!-- User Info (Hidden on mobile) -->
        <div class="text-right hidden sm:block max-md:-order-1">
          <p class="text-sm font-medium text-gray-800">
            {{ user?.name || 'User' }}
          </p>
          <p class="text-xs text-gray-500">{{ user?.email }}</p>
        </div>

        <!-- Logout Button -->
        <button
          @click="handleLogout"
          class="px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span class="hidden sm:inline">Logout</span>
        </button>
      </nav>
    </div>
  </header>
</template>