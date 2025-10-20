// src/context/UserContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { getUserById } from '../api/user';
import { getOrganizationById, getUserOrgs } from '../api/org';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [activeOrg, setActiveOrg] = useState(null); // store full org object
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Decode token to get user id
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userRes = await getUserById(payload.id);
        setUser(userRes.user);

        // Fetch user's orgs
        const orgsRes = await getUserOrgs(userRes.user.id);
   
        // Find the active membership
        const activeMembership = orgsRes.memberships.find(
          (m) => m.organization_id === userRes.user.active_org_id
        );
        const res=await getOrganizationById(activeMembership.organization_id);
        activeMembership.organization={name:res.org.name}
      
        // ✅ Safe access: fallback if organization object is missing
        setActiveOrg({
          id: activeMembership?.organization_id,
          name: activeMembership?.organization?.name || `${userRes.user.username}'s Org`,
        });
      } catch (err) {
        console.error('Failed to fetch user/org:', err);
        setUser(null);
        setActiveOrg(null);
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, activeOrg, setActiveOrg, loading }}>
      {children}
    </UserContext.Provider>
  );
};
