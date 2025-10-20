// src/pages/Organizations.jsx
import React, { useEffect, useState, useContext } from 'react';
import { getUserOrgs } from '../api/org';
import { UserContext } from '../context/UserContext';
import OrgItem from '../components/OrgItem';

function Organizations() {
  const { user } = useContext(UserContext);
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrgs = async () => {
      if (!user) return;
      try {
        const res = await getUserOrgs(user.id);
        setOrgs(res.memberships.map(m => ({ id: m.organization_id, name: m.organization?.name || `${user.username}'s Org` })));
      } catch (err) {
        console.error('Failed to fetch orgs', err);
      }
      setLoading(false);
    };
    fetchOrgs();
  }, [user]);

  if (loading) return <div>Loading organizations...</div>;

  return (
    <div className="container mt-5">
      <h2>Your Organizations</h2>
      {orgs.length ? orgs.map(org => <OrgItem key={org.id} org={org} />) : <p>No organizations found.</p>}
    </div>
  );
}

export default Organizations;
