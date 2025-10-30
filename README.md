# Ticket Management App - Multi-Framework Implementation

A modern, responsive ticket management system showcasing the same application built across three different frameworks/approaches. Compare implementations in React, Vue.js, and PHP/Twig to see architectural differences and best practices for each stack.

## 🚀 Live Demos

- **Vue.js:** [tickets-please-vue.ercel.app](https://tickets-please-vue.vercel.app/)
- **React:** [tickets-please-react.vercel.app](https://tickets-please-react.vercel.app/)
- **Twig:** [tickets-please-twig.render.com](https://tickets-please-twig.onrender.com/)

## 📦 Implementations

### [Vue.js Version](./ticket-app-vue)
Modern SPA using Vue 3 composition API, Vue Router, and Vite.

### [React Version](./ticket-app-react)
Component-based architecture with React hooks and React Router.

### [Twig Version](./ticket-app-twig)
Server-rendered PHP application using Twig templating engine.

## ✨ Shared Features

All implementations include:

- 🎨 Modern landing page with wavy hero section
- 🔐 Complete authentication system (Login/Signup)
- 📊 Dashboard with ticket statistics
- ✏️ Full CRUD operations for ticket management
- ✅ Form validation with inline error messages
- 🎯 Status-based ticket filtering (Open, In Progress, Closed)
- 🔒 Protected routes with authentication guards
- 📱 Mobile-first responsive design
- ♿ Accessibility compliant

## 🎯 Purpose

This monorepo demonstrates:

- **Framework Comparison:** See how the same features are implemented across different stacks
- **Best Practices:** Each version follows its framework's conventions and patterns
- **Architectural Patterns:** Compare client-side SPA (Vue/React) vs server-rendered (Twig)
- **State Management:** Different approaches to handling authentication and data

## 🛠️ Tech Stack Comparison

| Feature | Vue.js | React | Twig/PHP |
|---------|--------|-------|----------|
| **Runtime** | Client-side | Client-side | Server-side |
| **Routing** | Vue Router | React Router | PHP routing |
| **State** | Vue Reactivity | React Hooks | PHP Sessions |
| **Styling** | Tailwind CSS | Tailwind CSS | Tailwind CSS |
| **Build** | Vite | Vite | Composer + npm |

## 👤 Test Credentials

All versions use the same test credentials:

- **Email:** demo@test.com  
- **Password:** testpassword321

Or create a new account through any signup page.

## 📊 Data Storage

- **Vue/React:** Browser `localStorage` (demo purposes)
- **Twig:** PHP sessions + `localStorage` mirror

*Note: For production, replace with proper database (PostgreSQL, MySQL, etc.)*

## 🚀 Quick Start

Choose your preferred implementation:

```bash
# Vue.js
cd ticket-app-vue
npm install
npm run dev

# React
cd ticket-app-react
npm install
npm run dev

# Twig (PHP)
cd ticket-app-twig
composer install
npm install
npm run build:css
php -S localhost:8000 -t public/
```

## 📁 Project Structure

```
ticket-manager-monorepo/
├── ticket-app-vue/       # Vue 3 implementation
├── ticket-app-react/     # React implementation
├── ticket-app-twig/      # PHP/Twig implementation
├── shared-assets/        # svg file for logo and wavy background
└── README.md             # This file
```

## 🤝 Contributing

Each implementation is independent. See individual README files for specific contribution guidelines.

## 👨‍💻 Author

Oni Oluwole

## 📄 License

MIT License - feel free to use this project for learning or as a starting point for your own applications.

---

**Comparison Guide:** Check each implementation's README for framework-specific details, setup instructions, and architectural decisions.
