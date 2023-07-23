
// ===========================================
// #00124
// ===========================================

import axios from 'axios';

// GET APIS =====================================================
export const getAllsNotification = async (id) => {
  const jwt = localStorage.getItem('token')
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt}`
    },
  };
  return await axios.get(`/api/v1/notification/get-all`, config)
    .then(res => {
        console.log(id,res?.data)
      return res?.data;
    })
    .catch(err => {
      throw err
    })
}


// POST APIS =====================================================
export const createNotification = async (data) => {
  const jwt = localStorage.getItem('token')
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt}`
    },
  };
  
  return await axios.post(`/api/v1/notification/create`, data, config)
    .then(res => {
      return res?.data;
    })
    .catch(err => {
      throw err
    })
}
export const markAsReadNotification = async (id) => {
  const jwt = localStorage.getItem('token')
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt}`
    },
  };
  
  return await axios.patch(`/api/v1/notification/update/${id}`, {}, config)
    .then(res => {
      return res?.data;
    })
    .catch(err => {
      throw err
    })
}
export const deleteNotification = async (id) => {
  const jwt = localStorage.getItem('token')
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt}`
    },
  };
  
  return await axios.delete(`/api/v1/notification/delete/${id}`, config)
    .then(res => {
      return res?.data;
    })
    .catch(err => {
      throw err
    })
}

