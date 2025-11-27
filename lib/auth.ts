export const login = async (email: string, password: string) => {
  // Fake login
  return { token: "fake-token", user: { email } };
};

export const register = async (email: string, password: string) => {
  return { token: "fake-token", user: { email } };
};
