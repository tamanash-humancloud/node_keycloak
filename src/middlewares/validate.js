

module.exports = async (req, res, next) => {
    try {
        const organization = req.get('Organization')
        const url = (organization === 'humancloud' ? process.env.HUMANCLOUD_CHECK : process.env.METTAREV_CHECK)
        const client = (organization === 'humancloud' ? process.env.HUMANCLOUD_CLIENT : process.env.METTAREV_CLIENT)
        const secret = (organization === 'humancloud' ? process.env.HUMANCLOUD_SECRET : process.env.METTAREV_SECRET)

        const bearerToken = req.headers.authorization
        const token = bearerToken.split(' ')
        
        const urlencoded = new URLSearchParams();
        urlencoded.append("token", token[1]);
        urlencoded.append("client_id", client);
        urlencoded.append("client_secret", secret);

        const result = await fetch(url, {
            method: 'POST',
            body: urlencoded
        })

        const body = await result.json()

        if(result.status === 200 && body.active){
            next()
        } else {
            const error = new Error("User Logged Out/Session Expired")

            throw error
        }
        
    } catch (error) {
        next(error)
    }
}