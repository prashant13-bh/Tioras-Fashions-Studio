"use client";

import { createContext, useContext, useState, useEffect } from "react";
import pb from "@/lib/pocketbase";

const AdminAuthContext = createContext(null);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context)
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const stored = pb.authStore.model;
    if (stored && stored.role === "admin") {
      setAdmin(stored);
      setIsAdmin(true);
    }
  }, []);

  const loginAdmin = async (email, password) => {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
      if (authData.record.role !== "admin") {
        pb.authStore.clear();
        return { success: false, error: "Not an admin account" };
      }
      setAdmin(authData.record);
      setIsAdmin(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logoutAdmin = () => {
    pb.authStore.clear();
    setAdmin(null);
    setIsAdmin(false);
  };

  return (
    <AdminAuthContext.Provider
      value={{ admin, isAdmin, loginAdmin, logoutAdmin }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
