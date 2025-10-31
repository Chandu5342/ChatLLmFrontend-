// src/components/UserDropdown.jsx
import React, { useState, useContext } from "react";
import { User as UserIcon } from "lucide-react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function UserDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const { setUser, setActiveOrg } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setActiveOrg(null);
    navigate("/login");
  };

  return (
    <div className="position-relative">
      <button
        className="btn btn-sm btn-light d-flex align-items-center"
        onClick={() => setOpen((prev) => !prev)}
      >
        <UserIcon size={18} className="me-2" />
        {user?.username || "Guest"}
      </button>

      {open && (
        <ul
          className="dropdown-menu show"
          style={{ position: "absolute", right: 0, top: "100%" }}
        >
          <li>
            <button className="dropdown-item">Profile</button>
          </li>
          <li>
            <button className="dropdown-item text-danger" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
