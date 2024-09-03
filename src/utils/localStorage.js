// Utility functions for API operations

const API_BASE_URL = 'https://sakni-api.replit.app/api';

export const saveToLocalStorage = async (key, data) => {
  try {
    const endpoint = key === 'realEstateListings' ? 'realEstateListings' : 'busListings';
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const getFromLocalStorage = async (key) => {
  try {
    const endpoint = key === 'realEstateListings' ? 'realEstateListings' : 'busListings';
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};