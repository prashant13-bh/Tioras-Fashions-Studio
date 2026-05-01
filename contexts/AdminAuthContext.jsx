"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { adminPb } from "@/lib/pocketbase";

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
    const stored = adminPb.authStore.model;
    if (stored && (stored.role === "admin" || stored.isAdmin)) {
      setAdmin(stored);
      setIsAdmin(true);
    }
  }, []);

  const loginAdmin = async (email, password) => {
    try {
      const authData = await adminPb
        .collection("users")
        .authWithPassword(email, password);
      
      // Allow both 'role === admin' or 'isAdmin === true' for flexibility
      if (authData.record.role !== "admin" && !authData.record.isAdmin) {
        adminPb.authStore.clear();
        return { success: false, error: "Access restricted to administrators" };
      }
      
      setAdmin(authData.record);
      setIsAdmin(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logoutAdmin = () => {
    adminPb.authStore.clear();
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
