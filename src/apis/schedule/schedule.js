
// ===========================================
// #00124
// ===========================================

import axios from 'axios';

// GET APIS =====================================================
export const getAllschedules = async (id) => {
  const jwt = localStorage.getItem('token')
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt}`
    },
  };
  return await axios.get(`/api/v1/schedule/get/${id}`, config)
    .then(res => {
        console.log(id,res?.data)
      return res?.data;
    })
    .catch(err => {
      throw err
    })
}


// POST APIS =====================================================
export const createSchedule = async (data) => {
  const jwt = localStorage.getItem('token')
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt}`
    },
  };
  
  return await axios.post(`/api/v1/schedule/create`, data, config)
    .then(res => {
      return res?.data;
    })
    .catch(err => {
      throw err
    })
}

