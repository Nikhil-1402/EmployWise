import axios from "axios";

const API_URL = "https://reqres.in/api";

export const login = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/login`, body);
    localStorage.setItem("token", response.data.token);
    return response;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const fetchUsers = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: {
        page: page,
      },
    });
    return response;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export const editUser = async (id, body) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/users/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
