// apiService.js

import Cookies from "js-cookie";

const BASE_URL = 'https://api.fptsp.xyz/onlearn/api/v1';
// const BASE_URL = 'http://localhost:8080/api/v1';

export const fetchData = async (endpoint, token, method) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: method ? method : 'GET',
            headers: headers,
        });

        if (!response.ok) {
            // Handle HTTP status codes 400, 401, 403, and 500
            if (response.status === 400) {
                throw new Error(`Bad Request! Status: ${response.status}`);
            } else if (response.status === 401) {
                Cookies.remove('token')
                Cookies.remove('user')
            } else if (response.status === 500) {
                return response;
            } else {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
};


export const postData = async (endpoint, body, token) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            // Handle HTTP status codes 400, 401, 403, and 500
            if (response.status === 400) {
                throw new Error(`Bad Request! Status: ${response.status}`);
            } else if (response.status === 401) {
                throw new Error(`Unauthorized! Status: ${response.status}`);
            } else if (response.status === 403) {
                throw new Error(`Forbidden! Status: ${response.status}`);
            } else if (response.status === 500) {
                throw new Error(`Internal Server Error! Status: ${response.status}`);
            } else {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error posting data: ${error.message}`);
    }
};
