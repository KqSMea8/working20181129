const users = require('./users')
const redisList = require('./redisList')
const region= require('./region')
const areaList = require('./areaList')
const master = require('./master')
const cache = require('./cache')
const bid = require('./bid')
const job = require('./job')
module.exports = {
    users: users,
    redisList: redisList,
    region: region,
    areaList: areaList,
    master,
    cache,
    bid,
    job
}