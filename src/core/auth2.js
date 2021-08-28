const yt = require('apilessyt');
const {yt_email, yt_password} = require('./constant');

async function authorise(){

    try{
        await yt.login({
            name: yt_email,
            password: yt_password,
            twofa: false //set this to true if you are using 2FA to login to Google
        })
    }catch(e){
        throw e;
    }
}

module.exports = {authorise};