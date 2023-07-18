// ===========================================
// #00131
// ===========================================
import axios from 'axios';

// GET APIS =====================================================
export const getAllUsers = async ({
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
            `/users/${perPage}?page=${pageNo}?start_date=${start_date}&end_date=${end_date}&search_key=${search_key}`,
            config
        )
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};

export const getUserWithBusiness = async () => {
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
            `/user-with-business`,
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
export const createTenant = async (data) => {
    const jwt = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    };
    return await axios
        .post(`/tenants`, data, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};



// PUT APIS =====================================================
export const updateSingleTenant = async (data) => {
    const jwt = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    };
    return await axios
        .put(`/tenants`, data, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};


// DELETE APIS =====================================================
export const deleteSingleTenant = async (id) => {
    const jwt = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    };
    return await axios
        .delete(`/tenants/${id}`, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};
