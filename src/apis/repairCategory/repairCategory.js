// ===========================================
// #00142
// ===========================================

import axios from 'axios';

// GET APIS =====================================================
export const getAllRepairCategories = async ({
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
            `/repair-categories/${perPage}?page=${pageNo}?start_date=${start_date}&end_date=${end_date}&search_key=${search_key}`,
            config
        )
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};


export const getSingleRepairCategory = async (id) => {
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
            `/repair-categories/get/single/${id}`,
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
export const createRepairCategory = async (data) => {
    const jwt = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    };
    return await axios
        .post(`/repair-categories`, data, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};



// PUT APIS =====================================================
export const updateSingleRepairCategory = async (data) => {
    const jwt = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    };
    return await axios
        .put(`/repair-categories`, data, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};


// DELETE APIS =====================================================
export const deleteSingleRepairCategory = async (id) => {
    const jwt = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    };
    return await axios
        .delete(`/repair-categories/${id}`, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};
