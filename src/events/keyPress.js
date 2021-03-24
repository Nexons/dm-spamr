const { log } = require("../constructors/consoleConstructor")

async function keypress() {
    process.stdin.setRawMode(true)
    console.log()
    log('Press any key to continue')
    return new Promise(resolve => process.stdin.once('data', () => {
      process.stdin.setRawMode(false)
      resolve()
    }))
}

module.exports = { keypress }