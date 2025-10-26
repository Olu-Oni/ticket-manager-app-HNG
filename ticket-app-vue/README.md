# Ticket Management App - Vue.js Version

A modern, responsive ticket management system built with Vue 3, Vite, and Tailwind CSS. This is part of a multi-framework implementation showcasing the same application across React, Vue.js, and Vanilla JavaScript.

## 🚀 Live Demo

[View Live Demo](https://tickets-please-vue.netlify.app/)

## 🔗 Related Implementations

- [React Version](../ticket-app-react)
- [Twig Version](../ticket-app-twig)
- [Shared Assets](../shared-assets)

## 📦 Tech Stack

- **Framework:** Vue ^3.5.13
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** Vue Router
- **State Management:** Vue Reactivity (ref, reactive)
- **Script Style:** `<script setup>` syntax

## ✨ Features

- 🎨 Modern, responsive landing page with wavy hero section
- 🔐 Complete authentication system (Login/Signup)
- 📊 Dashboard with ticket statistics
- ✏️ Full CRUD operations for ticket management
- ✅ Form validation with inline error messages
- 🎯 Status-based ticket filtering (Open, In Progress, Closed)
- 🔒 Protected routes with authentication guards
- 📱 Mobile-first responsive design
- ♿ Accessibility compliant (ARIA labels, semantic HTML)

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone or navigate to the project:**
   ```bash
   cd ticket-app-vue
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   ```
   http://localhost:5173
   ```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 👤 Test Credentials

Use these credentials to test the application:

- **Email:** demo@test.com
- **Password:** password123

Alternatively, create a new account through the signup page.

## 📁 Project Structure

```
ticket-app-vue/
├── public/
│   └── assets/           # Shared assets (SVGs, images)
├── src/
│   ├── views/            # Page components
│   │   ├── Landing.vue
│   │   ├── Login.vue
│   │   ├── Signup.vue
│   │   ├── Dashboard.vue
│   │   └── Tickets.vue
│   ├── components/       # Reusable components
│   │   ├── Layout.vue
│   │   └── Header.vue
│   ├── router/           # Router configuration
│   │   └── index.js
│   ├── utils/            # Utility functions
│   │   └── auth.js       # Authentication logic
│   ├── App.vue           # Root component
│   ├── main.js           # Entry point
│   └── style.css         # Global styles
├── tailwind.config.js    # Tailwind configuration
└── package.json
```

## 🎯 Key Components

### Authentication (`src/utils/auth.js`)
- `login(email, password)` - Authenticates user and creates session
- `logout()` - Clears session
- `isAuthenticated()` - Checks authentication status
- `getSession()` - Retrieves current session

### Pages
- **Landing.vue** - Hero section with wavy background, features, and CTAs
- **Login.vue/Signup.vue** - Form validation with error handling
- **Dashboard.vue** - Statistics overview and quick actions
- **Tickets.vue** - Full CRUD interface with modal forms

## 🔐 Authentication Flow

1. User signs up → Data stored in `localStorage` under `ticketapp_users`
2. User logs in → Session created in `localStorage` under `ticketapp_session`
3. Protected routes check for valid session
4. Logout clears session and redirects to landing page

## 📊 Data Storage

All data is stored in browser's `localStorage`:

- `ticketapp_users` - Array of registered users
- `ticketapp_session` - Current user session
- `ticketapp_tickets` - Array of all tickets

## 👨‍💻 Author

Oni Oluwole