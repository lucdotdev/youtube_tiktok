const { v4 } = require("uuid");
const fs = require("fs");

const { editVideo } = require("./src/editor");
const { downloadvideo, storeJson } = require("./src/utils");
const { uploadVideoToYoutube } = require("./src/upload2");
const { description } = require("./src/constant");

async function doTheJob(result) {
  const paths = [];
  let name = "";

  //download video
  for (let i = 0; i < result.collector.length; i++) {
    let to = `./temp/${v4()}`;
    name = result.collector[i].authorMeta.name;
    let path = await downloadvideo(
      result.collector[i].videoUrl,
      result.headers,
      to
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

  console.log(url);

  paths.forEach((path) => fs.unlink(path, (err) => console.log(err)));

  fs.unlink(path);

  console.log("Video uploaded with succes to " + url);

  return url;
}

module.exports = { doTheJob };
