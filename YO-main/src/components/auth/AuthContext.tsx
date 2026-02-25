import React, { createContext, useContext, useState, useEffect } from "react";
import bcrypt from "bcryptjs";

interface User {
  name: string;
  email: string;
}

interface StoredUser extends User {
  passwordHash: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("fw_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = async (email: string, password: string) => {
    const savedUsers: StoredUser[] = JSON.parse(localStorage.getItem("fw_users") || "[]");

    const existingUser = savedUsers.find(u => u.email === email);
    if (!existingUser) return false;

    const match = await bcrypt.compare(password, existingUser.passwordHash);
    if (!match) return false;

    const loggedUser: User = { name: existingUser.name, email: existingUser.email };
    setUser(loggedUser);
    localStorage.setItem("fw_user", JSON.stringify(loggedUser));
    return true;
  };

  const register = async (name: string, email: string, password: string) => {
    let savedUsers: StoredUser[] = JSON.parse(localStorage.getItem("fw_users") || "[]");

    if (savedUsers.some(u => u.email === email)) return false;

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser: StoredUser = { name, email, passwordHash };
    savedUsers.push(newUser);

    localStorage.setItem("fw_users", JSON.stringify(savedUsers));

    // Auto-login after register
    const loggedUser: User = { name, email };
    setUser(loggedUser);
    localStorage.setItem("fw_user", JSON.stringify(loggedUser));

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fw_user");
  };

  const resetPassword = async (email: string, newPassword: string) => {
    let savedUsers: StoredUser[] = JSON.parse(localStorage.getItem("fw_users") || "[]");
    const userIndex = savedUsers.findIndex(u => u.email === email);
    if (userIndex === -1) return false;

    const passwordHash = await bcrypt.hash(newPassword, 10);
    savedUsers[userIndex].passwordHash = passwordHash;

    localStorage.setItem("fw_users", JSON.stringify(savedUsers));
    return true;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
