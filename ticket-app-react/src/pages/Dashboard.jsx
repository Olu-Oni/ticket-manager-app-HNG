import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { getSession } from "../utils/auth";

const Dashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    in_progress: 0,
    closed: 0,
  });


  useEffect(() => {
    // Get current user from session
    const session = getSession()
    if (session) {
      setUser({
        name: session.userName || session.email.split("@")[0],
        email: session.email,
      });
    }

    // Calculate ticket statistics
    const tickets = JSON.parse(
      localStorage.getItem("ticketapp_tickets") || "[]"
    );
    const statistics = {
      total: tickets.length,
      open: tickets.filter((t) => t.status === "open").length,
      in_progress: tickets.filter((t) => t.status === "in_progress").length,
      closed: tickets.filter((t) => t.status === "closed").length,
    };
    setStats(statistics);
  }, []);

  return (
    <>
      {/* Header with Logout */}

      <Header user={user} page={"Dashboard"} />
      {/* Main Dashboard Content */}
      <main className="mx-[5%] py-8 flex flex-col ">
        {/* Welcome Section */}
        <section className="mb-8 ">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.name || "User"}! 👋
          </h2>
          <p>Here's an overview of your ticket management system</p>
        </section>

        {/* Statistics Section */}
        <section className="grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 pb-6 text-nowrap ">
          {/* Total Tickets */}
          <div className="bg-[var(--background)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <div className="flex items-center justify-between ">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-indigo-600"
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
              <span className="text-3xl font-bold text-indigo-600">
                {stats.total}
              </span>
            </div>
            <h3 className="relative -top-1">Total Tickets</h3>
            <p>All tickets in system</p>
          </div>

          {/* Open Tickets */}
          <div className="bg-[var(--background)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-3xl font-bold text-green-600">
                {stats.open}
              </span>
            </div>
            <h3 className="relative -top-1">Open Tickets</h3>
            <p>Ready to be worked on</p>
          </div>

          {/* In Progress Tickets */}
          <div className="bg-[var(--background)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <div className="flex items-center justify-between ">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-3xl font-bold text-amber-600">
                {stats.in_progress}
              </span>
            </div>
            <h3 className="relative -top-1">In Progress</h3>
            <p>Currently being worked on</p>
          </div>

          {/* Closed Tickets */}
          <div className="bg-[var(--background)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <div className="flex items-center justify-between ">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-3xl font-bold text-gray-600">
                {stats.closed}
              </span>
            </div>
            <h3 className="relative -top-1">Closed Tickets</h3>
            <p className="text-sm text-gray-500 mt-1">Completed and resolved</p>
          </div>
        </section>

        {/* Info Section */}
        <section className=" bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
          <div className="flex place-items-center gap-4">
            
            <a
              onClick={() => navigate("/tickets")}
              className="flex gap-4 items-center mx-auto"
            >
              Go to Ticket Management
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
            {/* </div> */}
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
