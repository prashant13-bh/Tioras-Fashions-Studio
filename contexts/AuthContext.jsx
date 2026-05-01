"use client";

import { createContext, useContext, useState, useEffect } from "react";
import pb from "@/lib/pocketbase";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize from stored auth
    setCurrentUser(pb.authStore.model);
    setIsAuthenticated(pb.authStore.isValid);
    setLoading(false);

    const unsubscribe = pb.authStore.onChange((_token, model) => {
      setCurrentUser(model);
      setIsAuthenticated(pb.authStore.isValid);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
      setCurrentUser(authData.record);
      setIsAuthenticated(true);
      return { success: true, user: authData.record };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    }
  };

  const signup = async (email, password, passwordConfirm, name) => {
    try {
      const record = await pb.collection("users").create({
        email,
        password,
        passwordConfirm,
        name,
        role: "user",
      });
      await login(email, password);
      return { success: true, user: record };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    pb.authStore.clear();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
