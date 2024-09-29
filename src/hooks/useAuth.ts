import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/redux/apiSlices.ts/authApiSlice";
import { RootState } from "@/redux/store";
import {
  revokeAuth,
  setAuth,
} from "@/redux/slices/authSlice";

// Custom useAuth hook
export const useAuth = () => {
  const dispatch = useDispatch();

  // Access the current authentication state from Redux
  const authState = useSelector((state: RootState) => state.auth);

  // Login mutation
  const [loginMutation] = useLoginMutation();

  // Function to handle login
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Call the login mutation
      const res = await loginMutation({ email, password }).unwrap();

      // Dispatch the setAuth action to save auth state
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

  return {
    authState,  // Provides the current auth state (accessToken, refreshToken, user info)
    login,      // Provides login functionality
    logout,     // Provides logout functionality
  };
};
