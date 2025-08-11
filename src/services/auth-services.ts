import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const signInService = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const signUpService = async (
  name: string,
  avatar: string,
  email: string,
  password: string
) => {
  try {
    const response = await axiosInstance.post("/users", {
      name,
      email,
      password,
      avatar,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
