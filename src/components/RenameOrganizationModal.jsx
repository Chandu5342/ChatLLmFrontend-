import React, { useState } from "react";
import { renameOrganization } from "../api/org";

export default function RenameOrganizationModal({ org, onRename }) {
  const [name, setName] = useState(org?.name || "");
  const [loading, setLoading] = useState(false);

  const handleRename = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await renameOrganization(org.id, name);
      onRename(name); // Update parent state
    } catch (err) {
      console.error("Failed to rename organization:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal" tabIndex="-1" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Rename Organization</h5>
            <button type="button" className="btn-close" onClick={() => onRename(null)}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => onRename(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleRename} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
