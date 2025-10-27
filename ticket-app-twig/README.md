# Ticket Management App - Twig Version

A modern, responsive ticket management system built with PHP, Twig templating, and Tailwind CSS. This is part of a multi-framework implementation showcasing the same application across React, Vue.js, and Twig.

## 🚀 Live Demo

This app is deployed on [Render.com]
[View Live Demo](https://tickets-please-twig.onrender.com/) 

## 🔗 Related Implementations

- [React Version](../ticket-app-react)
- [Vue.js Version](../ticket-app-vue)

## 📦 Tech Stack

- **Backend:** PHP 8.2
- **Templating:** Twig 3.x
- **Styling:** Tailwind CSS 4.x
- **State:** PHP Sessions + LocalStorage
- **Authentication:** Session-based with client-side validation
- **Notifications:** Notyf

## ✨ Features

- 🎨 Modern landing page with wavy hero section
- 🔐 Authentication system (Login/Signup)
- 📊 Dashboard with ticket statistics
- ✏️ Full CRUD operations for tickets
- ✅ Form validation with error messages
- 🎯 Status-based ticket filtering
- 🔒 Protected routes with session checks
- 📱 Mobile-responsive design

## 🛠️ Local Development

### Prerequisites

- PHP 8.1+
- Composer
- Node.js 16+

### Setup

```bash
# Install dependencies
composer install
npm install

# Build Tailwind CSS
npm run build:css

# Start development server
php -S localhost:8000 -t public/
```

Visit `http://localhost:8000`

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `composer install` | Install PHP dependencies |
| `npm run build:css` | Build Tailwind CSS for production |
| `npm run watch:css` | Watch and rebuild CSS during development |
| `php -S localhost:8000 -t public/` | Start local PHP server |

## 👤 Test Credentials

- **Email:** demo@test.com
- **Password:** password123

## 📁 Project Structure

```
ticket-app-twig/
├── public/
│   ├── css/              # Compiled Tailwind CSS
│   ├── js/               # Client-side JavaScript
│   └── index.php         # Entry point & routing
├── src/
│   ├── templates/        # Twig template files
│   └── components/       # Reusable Twig partials
├── vendor/               # Composer dependencies
├── composer.json
├── package.json
├── tailwind.config.js
└── Dockerfile           # For deployment
```


### Deploy Your Own

1. Fork this repo
2. Create a new Web Service on Render
3. Connect your GitHub repo
4. Select **Docker** as the environment
5. Set root directory to `ticket-app-twig` (if in a monorepo)
6. Deploy!

The included `Dockerfile` handles all setup automatically.

## 🔐 How It Works

- **Authentication:** PHP sessions store user data; localStorage mirrors session state for client-side checks
- **Routing:** Simple query-based routing in `index.php` (e.g., `?route=dashboard`)
- **Data:** Currently uses localStorage (client-side) - can be replaced with a database
- **Templates:** Twig renders all pages server-side with PHP data injection

## 👨‍💻 Author

Oni Oluwole

---

**Note:** This is a demo application. For production use, replace localStorage with a proper database (MySQL, PostgreSQL, etc.) and implement secure password hashing with PHP's `password_hash()`.