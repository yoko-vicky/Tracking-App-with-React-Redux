const authHeaders = () => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};

export default authHeaders;
