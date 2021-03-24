async function handleCommand(msg, client, Discord) {

    const args = msg.content.split(' ')
    const command = args.shift()
    if(command === `${client.prefix}massdm`) {
        const toMass = msg.mentions.members.first()
        const message = args.join(' ')
        if(!toMass) return msg.reply('You must ping a valid user to massDM!')
        let i = 0;
        let l = 0;
        for(token in client.slaves) {
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
                user.send(message)
            })
        }

    }
    /**
     * @param message
     * @param client
     */
}

module.exports = { handleCommand }