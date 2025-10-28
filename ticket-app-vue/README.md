# Ticket Management App - Vue.js Version

A modern, responsive ticket management system built with Vue 3, Vite, and Tailwind CSS.

## 🚀 Live Demo

[View Live Demo](https://tickets-please-vue.vercel.app/)

## 🔗 Other Implementations

- [React Version](../ticket-app-react)
- [Twig Version](../ticket-app-twig)
- [Overview](../README.md)

## 📦 Tech Stack

- **Framework:** Vue 3.5
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** Vue Router
- **State:** Vue Reactivity (ref, reactive)
- **Notifications:** Notyf

## 🛠️ Local Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:5173`

## 📁 Project Structure

```
ticket-app-vue/
├── src/
│   ├── views/            # Page components
│   ├── components/       # Reusable components
│   ├── router/           # Vue Router config
│   ├── utils/            # Auth & utilities
│   └── App.vue
├── public/
└── package.json
```

## 🎯 Key Features

### Authentication (`src/utils/auth.js`)
- Session management with `localStorage`
- Route guards for protected pages
- Login/logout functionality

### Pages
- **Landing.vue** - Hero section with features
- **Login.vue/Signup.vue** - Form validation
- **Dashboard.vue** - Statistics overview
- **Tickets.vue** - Full CRUD interface

## 🚀 Deployment

Deployed on Netlify with automatic builds from `main` branch.

### Deploy Your Own

1. Fork this repo
2. Connect to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## 👨‍💻 Author

Oni Oluwole

---

For general features and comparison with other implementations, see the [main README](../README.md).
