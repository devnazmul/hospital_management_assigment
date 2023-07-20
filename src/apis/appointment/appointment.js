
// ===========================================
// #00124
// ===========================================

import axios from 'axios';

// GET APIS =====================================================
export const getAllAppointments = async () => {
  const jwt = localStorage.getItem('token')
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt}`
    },
  };
  return await axios.get(`/api/v1/appointment/get-all`, config)
    .then(res => {
      return res?.data;
    })
    .catch(err => {
      throw err
    })
}


// POST APIS =====================================================
export const createAppointment = async (data) => {
  const jwt = localStorage.getItem('token')
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt}`
    },
  };
  
  return await axios.post(`/api/v1/appointment/create`, data, config)
    .then(res => {
      return res?.data;
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
  return await axios.post(`/api/v1/auth/login`, data, config)
    .then(res => {
      return res?.data;
    })
    .catch(err => {
      throw err
    })
}
