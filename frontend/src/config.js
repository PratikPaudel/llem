export const getApiBaseUrl = () => {
    const isDevelopment = window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1';
    return isDevelopment
        ? 'http://localhost:8000/api'
        : 'https://llem-0e8i.onrender.com/api';
};
