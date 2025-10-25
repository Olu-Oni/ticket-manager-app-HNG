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
    <div className="bg-[var(--secondary)]">
      {/* Header with Logout */}

      <Header user={user} page={"Dashboard"} />
      {/* Main Dashboard Content */}
      <main className="mx-auto px-6 py-8 flex flex-col">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.name || "User"}! 👋
          </h2>
          <p>Here's an overview of your ticket management system</p>
        </div>

        {/* Statistics Section */}
        <section className="grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 pb-6 text-nowrap">
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

        {/* Quick Actions */}
        {/* <section className="bg-[var(--background)] rounded-2xl p-8 shadow-lg mb-8">
          <h2 className=" mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/tickets")}
              className="p-6 bg-linear-to-br from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition transform hover:-translate-y-1 text-left"
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-1">Create New Ticket</h3>
              <p className="text-sm text-white/80">
                Add a new ticket to the system
              </p>
            </button>

            <button
              onClick={() => navigate("/tickets")}
              className="p-6 bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-xl hover:shadow-lg transition transform hover:-translate-y-1 text-left"
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="mb-1">View All Tickets</h3>
              <p className="text-sm text-white/80">Manage existing tickets</p>
            </button>

            <button
              onClick={() => navigate("/tickets?filter=open")}
              className="p-6 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl hover:shadow-lg transition transform hover:-translate-y-1 text-left"
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-1">Pending Tickets</h3>
              <p className="text-sm text-white/80">
                View tickets needing attention
              </p>
            </button>
          </div>
        </section> */}

        {/* Info Section */}
        <section className=" bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
          <div className="flex place-items-center gap-4">
            {/* <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div> */}
            {/* <div> */}
            {/* <h4 className="font-semibold text-gray-800 mb-2">
                Getting Started
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                Click on "View All Tickets" to manage your tickets, or use
                "Create New Ticket" to add a new one. You can edit, delete, and
                update the status of tickets at any time.
              </p> */}
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
    </div>
  );
};

export default Dashboard;
