import React from "react";

export default function NotificationPanel({ visible, onClose, notifications = [] }) {
  if (!visible) return null;

  return (
    <div
      className="position-absolute bg-white shadow rounded p-3"
      style={{
        top: "60px",
        right: "20px",
        width: "300px",
        maxHeight: "400px",
        overflowY: "auto",
        zIndex: 50,
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="m-0">Notifications</h6>
        <button className="btn btn-sm btn-light" onClick={onClose}>
          Close
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="text-muted">No notifications yet.</div>
      ) : (
        notifications.map((n) => (
          <div key={n.id} className="border-bottom py-1">
            {n.message}
          </div>
        ))
      )}
    </div>
  );
}
