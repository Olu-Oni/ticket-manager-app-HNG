import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../utils/auth";

// notification instance (consider moving inside component if not reused)
const notyf = new Notyf({ duration: 5000 });

const Header = ({ user, page }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    if (logout(navigate)) {
    notyf.success("Logged out successfully");
  } else {
    notyf.error("Logout canceled or failed");
  }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  console.log('header rendered')
  return (
    <header className="bg-white shadow-md">
      <div className="mx-auto px-6 py-2.5 flex justify-between items-center">
        <div className="flex max-md:grow md:flex-col items-center gap-x-4">
          <h2 className="text-xl font-bold">TicketsPlease</h2>
          <h4 className="border-b-2 text-xs rounded-2xl px-3 py-0.5 mt-0.5 max-md:mx-auto">
            {page}
          </h4>
        </div>

        {/* Hamburger Button for Mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        {/* Navigation Menu */}
        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex md:flex-row flex-col items-end md:items-center grow gap-4 absolute md:static top-14 right-2 rounded-2xl max-md:border-2 border-[var(--primary-light)] bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 z-10 max-md:w-fit`}
        >
          <span className="flex max-md:flex-col gap-4 grow place-content-center md:ml-20">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block ${
                isActive ? "font-bold border-b-2 border-blue-600" : ""
              }`
            }
            onClick={() => setIsMenuOpen(false)} // Close menu on click (mobile)
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/tickets"
            className={({ isActive }) =>
              ` block${
                isActive ? "font-bold border-b-2 border-blue-600" : ""
              }`
            }
            onClick={() => setIsMenuOpen(false)} // Close menu on click (mobile)
          >
            Tickets
          </NavLink>
          </span>
          <div className="text-right hidden sm:block max-md:-order-1">
            <p className="text-sm font-medium text-gray-800">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;