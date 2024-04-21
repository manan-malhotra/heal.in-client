import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState();

  useEffect(() => {
    console.log(process.env.API_HOST);
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token); // Set isAuthenticated to true if token exists, false otherwise
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        try {
          const profileResponse = await axios.get(
            process.env.API_HOST + "/api/user/getProfile"
          );
          if (profileResponse.status === 200) {
            const data = profileResponse.data;
            const strAge = String(data.age);
            const strUserId = String(data.userId);
            const strcontact = String(data.contact);
            const userId = String(data.userId);
            await AsyncStorage.setItem("userId", userId);
            await AsyncStorage.setItem("firstName", data.firstName);
            await AsyncStorage.setItem("age", strAge);
            await AsyncStorage.setItem("lastName", data.lastName);
            await AsyncStorage.setItem("email", data.email);
            await AsyncStorage.setItem("gender", data.gender);
            await AsyncStorage.setItem("role", data.role);
            await AsyncStorage.setItem("contact", strcontact);
            await AsyncStorage.setItem("userId", strUserId);
            if (data) setUser(data);
          }
        } catch {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("firstName");
          await AsyncStorage.removeItem("age");
          await AsyncStorage.removeItem("lastName");
          await AsyncStorage.removeItem("email");
          await AsyncStorage.removeItem("gender");
          await AsyncStorage.removeItem("role");
          await AsyncStorage.removeItem("contact");
          await AsyncStorage.removeItem("userId");
          axios.defaults.headers.common["Authorization"] = "";
          setIsAuthenticated(false);
        }
      }
    };
    loadToken();
  }, [isAuthenticated]);

  const login = async (email, password) => {
    console.log("aagya");
    try {
      const response = await axios.post(
        process.env.API_HOST + "/api/user/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.status === 200) {
        const bearer = response.headers.get("Authorization");
        const token = bearer.split(" ")[1];
        await AsyncStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
      //Wrong Username
      // 409 - wrong username, 401 - wrong password, 502 - server down
      if (
        error.response.status == 409 ||
        error.response.status == 401 ||
        error.response.status == 502
      ) {
        console.log(error.response.status);
        return error.response.status;
      }

      console.log("Error logging in: ", error);
      setIsAuthenticated(false);
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(
        process.env.API_HOST + "/api/user/register",
        userData
      );

      if (response.status === 200) {
        const bearer = response.headers.get("Authorization");
        const token = bearer.split(" ")[1];
        await AsyncStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log("Error registering: ", error);
      if (error.response.status == 403) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Email already exists",
          position: "top",
          visibilityTime: 3000,
        });

        return;
      }
      setIsAuthenticated(false);
    }
  };
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      axios.defaults.headers.common["Authorization"] = "";
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        role,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  const { isAuthenticated } = value;
  const { user } = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return value;
};
