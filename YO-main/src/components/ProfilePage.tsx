import React from "react";
import { useAuth } from "./auth/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) return <p>Please login to see your profile.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default ProfilePage;
