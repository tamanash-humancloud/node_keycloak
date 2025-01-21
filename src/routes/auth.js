const express = require("express");
const router =  express.Router();


router.post('/login', async (req, res) => {
    try {
        const organization = req.get('Organization')
        const url = (organization === 'humancloud' ? process.env.HUMANCLOUD_AUTH : process.env.METTAREV_AUTH)
        const client = (organization === 'humancloud' ? process.env.HUMANCLOUD_CLIENT : process.env.METTAREV_CLIENT)
        const secret = (organization === 'humancloud' ? process.env.HUMANCLOUD_SECRET : process.env.METTAREV_SECRET)

        const urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "password");
        urlencoded.append("client_id", client);
        urlencoded.append("client_secret", secret);
        urlencoded.append("username", req.body.username);
        urlencoded.append("password", req.body.password);

        const result = await fetch(url, {
            method: 'POST',
            body: urlencoded
        })

        const data = await result.json()

        if(result.status < 400) {
            res.status(200).json(data)
        } else {
            throw Error(JSON.stringify({   
                status: result.status,
                message: data
            }))
        }
    } catch (error) { 
        const errorData = await JSON.parse(error.message)
        res.status(errorData.status).send(errorData.message)
    }
})

router.get('/logout', async (req, res) => {
    try {
        const organization = req.get('Organization')
        const token = req.get('Token')
        const url = (organization === 'humancloud' ? process.env.HUMANCLOUD_LOGOUT : process.env.METTAREV_LOGOUT)
        const client = (organization === 'humancloud' ? process.env.HUMANCLOUD_CLIENT : process.env.METTAREV_CLIENT)
        const secret = (organization === 'humancloud' ? process.env.HUMANCLOUD_SECRET : process.env.METTAREV_SECRET)

        const urlencoded = new URLSearchParams();
        urlencoded.append("refresh_token", token);
        urlencoded.append("client_id", client);
        urlencoded.append("client_secret", secret);

        const result = await fetch(url, {
            method: 'POST',
            body: urlencoded
        })

        if(result.status < 400) {
            res.status(200).send("Logged Out!")
        } else {
            throw Error(JSON.stringify({   
                status: result.status,
            }))
        }

    } catch (error) {
        const errorData = await JSON.parse(error.message)
        res.status(errorData.status).send("Failed to Logout!")
    }
})

module.exports = router