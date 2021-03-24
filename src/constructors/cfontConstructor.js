async function say(text) {
    const cfonts = require('cfonts')
    if(!text) return console.log('sayError: You must provide text to console.log!'), process.exit(1)
    cfonts.say(text, {
    font: 'chrome',              
    align: 'left',              
    colors: ['system', 'magenta'],         
    background: 'transparent',  
    letterSpacing: 1,           
    lineHeight: 0,              
    space: true,                
    maxLength: '0',             
    gradient: false,            
    independentGradient: false, 
    transitionGradient: false,  
    env: 'node'              
})
}

module.exports = { say }