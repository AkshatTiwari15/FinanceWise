import React, { useState } from "react";
import { useAuth } from "./AuthContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register" | "reset";
}

const AuthModal: React.FC<Props> = ({ isOpen, onClose, initialMode = "login" }) => {
  const { login, register, resetPassword } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setMessage("");

    if (mode === "login") {
      const ok = await login(email, password);
      if (!ok) return setMessage("Invalid email or password");
      onClose();
    }

    if (mode === "register") {
      const ok = await register(name, email, password);
      if (!ok) return setMessage("User already exists");
      onClose();
    }

    if (mode === "reset") {
      const ok = await resetPassword(email, password);
      if (!ok) return setMessage("Email not found");
      setMessage("Password reset successful. You can login now.");
      setMode("login");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">{mode === "login" ? "Sign In" : mode === "register" ? "Register" : "Reset Password"}</h2>

        {message && <p className="text-red-500 text-sm mb-2">{message}</p>}

        {mode === "register" && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />

        {(mode !== "reset" || mode === "reset") && (
          <input
            type="password"
            placeholder={mode === "reset" ? "New Password" : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
        >
          {mode === "login" ? "Login" : mode === "register" ? "Register" : "Reset Password"}
        </button>

        <p className="text-center text-sm mt-3">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <span className="text-emerald-600 cursor-pointer" onClick={() => setMode("register")}>
                Register
              </span>{" "}
              | Forgot password?{" "}
              <span className="text-emerald-600 cursor-pointer" onClick={() => setMode("reset")}>
                Reset
              </span>
            </>
          ) : mode === "register" ? (
            <>
              Already have an account?{" "}
              <span className="text-emerald-600 cursor-pointer" onClick={() => setMode("login")}>
                Login
              </span>
            </>
          ) : (
            <>
              Remembered?{" "}
              <span className="text-emerald-600 cursor-pointer" onClick={() => setMode("login")}>
                Login
              </span>
            </>
          )}
        </p>

        <button className="mt-4 w-full py-2 border rounded-lg" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AuthModal;
