const fs = require("fs");
const Axios = require("axios");
const twilio = require("twilio")(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);

// download video from url and store it localy with fs

async function downloadvideo(url, headers, filename) {
  
  var file;

  const response = await Axios({
    method: "GET",
    url: url,
    headers: headers,
    responseType: "stream",
  });
  file = filename + "." + response.headers["content-type"].split("/")[1];
  response.data.pipe(fs.createWriteStream(file));
  return new Promise((resolve, reject) => {
    response.data.on("end", () => {
      resolve(file);
    });

    response.data.on("error", (error) => {

      reject(null);
      throw error;
    });
  });
}

//a function to get external ip address of the machine
function getIPAddress() {
  return new Promise((resolve, reject) => {
    Axios.get("https://api.ipify.org?format=json")
      .then((res) => {
        resolve(res.data.ip);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
//a function to notify when a task is completed
function notifyBySms(msg) {
   twilio.messages.create({body: msg, from: '+18595188121', to: '+243975494741'})
   .then(message => console.log(message.sid));

}
// store a json file from object to file system

function storeJson(obj, filename) {
  const file = fs.createWriteStream(filename);
  file.write(JSON.stringify(obj));
  file.end();
}

module.exports = { downloadvideo, storeJson, notifyBySms, getIPAddress };
