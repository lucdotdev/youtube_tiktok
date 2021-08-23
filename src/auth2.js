const yt = require('apilessyt')
const {yt_email, yt_password} = require("./constant")

async function authGoogle() {
    await yt.login({
        name: yt_email,
        password: yt_password,
        twofa: false //set this to true if you are using 2FA to login to Google
    });

    
}

module.exports = {authGoogle}