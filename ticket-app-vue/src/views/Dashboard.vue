<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue';

import { getSession } from '../utils/auth'

const router = useRouter()

// Reactive state
const user = ref(null)
const stats = ref({
  total: 0,
  open: 0,
  in_progress: 0,
  closed: 0
})

// Load data on mount
onMounted(() => {
  const session = getSession()
  if (session) {
    user.value = {
      name: session.userName || session.email.split('@')[0],
      email: session.email
    }
  }

  // Load tickets from localStorage
  const tickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]')
  
  stats.value = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    in_progress: tickets.filter(t => t.status === 'in_progress').length,
    closed: tickets.filter(t => t.status === 'closed').length
  }
})

// Navigate to tickets page
const goToTickets = () => {
  router.push('/tickets')
}
</script>

<template>
  <!-- Header with Logout -->
  <Header :user="user" page="Dashboard" />

  <!-- Main Dashboard Content -->
  <main class="mx-[5%] py-8 flex flex-col">
    <!-- Welcome Section -->
    <section class="mb-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-2">
        Welcome back, {{ user?.name || 'User' }}!
      </h2>
      <p>Here's an overview of your ticket management system</p>
    </section>

    <!-- Statistics Section -->
    <section class="grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 pb-6 text-nowrap">
      <!-- Total Tickets -->
      <div class="bg-[var(--background)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
        <div class="flex items-center justify-between">
          <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span class="text-3xl font-bold text-indigo-600">{{ stats.total }}</span>
        </div>
        <h3 class="relative -top-1">Total Tickets</h3>
        <p>All tickets in system</p>
      </div>

      <!-- Open Tickets -->
      <div class="bg-[var(--background)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
        <div class="flex items-center justify-between">
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="text-3xl font-bold text-green-600">{{ stats.open }}</span>
        </div>
        <h3 class="relative -top-1">Open Tickets</h3>
        <p>Ready to be worked on</p>
      </div>

      <!-- In Progress Tickets -->
      <div class="bg-[var(--background)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
        <div class="flex items-center justify-between">
          <div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="text-3xl font-bold text-amber-600">{{ stats.in_progress }}</span>
        </div>
        <h3 class="relative -top-1">In Progress</h3>
        <p>Currently being worked on</p>
      </div>

      <!-- Closed Tickets -->
      <div class="bg-[var(--background)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
        <div class="flex items-center justify-between">
          <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span class="text-3xl font-bold text-gray-600">{{ stats.closed }}</span>
        </div>
        <h3 class="relative -top-1">Closed Tickets</h3>
        <p class="text-sm text-gray-500 mt-1">Completed and resolved</p>
      </div>
    </section>

    <!-- Info Section -->
    <section class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
      <div class="flex place-items-center gap-4">
        <a
          @click.prevent="goToTickets"
          class="flex gap-4 items-center mx-auto cursor-pointer text-indigo-700 font-medium hover:text-indigo-900 transition"
        >
          Go to Ticket Management
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  </main>
  <Footer/>
</template>