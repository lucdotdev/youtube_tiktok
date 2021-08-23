const fs = require("fs").promises;
const readline = require("readline");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
var SCOPES = [
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/youtube.upload",
];
var TOKEN_DIR =
  (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) +
  "/.credentials/";
var TOKEN_PATH = TOKEN_DIR + "youtube-nodejs-quickstart.json";

async function authorize(credentials) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  let file = await fs.readFile(TOKEN_PATH);

  if (file === null) {
    oauth2Client.credentials = await getNewToken(oauth2Client);
  } else {
    oauth2Client.credentials = JSON.parse(file);
  }
  return oauth2Client;
}

async function getNewToken(oauth2Client) {
  var authUrl = await oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url: ", authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

  let code = await ask("Enter the code from that page here: ");
  let token = await oauth2Client.getToken(code);
  oauth2Client.credentials = token;
  storeToken(token);
  rl.close();
  return token;
}

function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != "EEXIST") {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) throw err;
    console.log("Token stored to " + TOKEN_PATH);
  });
}
module.exports = { authorize };
