async function handleCommand(msg, client, Discord) {
    const {log} = require('../constructors/consoleConstructor')
    const config = require('../config.json')
    const args = msg.content.split(' ')
    const command = args.shift()
    if(command === `${client.prefix}massdm`) {
        const toMass = msg.mentions.members.first()
        args.shift()
        let numToSpam = args.shift()
        let message = args.join(' ')
        if(numToSpam && !message) {
            message = numToSpam
            numToSpam = 1
        }
        if(isNaN(numToSpam)) return msg.reply(numToSpam)
        if(isNaN(numToSpam) || numToSpam > 100 || numToSpam < 1) return msg.reply('You must give a value 1-100 on the amount of messages to send!')
        if(!toMass) return msg.reply('You must ping a valid user to massDM!')
        if(!message) return msg.reply('You must provide text to spam')
        msg.react('👌')
        let i = 0;
        let l = 0;
        config.slaveTokens.forEach(token => {
            const slave = new Discord.Client()
            slave.login(token).catch(err => {
                if(err) {
                    if(i === 0) msg.channel.send('Invalid Token(s)! Please check your console!'), ++i
                    return log(`INVALID TOKEN: ${token}`)
                }
            })
            slave.on('ready', async() => {
                const user = await slave.users.fetch(toMass.id)
                if(!user) {
                    if(l === 0) msg.reply('One or more of your tokens is not in this server, Check console.')
                    return log(`ACCOUNT NOT IN SERVER: ${slave.user.tag}`)
                }
                function spam() {
                    i++
                    user.send(message)
                    if(i < numToSpam) return spam()
                } spam()
            })
        })

    }
    /**
     * @param message
     * @param client
     */
}

module.exports = { handleCommand }