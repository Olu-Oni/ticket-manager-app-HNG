<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Footer from '../components/Footer.vue';

// Initialize Notyf
const notyf = new Notyf({ duration: 5000 })

// Router
const router = useRouter()

// Empty form template
const emptyForm = {
    userName: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

// Form state
const formData = ref({ ...emptyForm })
const errors = ref({ ...emptyForm })

// Handle input change + clear error
const handleChange = (field) => (e) => {
    formData.value[field] = e.target.value
    errors.value[field] = '' // Clear error on input
}

// Validation
const validate = () => {
    const newErrors = { ...emptyForm }

    // User Name
    if (!formData.value.userName.trim()) {
        newErrors.userName = 'User Name is required'
    } else if (!/^[A-Za-z0-9_-]+$/.test(formData.value.userName)) {
        newErrors.userName = 'Only letters, numbers, underscores, and hyphens allowed'
    }

    // Full Name
    if (!formData.value.fullName.trim()) {
        newErrors.fullName = 'Full Name is required'
    } else if (!/^[A-Za-z\s]+$/.test(formData.value.fullName)) {
        newErrors.fullName = 'Only letters and spaces allowed'
    }

    // Email
    if (!formData.value.email.trim()) {
        newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.value.email)) {
        newErrors.email = 'Invalid email address'
    }

    // Password
    if (!formData.value.password) {
        newErrors.password = 'Password is required'
    } else if (formData.value.password.length < 4) {
        newErrors.password = 'Password must be at least 4 characters'
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.value.password)) {
        newErrors.password = 'Password must contain a letter and a number'
    }

    // Confirm Password
    if (formData.value.confirmPassword !== formData.value.password) {
        newErrors.confirmPassword = 'Passwords do not match'
    }

    errors.value = newErrors

    return Object.values(newErrors).every(err => err === '')
}

// Submit handler
const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) {
        notyf.error('Sign-up unsuccessful!')
        return
    }

    const user = {
        id: crypto.randomUUID(),
        fullName: formData.value.fullName,
        userName: formData.value.userName,
        email: formData.value.email,
        password: formData.value.password,
        createdAt: new Date().toISOString()
    }

    // Load existing users
    const existingUsers = JSON.parse(localStorage.getItem('ticketapp_users') || '[]')

    // Check if email exists
    const emailExists = existingUsers.some(u => u.email === formData.value.email)
    if (emailExists) {
        notyf.error('Email already registered!')
        errors.value.email = 'This email is already in use'
        return
    }

    // Save new user
    existingUsers.push(user)
    localStorage.setItem('ticketapp_users', JSON.stringify(existingUsers))

    console.log('Signup successful:', user)
    notyf.success('Account created successfully!')

    // Reset form
    formData.value = { ...emptyForm }
    errors.value = { ...emptyForm }

    // Navigate after delay
    setTimeout(() => {
        router.push('/auth/login')
    }, 3000)
}
</script>

<template>
    <main class="w-full bg-[var(--background)] place-content-center text-left grow">
        <form id="signupForm" novalidate @submit="handleSubmit"
            class="max-w-md my-4 mx-auto p-6 bg-transparent border-3 border-[var(--secondary)] rounded-xl shadow-lg">
            <h2 class="text-2xl font-bold text-center mb-6">
                Create Your Account
            </h2>

            <div class="space-y-1 mb-3">
                <!-- User Name -->
                <div class="form-group">
                    <label for="userName" class="block text-sm font-medium text-[var(--primary-300)] mb-1">
                        User Name <span class="text-red-500">*</span>
                    </label>
                    <input type="text" id="userName" v-model="formData.userName" @input="handleChange('userName')"
                        pattern="[A-Za-z0-9_-]+" required aria-describedby="error-userName"
                        data-testid="test-signup-userName"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
                        :class="{
                            'border-red-500 focus:ring-red-500': errors.userName,
                            'border-gray-300': !errors.userName
                        }" placeholder="john_doe" />
                    <span id="error-userName" data-testid="test-signup-error-userName"
                        class="error text-red-500 text-sm mt-1 block min-h-5" role="alert">
                        {{ errors.userName }}
                    </span>
                </div>

                <!-- Full Name -->
                <div class="form-group">
                    <label for="fullName" class="block text-sm font-medium text-[var(--primary-300)] mb-1">
                        Full Name <span class="text-red-500">*</span>
                    </label>
                    <input type="text" id="fullName" v-model="formData.fullName" @input="handleChange('fullName')"
                        pattern="[A-Za-z\s]+" required aria-describedby="error-fullName"
                        data-testid="test-signup-fullName"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
                        :class="{
                            'border-red-500 focus:ring-red-500': errors.fullName,
                            'border-gray-300': !errors.fullName
                        }" placeholder="John Doe" />
                    <span id="error-fullName" data-testid="test-signup-error-fullName"
                        class="error text-red-500 text-sm mt-1 block min-h-5" role="alert">
                        {{ errors.fullName }}
                    </span>
                </div>

                <!-- Email -->
                <div class="form-group">
                    <label for="email" class="block text-sm font-medium text-[var(--primary-300)] mb-1">
                        Email <span class="text-red-500">*</span>
                    </label>
                    <input type="email" id="email" v-model="formData.email" @input="handleChange('email')" required
                        aria-describedby="error-email" data-testid="test-signup-email"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
                        :class="{
                            'border-red-500 focus:ring-red-500': errors.email,
                            'border-gray-300': !errors.email
                        }" placeholder="you@example.com" />
                    <span id="error-email" data-testid="test-signup-error-email"
                        class="error text-red-500 text-sm mt-1 block min-h-5" role="alert">
                        {{ errors.email }}
                    </span>
                </div>

                <!-- Password -->
                <div class="form-group">
                    <label for="password" class="block text-sm font-medium text-[var(--primary-300)] mb-1">
                        Password <span class="text-red-500">*</span>
                    </label>
                    <input type="password" id="password" v-model="formData.password" @input="handleChange('password')"
                        required aria-describedby="error-password" data-testid="test-signup-password"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
                        :class="{
                            'border-red-500 focus:ring-red-500': errors.password,
                            'border-gray-300': !errors.password
                        }" placeholder="••••" />
                    <span id="error-password" data-testid="test-signup-error-password"
                        class="error text-red-500 text-sm mt-1 block min-h-5" role="alert">
                        {{ errors.password }}
                    </span>
                </div>

                <!-- Confirm Password -->
                <div class="form-group">
                    <label for="confirmPassword" class="block text-sm font-medium text-[var(--primary-300)] mb-1">
                        Confirm Password <span class="text-red-500">*</span>
                    </label>
                    <input type="password" id="confirmPassword" v-model="formData.confirmPassword"
                        @input="handleChange('confirmPassword')" required aria-describedby="error-confirmPassword"
                        data-testid="test-signup-confirm-password"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
                        :class="{
                            'border-red-500 focus:ring-red-500': errors.confirmPassword,
                            'border-gray-300': !errors.confirmPassword
                        }" placeholder="••••" />
                    <span id="error-confirmPassword" data-testid="test-signup-error-confirm-password"
                        class="error text-red-500 text-sm mt-1 block min-h-5" role="alert">
                        {{ errors.confirmPassword }}
                    </span>
                </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" data-testid="test-signup-submit" class="w-full btn-2">
                Create Account
            </button>

            <p class="text-sm mt-4 text-center">
                Already have an account?

                <RouterLink to="/auth/login"> Sign in
                </RouterLink>
            </p>
        </form>
    </main>
    <Footer />
</template>
