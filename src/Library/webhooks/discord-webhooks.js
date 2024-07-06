const { WebhookClient } = require('discord.js')

const discord = new WebhookClient({
    url: 'https://discord.com/api/webhooks/1259194054390841415/wTyXPGERcGMPlKS2GGZnL_3kiWFSdLidrou3XOjYfu7eNeUZoGxkTfNsItrUpqDMrPp6'
})

const sendMessage = (message) => {
    console.log(message)
    const res = discord.send(message)
    return res
}

module.exports = {sendMessage}
