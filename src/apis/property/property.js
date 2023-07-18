// ===========================================
// #00132
// ===========================================

import axios from 'axios';

// GET APIS =====================================================
export const getAllProperties = async ({
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
            `/properties/${perPage}?page=${pageNo}?start_date=${start_date}&end_date=${end_date}&search_key=${search_key}`,
            config
        )
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};


export const getSingleProperty = async (id) => {
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
            `/properties/get/single/${id}`,
            config
        )
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};
export const genarateRefNo = async () => {
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
            `/properties/generate/property-reference_no`,
            config
        )
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};
export const validateRefNo = async (ref) => {
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
            `/properties/validate/property-reference_no/${ref}`,
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
export const createProperty = async (data) => {
    const jwt = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    };
    return await axios
        .post(`/properties`, data, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};



// PUT APIS =====================================================
export const updateSingleProperty = async (data) => {
    const jwt = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    };
    return await axios
        .put(`/properties`, data, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};


// DELETE APIS =====================================================
export const deleteSingleProperty = async (id) => {
    const jwt = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    };
    return await axios
        .delete(`/properties/${id}`, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};

export const getAllPropertyAddress = async ({
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
            `/properties/get/all?start_date=${start_date}&end_date=${end_date}&search_key=${search_key}`,
            config
        )
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};
