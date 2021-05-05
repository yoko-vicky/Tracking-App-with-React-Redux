export const user = {
  admin: false,
  created_at: expect.any(String),
  id: 2,
  password_digest: expect.any(String),
  updated_at: expect.any(String),
  username: 'vicky',
};

export const storedUser = {
  logIn: true,
  user,
};
