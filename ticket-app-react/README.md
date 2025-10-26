# Ticket Management App - React Version

A modern, responsive ticket management system built with React, Vite, and Tailwind CSS. This is part of a multi-framework implementation showcasing the same application across React, Vue.js, and Vanilla JavaScript.

## 🚀 Live Demo

[View Live Demo](https://tickets-please-react.netlify.app/)

## 🔗 Related Implementations

- [Vue.js Version](../ticket-app-vue)
- [Twig Version](../ticket-app-twig)
- [Shared Assets](../shared-assets)

## 📦 Tech Stack

- **Framework:** React ^19.1.1
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Notifications:**  Notyf
- **State Management:** React Hooks (useState, useEffect)

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
   cd ticket-app-react
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
| `npm run lint` | Run ESLint |

## 👤 Test Credentials

Use these credentials to test the application:

- **Email:** demo@test.com
- **Password:** password123

Alternatively, create a new account through the signup page.

## 📁 Project Structure

```
ticket-app-react/
├── public/
│   └── assets/           # Shared assets (SVGs, images)
├── src/
│   ├── pages/            # Page components
│   │   ├── LandingPage.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   └── Tickets.jsx
│   ├── components/       # Reusable components
│   │   ├── Layout.jsx
│   │   └── Header.jsx
│   ├── utils/            # Utility functions
│   │   └── auth.js       # Authentication logic
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
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
- **Landing Page** - Hero section with wavy background, features, and CTAs
- **Login/Signup** - Form validation with error handling
- **Dashboard** - Statistics overview and quick actions
- **Tickets** - Full CRUD interface with modal forms

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