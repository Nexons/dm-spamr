const config = require('./config.json')
const { say } = require('./constructors/cfontConstructor.js')
const { handleCommand } = require('./handlers/commandHandler.js')
const { readFileLines } = require('./handlers/fileHandler.js')
const { log } = require('./constructors/consoleConstructor.js')
const { keypress } = require('./events/keyPress.js')

const Discord = require('discord.js')
const client = new Discord.Client()

client.token = config.mainToken
client.controllers = config.authorisedIDs
client.prefix = config.prefix
client.slaves = config.slaveTokens

console.clear()
say('DM.SPAMR')
log('Bugs? Open a new ticket https://github.com/nexons/dm-spamr\nLoading... Please wait')

client.on('ready', async () => {
    console.clear()
    say('DM.SPAMR'), log('Bugs? Open a new ticket https://github.com/nexons/dm-spamr'), log('WARNING: Using more than 20 accounts may cause rate-limits')
    await keypress()
    console.clear(), say('DM.SPAMR'), log(`DM.SPAMR master: ${client.user.tag}!`), log(`[SLAVES: ${client.slaves.length}]`)
})

client.on('message', async msg => {
    if(msg.author.bot) return;
    if(!client.controllers.includes(msg.author.id)) return;
    if(!msg.content.startsWith(client.prefix)) return;
    return handleCommand(msg, client, Discord)
})

client.login(client.token).catch(err => {
    if(err) console.log(err.stack), process.exit(1)
})