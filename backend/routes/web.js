const express = require('express')
const Router = express.Router()

Router.get('/sitemap.xml',(req,res) =>{
    res.sendFile(path.join(APP_PATH,'./public/sitemap/sitemap.xml'));
})

Router.get('*',(req,res) =>{
    res.sendFile(path.join(APP_PATH,'../frontend/build/index.html'));
})

module.exports = Router;
