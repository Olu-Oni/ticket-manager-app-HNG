import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  // Manage form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const nav = useNavigate();
  // notification instance
  const notyf = new Notyf({ duration: 5000 });

  // Handle input change + clear error
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" })); // Clear error on type
  };

  const authenticate = () => {
    return null;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (authenticate()) {
      localStorage.setItem("ticketapp_users", JSON.stringify(user));
      notyf.success("Log in successfull !");
      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        nav("/auth/login");
      }, 3000);
    } else {
      // Display an info toast with no title
      notyf.error("Sign-up Unsecessful!");
    }
  };

  return (
    <div className="w-full bg-[var(--background)] place-content-center text-left">
      <form
        id="signupForm"
        noValidate
        onSubmit={handleSubmit}
        className="max-w-md my-4 mx-auto p-6 bg-transparent border-3 border-[var(--secondary)] bg rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Log In
        </h2>

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
              placeholder="••••••••"
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
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          data-testid="test-signup-submit"
          className="w-full btn-2"
        >
          Log in
        </button>

        <p className="text-sm mt-4 text-center">
          Don't have have an account?{" "}
          <a href="/auth/signup" className="hover:underline font-medium text-nowrap">
            create a new account
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
