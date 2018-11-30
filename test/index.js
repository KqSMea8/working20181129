const rp = require('request-promise-native')
const config = require("./config")
const util = require("./util")

const options = {
    uri: `${config.host}/online`,
    headers: util.createHeader({
        staffID: 11214,
        staffName: "kindy"
    }, config.token)
}
rp(options)
    .then(function (res) {
        console.log(res)
    })
    .catch(function (err) {
        console.log(err)
    });