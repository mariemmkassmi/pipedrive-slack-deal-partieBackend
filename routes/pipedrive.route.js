const config = require('../config/pipedrive.config');
const express = require('express');
const router = express.Router();
const pipedriveController = require('../contollers/pipedrive.controller');
module.exports=app=>{
    app.get('/active-deals', pipedriveController.getActiveDealsAndNotify);
    app.post('/send-message', async (req, res) => {
        try {
          const challenge = req.body.challenge;
          if (challenge) {
            return res.status(200).json({ challenge });
          }
          const { channel, message } = req.body;
          if (!channel || !message) {
            return res.status(400).json({ error: 'channel et message sont requis.' });
          }
          const slackToken = config.slackApiKey;
          await pipedriveController.sendSlackNotification(channel, message,slackToken);
    
          return res.json({ success: true, message: 'Le message a été envoyé avec succès ' });
        } catch (error) {
          console.error('Erreur:', error.message);
          res.status(500).json({ error: 'Probléme de envoi ' });
        }
      });
    };




