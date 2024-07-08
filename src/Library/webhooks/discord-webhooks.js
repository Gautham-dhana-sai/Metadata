const { WebhookClient } = require('discord.js')

const discord = new WebhookClient({
    url: process.env.DISCORD_WEBHOOK
})

const sendMessage = (message) => {
    console.log(message)
    const res = discord.send(message)
    return res
}

module.exports = {sendMessage}
