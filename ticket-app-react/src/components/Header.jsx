import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

// notification instance
const notyf = new Notyf({ duration: 5000 });

const Header = ({user, page}) => {
  const nav = useNavigate();

  const handleLogout = () => {
    if (logout()) {
      nav("/");
      notyf.success("Logged out successfully");
    }
  };
  return (
    <header className="bg-white shadow-md">
      <div className=" mx-auto px-6 py-2.5 flex justify-between items-center">
        <div>
          <h2 >TicketsPlease</h2>
          <h4 className="border-b-2 rounded-2xl px-3 py-0.5 mt-0.5">{page}</h4>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
