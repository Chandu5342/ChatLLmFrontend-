// src/components/OrgItem.jsx
import React, { useState, useContext } from 'react';
import { setActiveOrg, renameOrganization, inviteMember } from '../api/org';
import { UserContext } from '../context/UserContext';
import InviteMemberModal from './InviteMemberModal';

function OrgItem({ org }) {
  const { user, setActiveOrg: setContextActiveOrg } = useContext(UserContext);
  const [newName, setNewName] = useState(org.name);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const handleSwitch = async () => {
    await setActiveOrg(user.id, org.id);
    setContextActiveOrg({ id: org.id, name: org.name });
  };

  const handleRename = async () => {
    const res = await renameOrganization(org.id, newName);
    alert(`Organization renamed to: ${res.org.name}`);
  };

  return (
    <div className="card mb-2 p-3">
      <h5>{org.name}</h5>
      <div className="d-flex gap-2 mt-2">
        <button className="btn btn-primary btn-sm" onClick={handleSwitch}>Switch</button>
        <button className="btn btn-secondary btn-sm" onClick={() => setShowInviteModal(true)}>Invite</button>
      </div>
      <div className="mt-2 d-flex gap-2">
        <input type="text" value={newName} onChange={e => setNewName(e.target.value)} className="form-control form-control-sm" />
        <button className="btn btn-outline-success btn-sm" onClick={handleRename}>Rename</button>
      </div>

      {showInviteModal && <InviteMemberModal orgId={org.id} onClose={() => setShowInviteModal(false)} />}
    </div>
  );
}

export default OrgItem;
