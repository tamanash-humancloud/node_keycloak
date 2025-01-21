const express = require("express");
const router =  express.Router();

// Middleware
const keycloak = require("#middlewares/keycloak");
const extractToken = require("#middlewares/extractToken");

/* Login testing
router.get('/home', (req, res) => {
    res.render('index')
})

router.get('/login', [keycloak.protect()], (req, res, next) => {
    try {
        // User Login flow  
        res.render
    } catch (error) {
        next(error)
    }
})
*/

module.exports = router