
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

// PATCH APIS =====================================================
export const approveAppointment = async (id) => {
  const jwt = localStorage.getItem('token')
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt}`
    },
  };

  return await axios.patch(`/api/v1/appointment/approve/${id}`,{}, config)
    .then(res => {
      return res?.data;
    })
    .catch(err => {
      throw err
    })
}
export const updateAppointment = async (id,data) => {
  const jwt = localStorage.getItem('token')
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt}`
    },
  };

  return await axios.patch(`/api/v1/appointment/update/${id}`,data, config)
    .then(res => {
      return res?.data;
    })
    .catch(err => {
      throw err
    })
}
export const rejectAppointment = async (id) => {
  const jwt = localStorage.getItem('token')
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt}`
    },
  };

  return await axios.patch(`/api/v1/appointment/reject/${id}`,{}, config)
    .then(res => {
      return res?.data;
    })
    .catch(err => {
      throw err
    })
}


// DELETE API ================================================ 
export const deleteAppointment = async (id) => {
  const jwt = localStorage.getItem('token')
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt}`
    },
  };

  return await axios.delete(`/api/v1/appointment/delete/${id}`, config)
    .then(res => {
      return res?.data;
    })
    .catch(err => {
      throw err
    })
}

