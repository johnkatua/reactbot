'use strict'
const dialogflow = require('dialogflow');
const structjson = require('./structjson');
const config = require('../config/keys');
const { response } = require('express');
const mongoose = require('mongoose');

const projectID = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
}

const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });

const Registration = mongoose.model('registration');



module.exports = {
  textQuery: async function(text, userID, parameters = {}) {
    let sessionPath = sessionClient.sessionPath(projectID, sessionId + userID);
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text,
          // The language used by the client (en-US)
          languageCode
        },
      },
      queryParams: {
        payload: {
          data: parameters
        }
      }
    };
    let responses = await sessionClient.detectIntent(request);
      responses = await self.handleAction(responses);
        return responses;
  },
  handleAction: function(responses) {
    return responses;
  },

  eventQuery: async function(event, userID, parameters = {}) {
    let sessionPath = sessionClient.sessionPath(projectID, sessionId + userID);
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          // The query to send to the dialogflow agent
          name: event,
          parameters: structjson.jsonToStructProto(parameters),
          // The language used by the client (en-US)
          languageCode
        },
      },
    };
    let responses = await sessionClient.detectIntent(request);
      responses = await self.handleAction(responses);
        return responses;
  },

  handleAction: function(responses) {
    let self = module.exports;
    let queryResult = responses[0].queryResult;

    switch (queryResult.action) {
      case 'recommendcourses-yes':
        if(queryResult.allRequiredParamsPresent) {
          self.saveRegistration(queryResult.parameters.fields);
        }
        break;
    }
    return responses
  },

  saveRegistration: async function(fields) {
    const registration = new Registration({
      name: fields.name.stringValue,
      phone: fields.phone.stringValue,
      address: fields.address.stringValue,
      email: fields.email.stringValue,
      dateSent: Date.now()
    });
    try{
      let reg = await registration.save();
      return reg;
    } catch(err) {
      console.log(err);
    }
  }
}