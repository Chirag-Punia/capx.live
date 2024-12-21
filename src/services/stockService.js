import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getStocks = async () => {
  const response = await axios.get(`${API_URL}/stocks`, getAuthHeader());
  return response.data;
};

export const addStock = async (stockData) => {
  const response = await axios.post(`${API_URL}/stocks`, stockData, getAuthHeader());
  return response.data;
};

export const updateStock = async (id, stockData) => {
  const response = await axios.put(`${API_URL}/stocks/${id}`, stockData, getAuthHeader());
  return response.data;
};

export const deleteStock = async (id) => {
  const response = await axios.delete(`${API_URL}/stocks/${id}`, getAuthHeader());
  return response.data;
};