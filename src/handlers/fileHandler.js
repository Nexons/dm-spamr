async function readFileLines(file, resultType) {
    const fs = require('fs')

    if(!file || !resultType) return console.log('readFileLines ERROR: You must provide a file, and resultType')

    resultType.toLowerCase()
    console.log(resultType)
    if(!["array", "rawtext"].includes(resultType)) return console.log('readFileLines ERROR: INVALID_RESULTTYPE\nresultTypes: array, rawText')

    fs.readFile(file, async rawTextData => {
        if(resultType === 'rawtext') return this.result = rawTextData
        else {
            return this.result = rawTextData.split("\n")
        }
    })
    /**
     * @param file
     * @param resultType
     * @description read the file lines and return an array
     */
}

module.exports = { readFileLines }