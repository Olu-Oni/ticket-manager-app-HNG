<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../utils/auth'
import Footer from '../components/Footer.vue';


// Initialize Notyf
const notyf = new Notyf({ duration: 5000 })

// Router
const router = useRouter()

// Form state
const formData = ref({
    email: '',
    password: ''
})

const errors = ref({
    email: '',
    password: ''
})

// Handle input change + clear error
const handleChange = (field) => (e) => {
    formData.value[field] = e.target.value
    errors.value[field] = '' // Clear error on input
}

// Validation
const validate = () => {
    const newErrors = { email: '', password: '' }

    if (!formData.value.email.trim()) {
        newErrors.email = 'Email is required'
    }

    if (!formData.value.password) {
        newErrors.password = 'Password is required'
    }

    errors.value = newErrors

    return Object.values(newErrors).every(err => err === '')
}

// Submit handler
const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) {
        notyf.error('Login failed: missing email/password')
        return
    }

    const loginInfo = login(formData.value.email, formData.value.password)

    if (loginInfo.success) {
        notyf.success(loginInfo.message)

        // Reset form
        formData.value = { email: '', password: '' }
        errors.value = { email: '', password: '' }

        // Navigate after delay
        setTimeout(() => {
            router.push('/dashboard')
        }, 1500)
    } else {
        notyf.error(loginInfo.message)
    }
}

// Optional: Focus first input on mount
onMounted(() => {
    const emailInput = document.getElementById('email')
    emailInput?.focus()
})
</script>

<template>
    <main class="w-full bg-[var(--background)] place-content-center text-left grow">
        <form id="loginForm" novalidate @submit="handleSubmit"
            class="max-w-md my-4 mx-auto p-6 bg-transparent border-3 border-[var(--secondary)] rounded-xl shadow-lg">
            <h2 class="text-2xl font-bold text-center mb-6">Log In</h2>

            <div class="space-y-5 mb-6">
                <!-- Email -->
                <div class="form-group">
                    <label for="email" class="block text-sm font-medium text-[var(--primary-300)] mb-1">
                        Email <span class="text-red-500">*</span>
                    </label>
                    <input type="email" id="email" v-model="formData.email" @input="handleChange('email')" required
                        aria-describedby="error-email"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
                        :class="{
                            'border-red-500 focus:ring-red-500': errors.email,
                            'border-gray-300': !errors.email
                        }" placeholder="you@example.com" />
                    <span id="error-email" class="error text-red-500 text-sm mt-1 block min-h-5" role="alert">
                        {{ errors.email }}
                    </span>
                </div>

                <!-- Password -->
                <div class="form-group">
                    <label for="password" class="block text-sm font-medium text-[var(--primary-300)] mb-1">
                        Password <span class="text-red-500">*</span>
                    </label>
                    <input type="password" id="password" v-model="formData.password" @input="handleChange('password')"
                        required aria-describedby="error-password"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
                        :class="{
                            'border-red-500 focus:ring-red-500': errors.password,
                            'border-gray-300': !errors.password
                        }" placeholder="••••••••" />
                    <span id="error-password" class="error text-red-500 text-sm mt-1 block min-h-5" role="alert">
                        {{ errors.password }}
                    </span>
                </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="w-full btn-2">
                Log in
            </button>

            <p class="text-sm mt-4 text-center">
                Don't have an account?

                <RouterLink to="/auth/signup"> create a new account
                </RouterLink>
            </p>
        </form>
    </main>
    <Footer/>
</template>
