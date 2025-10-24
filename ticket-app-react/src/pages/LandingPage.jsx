import { useNavigate } from "react-router-dom";
import WavyBg from "../assets/wavyBg.svg?react"; // Vite

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="w-full mx-auto px-6 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-indigo-600">TicketsPlease</h2>
        <button
          onClick={() => navigate("/auth/login")}
          className="btn-1 px-8 py-3 font-semibold shadow-lg "
        >
          Login
        </button>
        {/* <div className="flex gap-4">
          <button
            onClick={() => navigate("/auth/login")}
            className="px-6 py-2 text-indigo-600 hover:text-indigo-800 font-medium transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/auth/signup")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md"
          >
            Get Started
          </button>
        </div> */}
      </nav>

      {/* Hero Section with Wavy Background */}
      <section
        id="hero"
        className="relative mx-auto px-6 pt-20 pb-10 overflow-hidden z-20"
      >
        {/* Decorative Circle 1 */}
        <span className="absolute top-25 right-20 w-64 h-64 bg-indigo-200 rounded-full opacity-60 blur-sm"></span>

        {/* Decorative Circle 2 */}
        <span className="absolute  top-10 right-20  w-24 h-24  bg-purple-200 rounded-[100%] opacity-70 blur-xs"></span>

        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Manage Your Tickets
            <span className="block text-indigo-600 mt-2">Effortlessly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Streamline your workflow with our powerful ticket management system.
            Track, organize, and resolve issues faster than ever before.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/auth/signup")}
              className="btn-1 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </section>

      {/* wavy bg */}
      <div className="wavy-bg">
        <WavyBg />
      </div>
    </div>
  );
};

export default LandingPage;
