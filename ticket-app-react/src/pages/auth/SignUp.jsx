"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// notification instance
const notyf = new Notyf({ duration: 5000 });

export default function SignupForm() {
  const emptyForm = {
    userName: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  // Manage form state
  const [formData, setFormData] = useState(emptyForm);

  const [errors, setErrors] = useState(emptyForm);

  const nav = useNavigate();

  // Handle input change + clear error
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" })); // Clear error on type
  };

  // Validation function
  const validate = () => {
    const newErrors = emptyForm;

    // user name
    if (!formData.userName.trim()) {
      newErrors.userName = "User Name is required";
    } else if (!/^[A-Za-z0-9_-]+$/.test(formData.userName)) {
      newErrors.userName =
        "Only letters, numbers, underscores, and hyphens allowed";
    }
    // full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Only letters and spaces allowed";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Password: min 4 chars, 1 letter, 1 number
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must ccontain a letter and a number";
    }

    // Confirm Password
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const user = {
        id: crypto.randomUUID(), // unique id
        fullName: formData.fullName,
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString(),
      };
      // get existing users (if they exist)
      const existingUsers = JSON.parse(
        localStorage.getItem("ticketapp_users") || "[]"
      );

      const emailExists = existingUsers.some((u) => u.email === formData.email);

      if (emailExists) {
        notyf.error("Email already registered!");
        setErrors((prev) => ({
          ...prev,
          email: "This email is already in use",
        }));
        return;
      }
      // else
      // store new user
      existingUsers.push(user);

      localStorage.setItem("ticketapp_users", JSON.stringify(existingUsers));
      console.log("Signup successful:", user);

      notyf.success("Account created successfully!");
      // Reset form
      setFormData(emptyForm);
      setErrors(emptyForm);
      setTimeout(() => {
        nav("/auth/login");
      }, 3000);
    } else {
      // Display an info toast with no title
      notyf.error("Sign-up Unsucessful!");
    }
  };

  return (
    <main className="w-full bg-[var(--background)] place-content-center text-left grow">
       <form
        id="signupForm"
        noValidate
        onSubmit={handleSubmit}
        className="max-w-md my-4 mx-auto p-6 bg-transparent border-3 border-[var(--secondary)] bg rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Your Account
        </h2>

        <div className="space-y-1 mb-3">
          {/* User Name */}
          <div className="form-group">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-[var(--primary-300)] mb-1"
            >
              User Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="userName"
              value={formData.userName}
              onChange={handleChange}
              pattern="[A-Za-z\s]+"
              required
              aria-describedby="error-userName"
              data-testid="test-signup-userName"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition ${
                errors.userName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder="John Doe"
            />
            <span
              id="error-userName"
              data-testid="test-signup-error-userName"
              className="error text-red-500 text-sm mt-1 block min-h-5"
              role="alert"
            >
              {errors.userName}
            </span>
          </div>
          {/* Full Name */}
          <div className="form-group">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-[var(--primary-300)] mb-1"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              pattern="[A-Za-z\s]+"
              required
              aria-describedby="error-fullName"
              data-testid="test-signup-fullName"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition ${
                errors.fullName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder="John Doe"
            />
            <span
              id="error-fullName"
              data-testid="test-signup-error-fullName"
              className="error text-red-500 text-sm mt-1 block min-h-5"
              role="alert"
            >
              {errors.fullName}
            </span>
          </div>

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
              data-testid="test-signup-email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder="you@example.com"
            />
            <span
              id="error-email"
              data-testid="test-signup-error-email"
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
              data-testid="test-signup-password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder="••••"
            />
            <span
              id="error-password"
              data-testid="test-signup-error-password"
              className="error text-red-500 text-sm mt-1 block min-h-5"
              role="alert"
            >
              {errors.password}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[var(--primary-300)] mb-1"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              aria-describedby="error-confirmPassword"
              data-testid="test-signup-confirm-password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder="••••"
            />
            <span
              id="error-confirmPassword"
              data-testid="test-signup-error-confirm-password"
              className="error text-red-500 text-sm mt-1 block min-h-5"
              role="alert"
            >
              {errors.confirmPassword}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          data-testid="test-signup-submit"
          className="w-full btn-2"
        >
          Create Account
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <a href="/auth/login" className="hover:underline font-medium">
            Sign in
          </a>
        </p>
      </form>
    </main>
  );
}
