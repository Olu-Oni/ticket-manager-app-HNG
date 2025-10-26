const AUTH_KEY = "ticketapp_session";
const AUTH_USER = "ticketapp_users";

const demoUseremail = "demoUser@olu.com";
const demoUserpwd = "testpassword321";

export const login = (email, password) => {
  const storedUsers = JSON.parse(localStorage.getItem(AUTH_USER) || "[]");

  // Mock authentication - accept demo credentials
  if (email === demoUseremail && password === demoUserpwd) {
    const session = {
      token: `token_${Date.now()}`,
      userName: "Test-User",
      email: email,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return { success: true, session, message: `Welcome, ${session.userName}!` };
  }
  if (!storedUsers.find((usr) => email === usr.email)) {
    return { success: false, message: "No account found with this email" };
  }
  const user = storedUsers.find(
    (usr) => email === usr.email && password === usr.password
  );

  if (user) {
    // create session
    const session = {
      token: `token_${Date.now()}`,
      userId: user.id,
      userName: user.userName,
      email: user.email,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return { success: true, session, message: `Welcome, ${session.userName}!` };
  }
  //   for wrong password
  return { success: false, message: "Incorrect password" };
};

export const logout = (router) => {
  if (window.confirm("Are you sure you want to log out?")) {
    try {
      localStorage.removeItem(AUTH_KEY);
      router.push("/");
      return true; // Indicate success
    } catch (error) {
      console.log(error)
      return false; // Indicate failure
    }
  }
  return false; // User canceled logout
};

export const isAuthenticated = () => {
  const session = localStorage.getItem(AUTH_KEY);
  return !!session;
};

export const getSession = () => {
  const session = localStorage.getItem(AUTH_KEY);
  return session ? JSON.parse(session) : null;
};

export const getCurrentUser = () => {
  const session = getSession();
  return session
    ? { userId: user.id, userName: session.userName, email: session.email }
    : null;
};
