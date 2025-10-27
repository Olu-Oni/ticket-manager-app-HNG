<?php
session_start();
require_once '../vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

$loader = new FilesystemLoader('../src/templates');
$twig = new Environment($loader, [
    'cache' => false, // Disable cache for development
    'debug' => true
]);

// Get route from URL
$route = $_GET['route'] ?? 'landing';

// Define routes with authentication requirements
$routes = [
    'landing' => [
        'template' => 'landing.twig',
        'requiresAuth' => false
    ],
    'auth/login' => [
        'template' => 'login.twig',
        'requiresAuth' => false
    ],
    'auth/signup' => [
        'template' => 'signup.twig',
        'requiresAuth' => false
    ],
    'auth/logout' => [
        'template' => 'landing.twig',
        'requiresAuth' => false,
        'action' => 'logout'
    ],
    'dashboard' => [
        'template' => 'dashboard.twig',
        'requiresAuth' => true
    ],
    'tickets' => [
        'template' => 'tickets.twig',
        'requiresAuth' => true
    ]
];

// Check if route exists, default to landing
if (!isset($routes[$route])) {
    $route = 'landing';
}

$currentRoute = $routes[$route];

// Authentication check function
function isAuthenticated()
{
    // Backup PHP session check
    return isset($_SESSION['ticketapp_user']);
}

// Handle logout action
if (isset($currentRoute['action']) && $currentRoute['action'] === 'logout') {
    unset($_SESSION['ticketapp_user']);
    session_destroy();
    header('Location: ?route=landing');
    exit;
}

// Server-side auth check (optional fallback)
if ($currentRoute['requiresAuth'] && !isAuthenticated()) {
    $needsAuthRedirect = true;
} else {
    $needsAuthRedirect = false;
}

// Prepare data for template
$templateData = [
    'route' => $route,
    'requiresAuth' => $currentRoute['requiresAuth'],
    'needsAuthRedirect' => $needsAuthRedirect,
    'user' => $_SESSION['ticketapp_user'] ?? null
];

// Check for error message from URL parameter
$loginError = $_GET['error'] ?? null;

if ($loginError) {
    $templateData['loginError'] = $loginError;
}

// Render template
echo $twig->render($currentRoute['template'], $templateData);
?>

<!-- Global Auth Check Script -->
<script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css">
<script>
    // Initialize Notyf
    const notyf = new Notyf({
        duration: 5000,
    });

    // Define routes that require authentication
    const protectedRoutes = ['dashboard', 'tickets'];

    // Get current route from URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentRoute = urlParams.get('route') || 'landing';

    // Check authentication on page load
    document.addEventListener('DOMContentLoaded', () => {
        const session = localStorage.getItem('ticketapp_session');
        const isAuthenticated = !!session;

        // Check if current route requires auth
        const requiresAuth = protectedRoutes.includes(currentRoute);

        if (requiresAuth && !isAuthenticated) {
            // Show notification immediately
            notyf.error('Your session has expired. Please log in again.');

            window.location.href = `?route=auth/login&error=session_expired`;

        }

        // If on login/signup page and already authenticated, redirect to dashboard
        if ((currentRoute === 'auth/login' || currentRoute === 'auth/signup') && isAuthenticated) {
            window.location.href = '?route=dashboard';
        }

        // Update navigation based on auth state
        updateNavigation(isAuthenticated);
    });

    // Helper function to update navigation visibility
    function updateNavigation(isAuthenticated) {
        document.querySelectorAll('[data-auth-required="false"]').forEach(el => {
            el.style.display = isAuthenticated ? 'none' : '';
        });

        document.querySelectorAll('[data-auth-required="true"]').forEach(el => {
            el.style.display = isAuthenticated ? '' : 'none';
        });
    }

    // Handle login page notification
    document.addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');
        if (error === 'session_expired' && currentRoute === 'auth/login') {
            notyf.error('Your session has expired. Please log in again.');
        }
    });
</script>