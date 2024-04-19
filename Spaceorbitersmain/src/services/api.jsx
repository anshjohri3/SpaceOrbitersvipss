// src/services/api.js
const API_BASE_URL = 'https://launchlibrary.net/1.3';

const fetchUpcomingLaunches = async () => {
  const response = await fetch(`${API_BASE_URL}/launch/upcoming`);
  if (!response.ok) {
    throw new Error('Failed to fetch upcoming launches');
  }
  return response.json();
};

export { fetchUpcomingLaunches };
