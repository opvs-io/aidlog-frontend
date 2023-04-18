const urls = {
  requests: {
    create: '/requests',
    findAllByRequester: (requesterId: string) =>
      `/requests/requester/${requesterId}`,
    findAllByOrganization: (organizationId: number) =>
      `/requests/organization/${organizationId}`,
  },
};

export default urls;
