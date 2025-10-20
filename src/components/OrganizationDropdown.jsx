import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { getUserOrgs, setActiveOrg } from "../api/org";

export default function OrganizationDropdown() {
  const { user, activeOrg, setActiveOrg: setActiveOrgContext } = useContext(UserContext);
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchOrgs = async () => {
      setLoading(true);
      try {
        const data = await getUserOrgs(user.id);
        setOrgs(data.organizations || []);
      } catch (err) {
        console.error("Failed to fetch organizations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrgs();
  }, [user]);

  const handleSwitchOrg = async (orgId) => {
    try {
      await setActiveOrg(orgId);
      const newActiveOrg = orgs.find((o) => o.id === orgId);
      setActiveOrgContext(newActiveOrg);
    } catch (err) {
      console.error("Failed to switch organization:", err);
    }
  };

  if (loading) return <div>Loading organizations...</div>;

  return (
    <div className="dropdown">
      <button
        className="btn btn-sm btn-light dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {activeOrg?.name || "Select Organization"}
      </button>
      <ul className="dropdown-menu">
        {orgs.map((org) => (
          <li key={org.id}>
            <button
              className={`dropdown-item ${activeOrg?.id === org.id ? "active" : ""}`}
              onClick={() => handleSwitchOrg(org.id)}
            >
              {org.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
