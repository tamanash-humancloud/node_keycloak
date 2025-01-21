require('dotenv').config()

const cors = require('cors')
const express = require('express')
const port = process.env.DEV_PORT

const keycloak = require('#middlewares/keycloak')

// Routes
const testRoutes = require('#routes/test')
const menu = require('#routes/menuItems')
const view = require('#routes/views')
const auth = require('#routes/auth')

// Error handler middleware
const errorHandler = (error, req, res, next) => {
    const status = error.status || 422
    res.status(status).send(error.message)
}

const app = express()

// Register Keycloak middleware
app.use(keycloak.middleware())

// Set EJS view Engine
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

// Register Routes
// app.use('/api', testRoutes) // Test Route
app.use('/api', auth)
app.use('/api', menu)
app.use('/', view)
app.use(errorHandler)

app.listen(port, (req,res) => {
    console.log("Server running on port: ", port)
})