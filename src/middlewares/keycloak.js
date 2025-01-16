const Keycloak = require("keycloak-connect");
const dotenv = require('dotenv').config();

// Keycloak setup
const config = {
    "realm": process.env.KEYCLOAK_REALM,
    "auth-server-url": `${process.env.KEYCLOAK_URL}`,
    "ssl-required": "external",
    "resource": process.env.KEYCLOAK_CLIENT,
    // "credentials": {
    //     "secret": process.env.KEYCLOAK_CLIENT_SECRET
    // },
    // "confidential-port": 0,
    "bearer-only": true
}

module.exports = new Keycloak({}, config);
