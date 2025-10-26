<script setup>
import { ref, onMounted } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue';
import { getSession } from '../utils/auth.js'


// Notyf instance with custom type
const notyf = new Notyf({
  duration: 5000,
  types: [
    {
      type: 'info',
      background: 'blue',
      icon: false,
    },
  ],
})

// Reactive state
const user = ref(null)
const tickets = ref([])
const showModal = ref(false)
const editingTicket = ref(null)

const formData = ref({
  title: '',
  description: '',
  status: 'open',
  priority: 'medium'
})

const errors = ref({
  title: '',
  status: '',
  description: ''
})

// Load user & tickets on mount
onMounted(() => {
  notyf.open({ type: 'info', message: 'loading tickets ...' })

  const session = getSession()
  if (session) {
    user.value = {
      name: session.userName || session.email.split('@')[0],
      email: session.email
    }
  }

  loadTickets()
})

const loadTickets = () => {
  const storedTickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]')
  tickets.value = storedTickets
  notyf.success('load Successful')
}

// Modal: Open Create
const openCreateModal = () => {
  editingTicket.value = null
  formData.value = { title: '', description: '', status: 'open', priority: 'medium' }
  errors.value = { title: '', status: '', description: '' }
  showModal.value = true
}

// Modal: Open Edit
const openEditModal = (ticket) => {
  editingTicket.value = ticket
  formData.value = {
    title: ticket.title,
    description: ticket.description || '',
    status: ticket.status,
    priority: ticket.priority || 'medium'
  }
  errors.value = { title: '', status: '', description: '' }
  showModal.value = true
}

// Modal: Close
const closeModal = () => {
  showModal.value = false
  editingTicket.value = null
  formData.value = { title: '', description: '', status: 'open', priority: 'medium' }
  errors.value = { title: '', status: '', description: '' }
}

// Handle input
const handleChange = (e) => {
  const { name, value } = e.target
  formData.value[name] = value
  errors.value[name] = ''
}

// Validation
const validate = () => {
  const newErrors = { title: '', status: '', description: '' }

  if (!formData.value.title.trim()) {
    newErrors.title = 'Title is required'
  }

  const validStatuses = ['open', 'in_progress', 'closed']
  if (!formData.value.status || !validStatuses.includes(formData.value.status)) {
    newErrors.status = 'Valid status is required'
  }

  if (formData.value.description && formData.value.description.length < 3) {
    newErrors.description = 'description must be more than 3 characters'
  }

  errors.value = newErrors
  return Object.values(newErrors).every(err => err === '')
}

// Submit (Create or Update)
const handleSubmit = (e) => {
  e.preventDefault()
  if (!validate()) {
    notyf.error('Failed to make changes')
    return
  }

  if (editingTicket.value) {
    // Update existing
    const updatedTickets = tickets.value.map(t =>
      t.id === editingTicket.value.id
        ? { ...t, ...formData.value, updatedAt: new Date().toISOString() }
        : t
    )
    tickets.value = updatedTickets
    localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets))
    notyf.success('Successfully <b>changed</b> ticket')
  } else {
    // Create new
    const newTicket = {
      id: crypto.randomUUID(),
      ...formData.value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    const updatedTickets = [...tickets.value, newTicket]
    tickets.value = updatedTickets
    localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets))
    notyf.success('Successfully <b>added</b> new ticket')
  }

  closeModal()
}

// Delete ticket
const handleDelete = (ticketId) => {
  if (confirm('Are you sure you want to delete this ticket?')) {
    const updatedTickets = tickets.value.filter(t => t.id !== ticketId)
    tickets.value = updatedTickets
    localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets))
    notyf.success('Successfully removed ticket')
  }
}

// Status & Priority Styling
const getStatusColor = (status) => {
  switch (status) {
    case 'open': return 'bg-green-100 text-green-800 border-green-300'
    case 'in_progress': return 'bg-amber-100 text-amber-800 border-amber-300'
    case 'closed': return 'bg-gray-100 text-gray-800 border-gray-300'
    default: return 'bg-gray-100 text-gray-800 border-gray-300'
  }
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'text-red-600'
    case 'medium': return 'text-amber-600'
    case 'low': return 'text-green-600'
    default: return 'text-gray-600'
  }
}
</script>

<template>
  <Header :user="user" page="Ticket Management" />

  <main class="mx-[5%] py-4 pb-12">
    <!-- Header: Total + Create Button -->
    <div class="flex justify-between items-center mb-6 p-1.5">
      <div class="sm:flex-1 sm:ml-50 flex gap-2 place-content-center">
        <h3 class="w-fit py-1 max-sm:hidden">Total:</h3>
        <span class="text-[var(--background)] backdrop-brightness-90 font-bold rounded-2xl px-2 mt-1 text-nowrap place-content-center h-fit py-1">
          {{ tickets.length }} tickets
        </span>
      </div>
      <button
        @click="openCreateModal"
        class="btn-1 flex items-center gap-2 hover:outline-2 outline-[var(--background)]"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Create <span class="max-sm:hidden"> New Ticket</span>
      </button>
    </div>

    <!-- Empty State -->
    <div v-if="tickets.length === 0" class="bg-[var(--background)] rounded-2xl p-12 text-center shadow-lg">
      <svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="mb-2">No tickets yet</h3>
      <p class="mb-6">Create your first ticket to get started</p>
      <button @click="openCreateModal" class="btn-1">Create Ticket</button>
    </div>

    <!-- Ticket Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-3">
      <div
        v-for="ticket in tickets"
        :key="ticket.id"
        class="bg-[var(--background)] rounded-2xl p-6 shadow-md hover:shadow-lg transition flex flex-col"
      >
        <div class="flex items-center justify-between mb-4">
          <span
            :class="['px-3 py-1 rounded-full text-xs font-semibold border', getStatusColor(ticket.status)]"
          >
            {{ ticket.status.replace('_', ' ').toUpperCase() }}
          </span>
          <span :class="['text-xs font-semibold', getPriorityColor(ticket.priority)]">
            {{ (ticket.priority || 'medium').toUpperCase() }}
          </span>
        </div>

        <h3 class="text-lg font-bold text-gray-800 mb-2 line-clamp-2 grow">
          {{ ticket.title }}
        </h3>

        <p v-if="ticket.description" class="text-sm text-gray-600 mb-4 line-clamp-3">
          {{ ticket.description }}
        </p>

        <div class="flex gap-2">
          <button
            @click="openEditModal(ticket)"
            class="flex-1 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition text-sm font-medium"
          >
            Edit
          </button>
          <button
            @click="handleDelete(ticket.id)"
            class="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </main>
  <Footer/>

  <!-- Modal -->
  <teleport to="body">
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      @click="closeModal"
    >
      <div
        class="bg-[var(--background)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-left"
        @click.stop
      >
        <form @submit.prevent="handleSubmit" novalidate class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-2xl font-bold text-gray-800">
              {{ editingTicket ? 'Edit Ticket' : 'Create New Ticket' }}
            </h3>
            <button
              @click="closeModal"
              type="button"
              class="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div class="space-y-5">
            <!-- Title -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Title <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                v-model="formData.title"
                @input="handleChange"
                :class="['w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2', errors.title ? 'border-red-500' : 'border-gray-300']"
                placeholder="Enter ticket title"
              />
              <span v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</span>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                v-model="formData.description"
                @input="handleChange"
                rows="2"
                :class="['w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2', errors.description ? 'border-red-500' : 'border-gray-300']"
                placeholder="Enter ticket description (optional)"
              />
              <span v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</span>
            </div>

            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Status <span class="text-red-500">*</span>
              </label>
              <select
                name="status"
                v-model="formData.status"
                @change="handleChange"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <!-- Priority -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                name="priority"
                v-model="formData.priority"
                @change="handleChange"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <!-- Buttons -->
            <div class="flex gap-3 pt-2">
              <button
                type="button"
                @click="closeModal"
                class="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="flex-1 btn-1"
              >
                {{ editingTicket ? 'Update' : 'Create' }}
                <span class="max-sm:hidden"> Ticket</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>