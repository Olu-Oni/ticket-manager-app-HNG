// Define constants
const AUTH_KEY = "ticketapp_session";
const AUTH_USER = "ticketapp_users";

const demoUserEmail = "demoUser@olu.com";
const demoUserPwd = "testpassword321";

// Make functions globally available on window
window.login = function(email, password) {
    const storedUsers = JSON.parse(localStorage.getItem(AUTH_USER) || "[]");

    // Mock authentication - accept demo credentials
    if (email === demoUserEmail && password === demoUserPwd) {
        const session = {
            token: `token_${Date.now()}`,
            userName: "Test-User",
            email: email,
            loginTime: new Date().toISOString(),
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(session));
        return { success: true, session, message: `Welcome, ${session.userName}!` };
    }

    if (!storedUsers.find((usr) => usr.email === email)) {
        return { success: false, message: "No account found with this email" };
    }

    const user = storedUsers.find((usr) => usr.email === email && usr.password === password);

    if (user) {
        const session = {
            token: `token_${Date.now()}`,
            userId: user.id || 1,
            userName: user.userName || "User",
            email: user.email,
            loginTime: new Date().toISOString(),
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(session));
        return { success: true, session, message: `Welcome, ${session.userName}!` };
    }

    return { success: false, message: "Incorrect password" };
};

window.logout = function() {
    if (window.confirm("Are you sure you want to log out?")) {
        localStorage.removeItem(AUTH_KEY);
        window.location.href = "?route=landing";
        return true;
    }
    return false;
};

window.isAuthenticated = function() {
    const session = localStorage.getItem(AUTH_KEY);
    return !!session;
};

window.getSession = function() {
    const session = localStorage.getItem(AUTH_KEY);
    return session ? JSON.parse(session) : null;
};

window.getCurrentUser = function() {
    const session = window.getSession();
    return session ? {
        userId: session.userId,
        userName: session.userName,
        email: session.email
    } : null;
};

window.signup = function(email, password, userName) {
    const storedUsers = JSON.parse(localStorage.getItem(AUTH_USER) || "[]");
    if (storedUsers.find((usr) => usr.email === email)) {
        return { success: false, message: "Email already registered" };
    }
    const newUser = { id: storedUsers.length + 1, email, password, userName };
    storedUsers.push(newUser);
    localStorage.setItem(AUTH_USER, JSON.stringify(storedUsers));
    return { success: true, message: "Account created successfully" };
};