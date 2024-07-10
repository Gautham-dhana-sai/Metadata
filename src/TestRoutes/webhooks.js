const express = require('express')

const { sendMessage } = require('../Clients/webhooks/discord-webhooks')

const webhookRoutes = express.Router()


webhookRoutes.get('/discord/webhooks', async (req, res) => {
    const resp = await sendMessage('hello webhook')
    console.log(resp)
    let response
    if(resp.webhook_id){
        response = {
            success: true,
            error: false,
            data: resp
        }
    } else {
        response = {
            error: true,
            success: false,
            data: resp
        }
    }
    return res.json(response)
})

module.exports = webhookRoutes