import { RegisterFormData } from "./Pages/Register";
import { SignInFormData } from "./Pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const responseBody = await response.json();

    if (!response.ok) {
      throw new Error(responseBody.message);
    }
  } catch (error) {
    // Handle any errors h ere
    console.error("Registration error:", error);
    throw error; // Re-throw the error for further handling
  }
};

export const signIn = async (formData:SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`,{
    method:"POST",
    credentials:"include",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(formData)
  })

  const body = await response.json();
  if(!response.ok){
    throw new Error(body.message);
  } 
  return body;
  
}


export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
};
