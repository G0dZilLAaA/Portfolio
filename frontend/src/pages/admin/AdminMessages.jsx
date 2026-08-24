import { useMemo, useState } from "react";

const initialMessages = [
    {
        id: "msg-1",
        sender: "paul@design.com",
        subject: "Can we discuss a new website?",
        preview: "I loved your recent work and would like to explore an update for our studio.",
        unread: true,
        date: "Today"
    },
    {
        id: "msg-2",
        sender: "support@startup.io",
        subject: "Question about your feature set",
        preview: "Are you open to a new long-term collaboration around API and analytics?",
        unread: false,
        date: "Yesterday"
    },
    {
        id: "msg-3",
        sender: "hr@company.com",
        subject: "Invitation to speak at event",
        preview: "We would love to invite you to present your portfolio in September.",
        unread: true,
        date: "2 days ago"
    }
];

export default function AdminMessages() {
    const [messages, setMessages] = useState(initialMessages);
    const [search, setSearch] = useState("");

    const filteredMessages = useMemo(() => {
        return messages.filter((message) => {
            const query = search.toLowerCase();
            return (
                message.sender.toLowerCase().includes(query) ||
                message.subject.toLowerCase().includes(query) ||
                message.preview.toLowerCase().includes(query)
            );
        });
    }, [messages, search]);

    const unreadCount = messages.filter((message) => message.unread).length;

    const toggleRead = (id) => {
        setMessages((current) =>
            current.map((message) =>
                message.id === id ? { ...message, unread: !message.unread } : message
            )
        );
    };

    const handleDelete = (id) => {
        setMessages((current) => current.filter((message) => message.id !== id));
    };

    return (
        <div className="admin-section space-y-8">
            <div className="admin-page-heading">
                <div>
                    <p className="badge-pill">Messages</p>
                    <h1 className="type-heading">Contact submissions</h1>
                </div>
                <span className="badge-pill badge-primary">{unreadCount} unread</span>
            </div>

            <div className="card-panel admin-filter-panel">
                <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search messages"
                    className="admin-input w-full"
                />
            </div>

            <div className="card-panel admin-messages-panel">
                {filteredMessages.length === 0 ? (
                    <p className="type-copy text-muted-soft">No messages found.</p>
                ) : (
                    <div className="admin-message-list">
                        {filteredMessages.map((message) => (
                            <article key={message.id} className={`admin-message-card ${message.unread ? "unread" : ""}`}>
                                <div className="admin-message-meta">
                                    <span className="type-body-semibold">{message.subject}</span>
                                    <span className="type-copy text-muted-soft">{message.date}</span>
                                </div>
                                <p className="type-copy text-muted-soft">From {message.sender}</p>
                                <p className="type-copy mt-3">{message.preview}</p>
                                <div className="admin-message-actions">
                                    <button className="btn btn-secondary btn-small" onClick={() => toggleRead(message.id)}>
                                        {message.unread ? "Mark as read" : "Mark as unread"}
                                    </button>
                                    <button className="btn btn-secondary btn-small" onClick={() => handleDelete(message.id)}>
                                        Delete
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
