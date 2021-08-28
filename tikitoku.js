const { v4 } = require("uuid");
const fs = require("fs");

const { editVideo } = require("./src/core/editor");
const { downloadvideo, storeJson } = require("./src/core/utils");
const { uploadVideoToYoutube } = require("./src/core/upload2");
const { description } = require("./src/core/constant");

async function runTheJob(result) {
  const paths = [];
  let name = "";

  for (let i = 0; i < result.collector.length; i++) {
    let destination = `./temp/${v4()}`;
    name = result.collector[i].authorMeta.name;
    let path = await downloadvideo(
      result.collector[i].videoUrl,
      result.headers,
      destination
    );
    if (path == null) {
      console.log("download video failed");
      continue;
    }
    paths.push(path);
    console.log(path);
  }

  //edit videos
  let path = await editVideo(paths, `./out/${v4()}.mp4`, {});

  let url = await uploadVideoToYoutube(path, {
    title: `Best of @${name} Compilation`,
    description: description(name, 1, "https://youtu.be/O4uuzORU7KM"),
  });

  paths.forEach((path) => fs.unlink(path, (err) => console.log(err)));

  fs.unlink(path);

  console.log("Video uploaded with succes to " + url);

  return url;
}

module.exports = { runTheJob };
