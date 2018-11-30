const express = require('express')
const morgan = require('morgan')
const config = require('./config')
const mock = require('./mock')
const cookie = require('cookie-parser');
let app = express()
app.use(morgan('dev'));
app.use(cookie())
mock(app)

app.listen(config.port, () => console.log(`app listening on port ${config.port}!`))