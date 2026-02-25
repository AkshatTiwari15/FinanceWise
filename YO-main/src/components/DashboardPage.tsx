import React from "react";
import { useAuth } from "./auth/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();

  if (!user) return <p>Please login to see your dashboard.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {user.name}! Here you can access your tools and articles.</p>
    </div>
  );
};

export default DashboardPage;
