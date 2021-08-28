const { google } = require("googleapis");
const { authorize } = require("./auth");
const service = google.youtube("v3");
const fs = require("fs").promises;
const createReadStream = require("fs").createReadStream;

async function uploadVideoToYoutube(path, metadata) {
  let content = await fs.readFile("client_secret.json");
  let auth = await authorize(JSON.parse(content));

  return await upload(auth, path, metadata);
}

async function upload(auth, path, metadata) {
  let data = await service.videos
    .insert({
      auth: auth,
      part: "snippet,contentDetails,status",
      resource: {
        // Video title and description
        snippet: {
          title: metadata.title,
          description: metadata.description,
        },
      },

      // Create the readable stream to upload the video
      media: {
        body: createReadStream(path), // Change here to your real video
      },
    })
    .catch((e) => {
      throw e;
    });

  return "https://www.youtube.com/watch?v=" + data.data.id;
}

module.exports = { uploadVideoToYoutube };
