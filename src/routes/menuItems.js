const express = require("express");
const router =  express.Router();

// Middleware
const keycloak = require("#middlewares/keycloak");
const extractToken = require("#middlewares/extractToken");
const checkIfAdmin = require("#middlewares/checkIfAdmin");
const validate = require("#middlewares/validate");

// Dummy Data
const menuItems = [
    {
        name: "Croissant",
        price: "$1",
        onMenu: true
    },
    {
        name:"Latte",
        price: "$5",
        onMenu: true
    },
    {
        name: "Roti Canai",
        price: "$0.50",
        onMenu: true
    },
    {
        name: "Hot Chocolate",
        price: "$5",
        onMenu: false
    },
    {
        name: "Satay",
        price: "$8",
        onMenu: false
    },
    {
        name: "Pad Thai",
        price: "$7",
        onMenu: false
    }
];

// Route open to only Admin Role
router.get('/menu-items', [keycloak.protect(), extractToken, checkIfAdmin], async (req, res, next) => {
    try {
        let filtered = menuItems.filter(item => {
            if(item.onMenu){
                return item
            }
        })

        // Return Filtered Items
        res.json(filtered)
    } catch (error) {
        return next(error)
    }
})

// Route open to any role
router.get('/public-items', keycloak.protect(),async (req, res) => {
    try {
        res.json(menuItems)
    } catch (error) {
        res.send(error)
    }
})

// Route open to only Admin Role
router.get('/v2/menu-items', [validate, extractToken, checkIfAdmin], async (req, res, next) => {
    try {
        let filtered = menuItems.filter(item => {
            if(item.onMenu){
                return item
            }
        })

        // Return Filtered Items
        res.json(filtered)
    } catch (error) {
        return next(error)
    }
})

// Route open to any role
router.get('/v2/public-items', validate,async (req, res) => {
    try {
        res.json(menuItems)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router