const crypto = require('crypto')
const assert = require('assert');

module.exports = {
    createHeader: function (user, token) {
        assert(user, "user can't be null")
        assert(token, "token can't be null")

        let staffid = user.staffID
        let staffname = user.staffName

        let xRioSeq = ""
        let xExtData = ""
        let timestamp = (new Date().getTime() / 1000).toFixed()
        let hash = crypto.createHash('sha256')
        hash.update(`${timestamp}${token}${xRioSeq},${staffid},${staffname},${xExtData}${timestamp}`)
        let signature = hash.digest('hex').toUpperCase()
        return {
            "staffid": staffid,
            "staffname": staffname,
            "signature": signature,
            "timestamp": timestamp,
            "x-rio-seq": xRioSeq,
            "x-ext-data": xExtData,
        }
    },
    nop: function () { }
}