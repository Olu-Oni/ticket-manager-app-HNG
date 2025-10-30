# Ticket Management App - React Version

A modern, responsive ticket management system built with React, Vite, and Tailwind CSS.

## 🚀 Live Demo

[View Live Demo](https://tickets-please-react.vercel.app/)

## 🔗 Other Implementations

- [Vue.js Version](../ticket-app-vue)
- [Twig Version](../ticket-app-twig)
- [Overview](../README.md)

## 📦 Tech Stack

- **Framework:** React 19.1
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State:** React Hooks (useState, useEffect)
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

# Run linter
npm run lint
```

Visit `http://localhost:5173`

## 📁 Project Structure

```
ticket-app-react/
├── src/
│   ├── pages/            # Page components
│   ├── components/       # Reusable components
│   ├── utils/            # Auth & utilities
│   ├── App.jsx
│   └── main.jsx
├── public/
└── package.json
```

## 🎯 Key Features

### Authentication (`src/utils/auth.js`)
- Session management with `localStorage`
- Protected route guards
- Login/logout functionality

### Pages
- **LandingPage.jsx** - Hero section with features
- **Login.jsx/Signup.jsx** - Form validation
- **Dashboard.jsx** - Statistics overview
- **Tickets.jsx** - Full CRUD interface

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
