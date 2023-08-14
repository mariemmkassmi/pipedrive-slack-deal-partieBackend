const { getActiveDeals } = require('../models/pipedrive.model');
const axios = require('axios');
const { slackApiKey } = require('../config/pipedrive.config');
async function getActiveDealsAndNotify(req, res) {
  try {
    const activeDeals = await getActiveDeals();
    for (const deal of activeDeals) {
      const dealType = deal.dealType;
      if (dealType === 'somme_d_argent') {
        await sendSlackNotification('money', `Nouvelle somme d'argent : ${deal.title}`);
      } else if (dealType === 'nouveau_stagiaire') {
        await sendSlackNotification('general', `Nouveau stagiaire : ${deal.title}`);
      } else if (dealType === 'nouveau_recrutement') {
        await sendSlackNotification('100', `Nouveau recrutement : ${deal.title}`);
      }
    }
    return res.json(activeDeals);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
async function sendSlackNotification(channel, message) {
  try {
    const response = await axios.post('https://slack.com/api/chat.postMessage', {
      channel: channel,
      text: message
    },{headers:{accept: 'json', 'Authorization': 'Bearer ' + slackApiKey}});

    if (!response.data.ok) {
      throw new Error(`Slack API Error: ${response.data.error}`);
    }
  } catch (error) {
    console.error('Slack Error:', error.message);
    throw new Error('Erreur lors de l\'envoi du message vers Slack');
  }
}
module.exports = {
  getActiveDealsAndNotify,
  sendSlackNotification
};
