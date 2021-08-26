const fs = require("fs");
const Axios = require("axios");
// download video from url and store it localy with fs

async function downloadvideo(url, headers, filename) {
  const options = {
    url: url,
    headers: headers,
  };
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

// store a json file from object to file system

function storeJson(obj, filename) {
  const file = fs.createWriteStream(filename);
  file.write(JSON.stringify(obj));
  file.end();
}

module.exports = { downloadvideo, storeJson };
