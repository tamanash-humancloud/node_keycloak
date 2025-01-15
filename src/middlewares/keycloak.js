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

/* Access Token

eyJhbGciOiJIUzUxMiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzZWExYmVhZS00M2Q3LTRhYjAtYmQ4My0zN2I2MjZiMGVkYzYifQ.eyJleHAiOjE3Mzc0Mzg1NzEsImlhdCI6MTczNjkyMDE3MSwianRpIjoiYWFjNDhiYWQtMzc2OS00MWRiLTg2ZTItZDhlOTMzZmMyMGViIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9ub2RlX3JlYWxtIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9ub2RlX3JlYWxtIiwidHlwIjoiSW5pdGlhbEFjY2Vzc1Rva2VuIn0.PviIKIbyNqle-uA6wc20jZIqNItFMjwkp1-lculyu8ixmnj7vtSSBM1B9VMNz26k18x_3lYvl1f3gLPbPFsv2w
*/