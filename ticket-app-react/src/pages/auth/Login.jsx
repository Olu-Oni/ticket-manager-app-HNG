import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/auth";

// notification instance
const notyf = new Notyf({ duration: 5000 });

const Login = () => {
  // Manage form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const nav = useNavigate();

  // Handle input change + clear error
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" })); // Clear error on type
  };

  // Validation function
  const validate = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    // Password: min 4 chars, 1 letter, 1 number
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      notyf.error("login failed: missing email/password");
      return;
    }
    const loginInfo = login(formData.email, formData.password);
    if (loginInfo.success) {
      notyf.success(loginInfo.message);
      // Reset form
      setFormData({
        email: "",
        password: "",
      });
      setErrors({
        email: "",
        password: "",
      });
      setTimeout(() => {
        nav("/dashboard");
      }, 1500);
    } else {
      // Display an info toast with no title
      notyf.error(loginInfo.message);
    }
  };

  return (
    <main className="w-full bg-[var(--background)] place-content-center text-left grow">
      <form
        id="loginForm"
        noValidate
        onSubmit={handleSubmit}
        className="max-w-md my-4 mx-auto p-6 bg-transparent border-3 border-[var(--secondary)] bg rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>

        <div className="space-y-5 mb-6">
          {/* Email */}
          <div className="form-group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--primary-300)] mb-1"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-describedby="error-email"
              // data-testid="test-login-email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder="you@example.com"
            />
            <span
              id="error-email"
              // data-testid="test-login-error-email"
              className="error text-red-500 text-sm mt-1 block min-h-5"
              role="alert"
            >
              {errors.email}
            </span>
          </div>

          {/* Password */}
          <div className="form-group">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--primary-300)] mb-1"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              aria-describedby="error-password"
              // data-testid="test-login-password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder="••••••••"
            />
            <span
              id="error-password"
              // data-testid="test-login-error-password"
              className="error text-red-500 text-sm mt-1 block min-h-5"
              role="alert"
            >
              {errors.password}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          data-testid="test-login-submit"
          className="w-full btn-2"
        >
          Log in
        </button>

        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link
            to="/auth/signup"
            className="hover:underline font-medium text-nowrap"
          >
            create a new account
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
