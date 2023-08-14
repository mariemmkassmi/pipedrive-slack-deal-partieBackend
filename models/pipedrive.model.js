const axios = require('axios');
const { pipeDriveApiKey } = require('../config/pipedrive.config'); 
module.exports.getActiveDeals = async function getActiveDeals() {
  try {
    const response = await axios.get(`https://api.pipedrive.com/v1/deals`, {
      params: {
        api_token: pipeDriveApiKey,
        status: 'open'
      }
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Impossible de récupérer les accords');
  }
};
