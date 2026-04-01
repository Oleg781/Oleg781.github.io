// src/services/GigService.js
import axios from 'axios';
import React from 'react';

const baseUrl = 'http://localhost:3001/gigs';

export const getGigs = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching gigs:', error);
    return [];
  }
};

export default {
    getGigs,
  };