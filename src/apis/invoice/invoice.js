// ===========================================
// #00166
// ===========================================

import axios from 'axios';

// GET APIS =====================================================
export const getAllInvoices = async ({
  perPage = 5,
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
      `/invoices/${perPage}?page=${pageNo}?start_date=${start_date}&end_date=${end_date}&search_key=${search_key}`,
      config
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const validateInvoiceNumber = async (invoice_number) => {
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
      `/invoices/generate/invoice-reference/${invoice_number}`,
      config
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const getInvoiceNumber = async () => {
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
      `/invoices/generate/invoice-reference`,
      config
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const getSingleInvoice = async (id) => {
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
      `/invoices/get/single/${id}`,
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
export const payInvoice = async (data) => {
  const jwt = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  };
  return await axios
    .post(`/invoice-payments`, data, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const sendInvoicePayRecipt = async (data) => {
  const jwt = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  };
  return await axios
    .post(`/invoice-payments/send-receipt-email`, data, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const createInvoice = async (data) => {
  const jwt = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  };
  return await axios
    .post(`/invoices`, data, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const uploadInvoiceLogo = async (data) => {
  console.log(data)
  const jwt = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  };
  const formData = new FormData();
  
  formData.append('image', data);

  return await axios
    .post(`/invoice-image`, formData, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
// PUT APIS =====================================================
export const updateSingleInvoice = async (data) => {
  const jwt = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  };
  return await axios
    .put(`/invoices`, data, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
export const sendInvoice = async (data) => {
  const jwt = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  };
  return await axios
    .put(`/invoices/send`, data, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// DELETE APIS =====================================================
export const deleteSingleInvoice = async (id) => {
  const jwt = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  };
  return await axios
    .delete(`/invoices/${id}`, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
