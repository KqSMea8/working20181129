const crypto = require('crypto')
const assert = require('assert');
const http = require('http')
const { URL } = require('url')
const Config = require("./config")
function resource(ctx, opts) {
    opts.timeout = opts.timeout || 1000 * 60;

    return new Promise((resolve, reject) => {
        let req = http.request(opts, (res) => {
            resolve(res)
        }).on('error', (err) => {
            reject(err)
        }).on("timeout", () => {
            reject(new Error("request timeout"))
        })
        ctx.req.pipe(req)
    })
}

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
    proxy: (req,res,config = Config.backend) => {
            var options = {
                protocol:config.protocol || req.protocol+':',
                host:config.host,
                port:config.port || '80',
                path:req.originalUrl,
                method:req.method,
                headers:req.headers
            }
            let newReq = http.request(options, (newRes) => {
                newRes.pipe(res)
            }).on('error', (err) => {
                res.send(`service error ${err}`)
            }).on("timeout", () => {
                res.send(`service timeout`)
            })
            req.pipe(newReq)
    },
    nop: function () { }
}