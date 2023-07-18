// ===========================================
// #00123
// ===========================================

import axios from 'axios';

// GET APIS =====================================================
export const getAllLandlords = async ({
  perPage=5,
  pageNo = 1,
  start_date = '',
  end_date = '',
  search_key = ''
}) => {
  // GET DISH BY ID
  const jwt = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  };
  return await axios
    .get(
      `/landlords/${perPage}?page=${pageNo}?start_date=${start_date}&end_date=${end_date}&search_key=${search_key}`,
      config
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const getSingleLandlord = async (id) => {
  const jwt = localStorage.getItem('token');
  const config = {
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
      },
  };
  return await axios
      .get(
          `/landlords/get/single/${id}`,
          config
      )
      .then((res) => {
          return res.data;
      })
      .catch((err) => {
          throw err;
      });
};
// POST APIS =====================================================
export const createLandlord = async (data) => {
  const jwt = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  };
  return await axios
    .post(`/landlords`, data, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// PUT APIS =====================================================
export const updateSingleLandlord = async (data) => {
  const jwt = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  };
  return await axios
    .put(`/landlords`, data, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// DELETE APIS =====================================================
export const deleteSingleLandlord = async (id) => {
  const jwt = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  };
  return await axios
    .delete(`/landlords/${id}`, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
