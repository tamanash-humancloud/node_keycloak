const express = require("express");
const router =  express.Router();

// Middleware
const keycloak = require("#middlewares/keycloak");
const extractToken = require("#middlewares/extractToken");

router.get('/', (req, res) => {
    console.log(req.kauth)
    
    res.render('index')
})

router.get('/login', [keycloak.protect('realm:node_main')], (req, res, next) => {
    try {
        // User Login flow  
    } catch (error) {
        next(error)
    }
})

module.exports = router