const express = require('express')
const bodyParser = require('body-parser')
var compression = require('compression')
var cors = require('cors')

const app = express()

app.use(compression())
app.use(cors())

moment = module.exports = require('moment')
momentTz = module.exports = require('moment-timezone');

mongoose = module.exports = require('mongoose')
underscore = module.exports = require('underscore');

randomString = module.exports = require('randomstring');

JWT = module.exports = require('jsonwebtoken')
path = module.exports = require('path')
fs = module.exports = require('fs')

ONLINE_USERS = module.exports = [];

APP_PATH = module.exports = __dirname
CONFIG = module.exports = require('./config/config.json')

app.use(express.static(path.join(__dirname, 'public'), { maxAge: "365d" }));
app.use(express.static(path.join(__dirname, '../frontend/build/'), { maxAge: "90d" }));


__ = module.exports = require('./common/common');

// UPLOADs
require('./common/upload.js')

// const helmet = require('helmet')
//Helmet protection
if (CONFIG.MODE != "Development") {
  // app.use(helmet())
}


// MAIL
module.exports = _Mail = require("./mails/mail.js");


//Models
Model = require('./models/__init__');


// DATABASE
require('./common/db')


//Controllers
require('./controllers/__init__');

//Routing
const API = require('./routes/api');
const WEB = require('./routes/web');
const ADMIN = require('./routes/admin.js')

app.use(/^\/(?!master).*/, express.urlencoded({ extended: false }));
app.use('/master', ADMIN);

app.use(bodyParser.json())
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/api/v1', API);
app.use('/', WEB);

var nodemon = require('nodemon');
nodemon[app];

// Export App

module.exports = app
