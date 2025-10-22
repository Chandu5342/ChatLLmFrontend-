import API from './axios';

// Get all orgs user belongs to
export const getUserOrgs = async (user_id) => {
  const response = await API.get(`/orgs/${user_id}`);
  return response.data;
};

// Set active organization
export const setActiveOrg = async (user_id, organization_id) => {
  console.log(user_id,organization_id)
  const response = await API.put('/orgs/active', { user_id, organization_id });
  return response.data;
};

// Rename organization
export const renameOrganization = async (organization_id, new_name) => {
  const response = await API.put('/orgs/rename', { organization_id, new_name });
  return response.data;
};

// Invite member
export const inviteMember = async (organization_id, email, role = 'member') => {
  const response = await API.post('/orgs/invite', { organization_id, email, role });
  return response.data;
};


export const getOrganizationById = async (organization_id) => {
 
  const response = await API.get(`/orgs/orgbyid/${organization_id}`);
  return response.data;
};