
// ===========================================
// #00124
// ===========================================

import axios from 'axios';

// GET APIS =====================================================
export const getUserByToken = async () => {
  const jwt = localStorage.getItem('token')
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt}`
    },
  };
  return await axios.get(`/user`, config)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw err
    })
}
// POST APIS =====================================================
export const registration = async (data) => {
  const jwt = localStorage.getItem('token')
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt}`
    },
  };
  
  return await axios.post(`/auth/register-with-business`, data, config)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw err
    })
}


export const login = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.post(`/login`, data, config)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw err
    })
}
