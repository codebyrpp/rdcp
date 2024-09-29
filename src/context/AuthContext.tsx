import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/redux/apiSlices.ts/authApiSlice";
import { RootState } from "@/redux/store";
import {
  revokeAuth,
  setAuth,
} from "@/redux/slices/authSlice";

// Define the AuthContext type with login and logout
interface AuthContextType {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  // Login mutation
  const [loginMutation] = useLoginMutation();

  // Function to handle login
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Call the login mutation
      const res = await loginMutation({ email, password }).unwrap();
      // setAuthState(res);
      dispatch(
        setAuth({
          refreshToken: res.refreshToken,
          accessToken: res.accessToken,
          user: {
            id: res.id,
            name: res.name,
            email: res.email,
          },
        })
      );

      console.log("Login successful");
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  // Function to handle logout
  const logout = async () => {
    console.log("Logging out");
    dispatch(revokeAuth());
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
