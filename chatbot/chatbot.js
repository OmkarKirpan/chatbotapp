'use strict'

const dialogflow = require('@google-cloud/dialogflow');
const structjson = require("../chatbot/utils");
const config = require('../config/keys');

const projectID = config.googleProjectID;
const sessionID = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}

const sessionClient = new dialogflow.SessionsClient({
    projectID,
    credentials
});

module.exports = {
    textQuery: async function (text, userID, parameters = {}) {
        let sessionPath = sessionClient.projectAgentSessionPath(projectID, sessionID + userID);
        let self = module.exports;

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: text,
                    // The language used by the client (en-US)
                    languageCode: languageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };

        let responses = await sessionClient
            .detectIntent(request)

        responses = await self.handleAction(responses);

        return responses;
    },
    eventQuery: async function (event, userID, parameters = {}) {
        let sessionPath = sessionClient.projectAgentSessionPath(projectID, sessionID + userID);
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    // The query to send to the dialogflow agent
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters),
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };

        let responses = await sessionClient
            .detectIntent(request)

        responses = await self.handleAction(responses);

        return responses;
    },

    handleAction: function (responses) {
        return responses;
    }
}