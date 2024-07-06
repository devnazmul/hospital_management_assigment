// ===========================================
// #00124
// ===========================================

import axios from "axios";

// GET APIS =====================================================
export const getUserByToken = async () => {
  const jwt = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  return await axios
    .get(`/api/v1/auth/get-withjwt`, config)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const getDashboardData = async () => {
  const jwt = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  return await axios
    .get(`/api/v1/auth/dashboard`, config)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const getUserByRole = async (role) => {
  const jwt = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  return await axios
    .get(`/api/v1/auth/get-all/${role}`, config)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      throw err;
    });
};
// POST APIS =====================================================
export const registration = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return await axios
    .post(`/api/v1/auth/registration`, data, config)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const login = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios
    .post(`/api/v1/auth/login`, data, config)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      throw err;
    });
};
