// ===========================================
// #00139
// ===========================================

import axios from 'axios';

// GET APIS =====================================================
export const getAllRepairItems = async ({
    perPage = 5,
    pageNo = 1,
    start_date = '',
    end_date = '',
    search_key = ''
}) => {
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
            `/repairs/${perPage}?page=${pageNo}?start_date=${start_date}&end_date=${end_date}&search_key=${search_key}`,
            config
        )
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};


export const getSingleRepairItem = async (id) => {
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
            `/repairs/get/single/${id}`,
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
export const uploadRepairItemRecipt = async (data) => {
    const jwt = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    };
    const formData = new FormData();
    data.forEach((file) => {
        formData.append('files[]', file);
    });

    return await axios
        .post(`/repair-receipts-file/multiple`, formData, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};

export const uploadMultiRepairItemImages = async (data) => {
    const jwt = localStorage.getItem('token');
    const config = {
        headers: {

            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    };
    const formData = new FormData();
    data.forEach((file) => {
        formData.append('images[]', file);
    });
    return await axios
        .post(`/repair-images/multiple`, formData, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};


export const createRepairItem = async (data) => {
    const jwt = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    };
    return await axios
        .post(`/repairs`, data, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};



// PUT APIS =====================================================
export const updateSingleRepairItem = async (data) => {
    const jwt = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    };
    return await axios
        .put(`/repairs`, data, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};


// DELETE APIS =====================================================
export const deleteSingleRepairItem = async (id) => {
    const jwt = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    };
    return await axios
        .delete(`/repairs/${id}`, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};
