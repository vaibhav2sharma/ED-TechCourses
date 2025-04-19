import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const hardcodedUsers = [
  { email: 'alice@example.com', password: '123456' },
  { email: 'bob@example.com', password: 'password' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const matchedUser = hardcodedUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (matchedUser) {
      setUser({ email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
