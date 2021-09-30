const crypto = require('crypto')

const str = "sloKga3àflsakf"

const hash = crypto.createHash('sha256').update(str).digest('hex')

console.log(hash);