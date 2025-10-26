import { useNavigate } from "react-router-dom";
import WavyBg from "../assets/wavyBg.svg?react"; // Vite

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* header & hero section */}
      <section className="min-h-screen relative flex flex-col">
        <header className="w-full mx-auto px-6 py-4 flex justify-between items-center">
          <h2 className=" ">TicketsPlease</h2>
          <button
            onClick={() => navigate("/auth/login")}
            className="btn-1 px-8 py-3 font-semibold shadow-lg "
          >
            Login
          </button>
        </header>

        {/* Hero Section with Wavy Background */}
        <section
          id="hero"
          className="relative flex-1 mx-auto px-6 pt-10 sm:pt-20 pb-10 overflow-hidden z-20 "
        >
          {/* Decorative Circle 1 */}
          <span className="absolute top-25 right-20 w-64 h-64 bg-indigo-200 rounded-full opacity-60 blur-sm"></span>

          {/* Decorative Circle 2 */}
          <span className="absolute  top-10 right-20  w-24 h-24  bg-purple-200 rounded-[100%] opacity-70 blur-xs"></span>

          <div className="relative max-w-4xl mx-auto">
            <h1 className="max-sm:text-3xl! mb-10">
              Manage Your Tickets
              <span className="block text-indigo-600 mt-2">Effortlessly</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-14 max-w-2xl mx-auto">
              Streamline your workflow with our powerful ticket management
              system. Track, organize, and resolve issues faster than ever
              before.
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
        <div className="wavy-bg">
          <WavyBg />
        </div>
      </section>

      {/* wavy bg */}

      {/* Features Section */}
      <section className="bg-indigo-50 py-10 pb-20 border-t-4 border-[var(--primary-light)]">
        <div className="max-w-[1440px] mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose TicketFlow?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Box 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex md:flex-col items-center">
              <div className="w-16 h-16 sm:bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <span>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Easy Tracking
                </h3>
                <p className="text-gray-600">
                  Monitor all your tickets in one place with real-time status
                  updates and progress tracking.
                </p>
              </span>
            </div>

            {/* Feature Box 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex md:flex-col items-center">
              <div className="w-16 h-16 sm:bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Lightning Fast
                </h3>
                <p className="text-gray-600">
                  Create, update, and resolve tickets in seconds with our
                  intuitive interface.
                </p>
              </span>
            </div>

            {/* Feature Box 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex md:flex-col items-center">
              <div className="w-16 h-16 sm:bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Secure & Reliable
                </h3>
                <p className="text-gray-600">
                  Your data is protected with industry-standard security
                  measures and encryption.
                </p>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
