import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import RenameOrganizationModal from "./RenameOrganizationModal";
import InviteMemberModal from "./InviteMemberModal";
import { getUserOrgs, setActiveOrg as apiSetActiveOrg, getOrganizationById } from "../api/org";

export default function OrgDropdown() {
  const { activeOrg, setActiveOrg, user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [orgs, setOrgs] = useState([]);

  // Fetch all organizations for the user
  useEffect(() => {
    if (!user?.id) return;

    const fetchOrgs = async () => {
      try {
        const data = await getUserOrgs(user.id);
        
         console.log(data.memberships)
        const memberships = data.memberships || [];

      // Fetch organization details for each membership
      const orgsWithNames = await Promise.all(
        memberships.map(async (m) => {
          const orgData = await getOrganizationById(m.organization_id);
          return {
            organization_id: m.organization_id,
            id:m.id,
            role: m.role,
            name: orgData.org.name, // adjust according to API response
          };
        })
      );

        setOrgs(orgsWithNames || []);
      } catch (err) {
        console.error("Failed to fetch organizations:", err);
      }
    };

    fetchOrgs();
  }, [user]);

  const handleSwitchOrg = async (org) => {
   // console.log(org)
    try {
      await apiSetActiveOrg(user.id,org.organization_id); // backend API call to set active org
      const setorgdata={id:org.organization_id,name:org.name};
      
      setActiveOrg(setorgdata);             // update context
      setOpen(false);                // close dropdown
    } catch (err) {
      console.error("Failed to switch organization:", err);
    }
  };

  const handleRename = (newName) => {
    if (newName) setActiveOrg((prev) => ({ ...prev, name: newName }));
    setShowRename(false);
  };

  return (
    <div className="position-relative me-3">
      <button
        className="btn btn-sm btn-outline-primary"
        onClick={() => setOpen((prev) => !prev)}
      >
        {activeOrg?.name || "No Org"}
      </button>

      {open && (
        <ul
          className="dropdown-menu show"
          style={{ position: "absolute", right: -111, top: "100%" }}
        >
          {/* Switch Organization */}
          {orgs.map((org) => (
            <li key={org.id}>
              <button
                className={`dropdown-item ${
                  activeOrg?.id === org.id ? "fw-bold" : ""
                }`}
                onClick={() => handleSwitchOrg(org)}
              >
                {org.name}
              </button>
            </li>
          ))}
          <li>
            <hr className="dropdown-divider" />
          </li>

          {/* Rename */}
          <li>
            <button
              className="dropdown-item"
              onClick={() => setShowRename(true)}
            >
              Rename Organization
            </button>
          </li>

          {/* Invite */}
          <li>
            <button
              className="dropdown-item"
              onClick={() => setShowInvite(true)}
            >
              Invite Member
            </button>
          </li>
        </ul>
      )}

      {/* Modals */}
      {showRename && (
        <RenameOrganizationModal org={activeOrg} onRename={handleRename} />
      )}
      {showInvite && (
        <InviteMemberModal
          orgId={activeOrg?.id}
          onClose={() => setShowInvite(false)}
        />
      )}
    </div>
  );
}
