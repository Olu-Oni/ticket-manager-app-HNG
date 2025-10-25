import { useState, useEffect } from "react";
import Header from "../components/Header";
import { getSession } from "../utils/auth";

// notification instance
const notyf = new Notyf({
  types: [
    {
      type: "info",
      background: "blue",
      icon: false,
    },
  ],
});

const Tickets = () => {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "open",
    priority: "medium",
  });
  const [errors, setErrors] = useState({
    title: "",
    status: "",
    description: "",
  });

  useEffect(() => {
    notyf.open({
      type: "info",
      message: "loading tickets ...",
    });
    const session = getSession();
    if (session) {
      setUser({
        name: session.userName || session.email.split("@")[0],
        email: session.email,
      });
    }
    loadTickets();
  }, []);

  const loadTickets = () => {
    const storedTickets = JSON.parse(
      localStorage.getItem("ticketapp_tickets") || "[]"
    );
    setTickets(storedTickets);
    notyf.success('load Successful')
  };

  const openCreateModal = () => {
    setEditingTicket(null);
    setFormData({
      title: "",
      description: "",
      status: "open",
      priority: "medium",
    });
    setErrors({ title: "", status: "" });
    setShowModal(true);
  };

  const openEditModal = (ticket) => {
    setEditingTicket(ticket);
    setFormData({
      title: ticket.title,
      description: ticket.description || "",
      status: ticket.status,
      priority: ticket.priority || "medium",
    });
    setErrors({ title: "", status: "" });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTicket(null);
    setFormData({
      title: "",
      description: "",
      status: "open",
      priority: "medium",
    });
    setErrors({ title: "", status: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = { title: "", status: "", description:"" };
    if (!formData.title.trim()) newErrors.title = "Title is required";
    const validStatuses = ["open", "in_progress", "closed"];
    if (!formData.status || !validStatuses.includes(formData.status)) {
      newErrors.status = "Valid status is required";
    }
    if (formData.description && formData.description.length <3) {
      newErrors.description = "description must be more than 3 characters";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  console.log(errors)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
         notyf.error('Failed to make changes')
        return};

    if (editingTicket) {
      const updatedTickets = tickets.map((ticket) =>
        ticket.id === editingTicket.id
          ? { ...ticket, ...formData, updatedAt: new Date().toISOString() }
          : ticket
      );
      setTickets(updatedTickets);
      localStorage.setItem("ticketapp_tickets", JSON.stringify(updatedTickets));
      notyf.success("Successfully <b>changed</b> ticket")
    } else {
      const newTicket = {
        id: crypto.randomUUID(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedTickets = [...tickets, newTicket];
      setTickets(updatedTickets);
      localStorage.setItem("ticketapp_tickets", JSON.stringify(updatedTickets));
      notyf.success("Successfully <b>added</b> new ticket")
    }
    closeModal();
  };

  const handleDelete = (ticketId) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      const updatedTickets = tickets.filter((ticket) => ticket.id !== ticketId);
      setTickets(updatedTickets);
      localStorage.setItem("ticketapp_tickets", JSON.stringify(updatedTickets));
      notyf.success("Successfully removed ticket")
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800 border-green-300";
      case "in_progress":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-amber-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-[var(--secondary)]">
      <Header user={user} page={"Ticket Management"} />

      <main className="mx-auto px-6 py-4 pb-12">
        <div className="flex justify-between items-center mb-6 p-1.5">
          <div className="sm:flex-1 sm:ml-50 flex gap-2 place-content-center">
            <h3 className=" w-fit   py-1 max-sm:hidden">Total:</h3>
            <span className="text-[var(--background)] backdrop-brightness-90 font-bold rounded-2xl px-2 mt-1 text-nowrap place-content-center h-fit py-1">
              {tickets.length} tickets
            </span>
          </div>
          <button
            onClick={openCreateModal}
            className="btn-1 flex items-center gap-2 hover:outline-2 outline-[var(--background)]"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create <span className="max-sm:hidden"> New Ticket</span>
          </button>
        </div>

        {tickets.length === 0 ? (
          <div className="bg-[var(--background)] rounded-2xl p-12 text-center shadow-lg">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mb-2">No tickets yet</h3>
            <p className="mb-6">Create your first ticket to get started</p>
            <button onClick={openCreateModal} className="btn-1">
              Create Ticket
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-[var(--background)] rounded-2xl p-6 shadow-md hover:shadow-lg transition flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      ticket.status
                    )}`}
                  >
                    {ticket.status.replace("_", " ").toUpperCase()}
                  </span>
                  <span
                    className={`text-xs font-semibold ${getPriorityColor(
                      ticket.priority
                    )}`}
                  >
                    {ticket.priority?.toUpperCase() || "MEDIUM"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 grow">
                  {ticket.title}
                </h3>
                {ticket.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {ticket.description}
                  </p>
                )}
                
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(ticket)}
                    className="flex-1 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-[var(--background)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <form noValidate className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {editingTicket ? "Edit Ticket" : "Create New Ticket"}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl!"
                >
                  ×
                </button>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter ticket title"
                  />
                  {errors.title && (
                    <span className="text-red-500 text-sm mt-1">{errors.title}</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={2}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    }`}placeholder="Enter ticket description (optional)"
                  />
                  {errors.description && (
                    <span className="text-red-500 text-sm mt-1">{errors.description}</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 btn-1"
                  >
                    {editingTicket ? "Update " : "Create "}
                    <span className="max-sm:hidden">Ticket</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tickets;
