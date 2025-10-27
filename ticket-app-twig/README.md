### # Ticket Management App - Twig Version

A modern, responsive ticket management system built with PHP, Twig templating, and Tailwind CSS. This is part of a multi-framework implementation showcasing the same application across React, Vue.js, and Twig.

## 🚀 Live Demo

[View Live Demo](https://your-twig-app.netlify.app/) 

## 🔗 Related Implementations

- [React Version](../ticket-app-react)
- [Vue.js Version](../ticket-app-vue)
- [Shared Assets](../shared-assets)

## 📦 Tech Stack

- **Language:** PHP ^8.1
- **Templating:** Twig ^3.5
- **Styling:** Tailwind CSS
- **Routing:** Simple PHP routing (custom or via a micro-framework like Slim)
- **State Management:** Server-side sessions (PHP `$_SESSION`) for authentication; client-side JavaScript for minor reactivity (e.g., filtering)
- **Script Style:** Plain PHP with Twig for views; minimal JavaScript for modals/forms

## ✨ Features

- 🎨 Modern, responsive landing page with wavy hero section
- 🔐 Complete authentication system (Login/Signup) using PHP sessions and password hashing
- 📊 Dashboard with ticket statistics
- ✏️ Full CRUD operations for ticket management
- ✅ Form validation with inline error messages (server-side with Twig conditionals)
- 🎯 Status-based ticket filtering (Open, In Progress, Closed) via query params
- 🔒 Protected routes with session checks
- 📱 Mobile-first responsive design
- ♿ Accessibility compliant (ARIA labels, semantic HTML)

## 🛠️ Installation & Setup

### Prerequisites

- PHP 8.1 or higher
- Composer (for dependency management)
- A local web server (e.g., PHP's built-in server, Apache, or Nginx)
- Node.js (v16 or higher) for Tailwind CSS compilation

### Steps

1. **Clone or navigate to the project:**
   ```bash
   cd ticket-app-twig
   ```

2. **Install PHP dependencies:**
   ```bash
   composer install
   ```

3. **Install and build Tailwind CSS:**
   ```bash
   npm install
   npm run build  # Compiles Tailwind to public/css/tailwind.css
   ```

4. **Start the development server:**
   ```bash
   php -S localhost:8000 -t public/
   ```
   *(Alternatively, configure Apache/Nginx to point to the `public/` directory.)*

5. **Open your browser:**
   ```
   http://localhost:8000
   ```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `composer install` | Install PHP dependencies |
| `npm run dev` | Watch and rebuild Tailwind CSS during development |
| `npm run build` | Build Tailwind CSS for production |
| `php -S localhost:8000 -t public/` | Start PHP development server |

## 👤 Test Credentials

Use these credentials to test the application:

- **Email:** demo@test.com
- **Password:** password123

Alternatively, create a new account through the signup page.

## 📁 Project Structure

```
ticket-app-twig/
├── public/                  # Web-accessible assets
│   ├── css/                 # Compiled styles (e.g., tailwind.css)
│   ├── js/                  # Minimal JS (e.g., for modals, filtering)
│   └── index.php            # PHP entry point (handles routing)
├── src/
│   ├── templates/           # Twig template files
│   │   ├── landing.twig
│   │   ├── login.twig
│   │   ├── signup.twig
│   │   ├── dashboard.twig
│   │   └── tickets.twig
│   ├── components/          # Twig includes (reusable partials)
│   │   ├── layout.twig
│   │   └── header.twig
│   ├── utils/               # Utility functions
│   │   └── auth.php         # Authentication logic (login, logout, etc.)
│   ├── routes.php           # Route definitions
│   └── config.php           # Configuration (e.g., DB simulation)
├── vendor/                  # Composer dependencies
├── tailwind.config.js       # Tailwind configuration
├── package.json             # Node dependencies for Tailwind
├── composer.json            # PHP dependencies
└── README.md
```

## 🎯 Key Components

### Authentication (`src/utils/auth.php`)
- `login($email, $password)` - Validates credentials, starts a PHP session, and sets `$_SESSION['user']`
- `logout()` - Unsets `$_SESSION` and redirects
- `isAuthenticated()` - Checks if `$_SESSION['user']` exists
- `getSession()` - Retrieves current user from `$_SESSION`

### Pages (Twig Templates in `src/templates/`)
- **landing.twig** - Hero section with wavy background, features, and CTAs (uses Tailwind for styling)
- **login.twig/signup.twig** - Forms with validation errors displayed via Twig `{% if error %}` blocks
- **dashboard.twig** - Statistics overview (e.g., ticket counts) and quick actions, rendered from PHP data
- **tickets.twig** - Full CRUD interface with forms/modals (uses query params for filtering, e.g., `?status=open`)

### Routing (`src/routes.php`)
- Simple switch-based routing in `public/index.php` (e.g., `if ($_GET['route'] === 'login') { include 'login.php'; }`)
- Protected routes check `isAuthenticated()` and redirect if needed

## 🔐 Authentication Flow

1. User signs up → PHP hashes password, stores user in `localStorage`-like simulation (or array in session for demo); redirects to login
2. User logs in → PHP validates, starts `$_SESSION`, redirects to dashboard
3. Protected pages check session; unauthenticated users redirect to landing/login
4. Logout destroys session and redirects to landing

## 📊 Data Storage

All data is stored in PHP sessions or a simple in-memory array (simulating `localStorage` for demo purposes):

- `ticketapp_users` - Array of registered users (email, hashed password)
- `ticketapp_session` - Current user session data
- `ticketapp_tickets` - Array of tickets (title, description, status, etc.)

For production, replace with a database like SQLite/MySQL.

## 👨‍💻 Author

Oni Oluwole *(Adapted from Vue.js version to Twig by [Your Name or Grok-assisted conversion])*

---

### Conversion Notes: From Vue.js to Twig
This README mirrors the original Vue.js version but adapts it for a server-side PHP/Twig setup. Key changes:
- **Frontend to Server-Side Shift**: Vue's client-side reactivity becomes server-side rendering with Twig. Forms submit via POST to PHP handlers, which re-render pages with data/errors.
- **State Management**: Vue's refs/reactive → PHP arrays/sessions. For filtering, use URL params (e.g., `tickets.php?status=open`) and Twig loops.
- **Routing**: Vue Router → Simple PHP routing in `index.php` (e.g., using `$_GET['route']`).
- **Styling/JS**: Tailwind remains; minimal JS for modals (e.g., via Alpine.js or plain JS) to handle interactions not feasible server-side.
- **Data Persistence**: Original `localStorage` → PHP sessions or in-memory arrays (easy to swap for a DB).
- **Setup**: Composer for PHP deps (Twig); npm for Tailwind build.

### Quick Start Implementation Guide
To build this project based on your existing `ticket-app-twig-wsl`:

1. **Update Project Name/Dir**:
   ```bash
   cd ~/Documents/ticket-app-twig-wsl
   mv ticket-app-twig-wsl ticket-app-twig  # Or rename as needed
   ```

2. **Install Dependencies** (if not done):
   ```bash
   composer require twig/twig
   # For Tailwind: npm init -y && npm install -D tailwindcss && npx tailwindcss init
   ```

3. **Create Core Files**:
   - `public/index.php` (Entry Point):
     ```php
     <?php
     session_start();
     require_once '../vendor/autoload.php';

     use Twig\Environment;
     use Twig\Loader\FilesystemLoader;

     $loader = new FilesystemLoader('../src/templates');
     $twig = new Environment($loader);

     $route = $_GET['route'] ?? 'landing';

     if ($route === 'login' && $_POST) {
         // Handle login logic from src/utils/auth.php
         // Re-render login.twig with errors/success
     }

     // Simple routing example
     switch ($route) {
         case 'dashboard':
             if (!isAuthenticated()) { header('Location: ?route=login'); exit; }
             echo $twig->render('dashboard.twig', ['stats' => getTicketStats()]);
             break;
         case 'tickets':
             if (!isAuthenticated()) { header('Location: ?route=login'); exit; }
             $status = $_GET['status'] ?? 'all';
             echo $twig->render('tickets.twig', ['tickets' => getTickets($status)]);
             break;
         // Add cases for landing, login, signup, etc.
         default:
             echo $twig->render('landing.twig', []);
     }
     ?>
     ```
     *(Include Tailwind CSS in layouts via `<link rel="stylesheet" href="/css/tailwind.css">`.)*

   - `src/utils/auth.php` (As described in Key Components).
   - `src/templates/tickets.twig` (Example CRUD):
     ```twig
     {% extends 'components/layout.twig' %}

     {% block content %}
     <h1>Tickets</h1>
     <select onchange="window.location.href='?route=tickets&status='+this.value">
         <option value="all">All</option>
         <option value="open">Open</option>
         <!-- etc. -->
     </select>
     <ul>
         {% for ticket in tickets %}
         <li>{{ ticket.title }} - {{ ticket.status }}
             <a href="?route=tickets&action=edit&id={{ ticket.id }}">Edit</a>
             <a href="?route=tickets&action=delete&id={{ ticket.id }}" onclick="return confirm('Delete?')">Delete</a>
         </li>
         {% endfor %}
     </ul>
     <form method="POST" action="?route=tickets&action=create">
         <input type="text" name="title" placeholder="Title" required>
         <!-- More fields -->
         <button type="submit">Create Ticket</button>
     </form>
     {% if errors %}
         <ul>{% for error in errors %}<li>{{ error }}</li>{% endfor %}</ul>
     {% endif %}
     {% endblock %}
     ```

4. **Data Simulation** (In `src/config.php` or handlers):
   ```php
   function getTickets($status = 'all') {
       $tickets = json_decode($_SESSION['ticketapp_tickets'] ?? '[]', true) ?: [
           ['id' => 1, 'title' => 'Sample Ticket', 'status' => 'open']
       ];
       if ($status !== 'all') {
           $tickets = array_filter($tickets, fn($t) => $t['status'] === $status);
       }
       return array_values($tickets);
   }
   // Similar for users, CRUD handlers (update session on POST)
   ```

5. **Tailwind Setup**:
   - In `tailwind.config.js`: Content paths to `src/templates/**/*.twig`.
   - Add to `src/templates/components/layout.twig`: `<link href="/css/tailwind.css" rel="stylesheet">`.

6. **Test**:
   - Run `php -S localhost:8000 -t public/`.
   - Navigate to `http://localhost:8000?route=landing`.

