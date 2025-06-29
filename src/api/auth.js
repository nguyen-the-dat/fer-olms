// src/api/auth.js

const API_URL = "http://localhost:3001";

export async function registerUser({ email, password, name, role }) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name, role }),
    });

    const data = await response.json();
    console.log("Registration response:", data);
    if (!response.ok) {
      throw new Error(data?.message || data || "Registration failed");
    }

    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("Unknown error occurred during registration");
    }
  }
}

export async function createCredentialLogin(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || data || "Login failed");
    }
    console.log("Login response:", data);
    return data; 
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("An unknown error occurred during login");
    }
  }
}