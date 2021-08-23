const { v4 } = require("uuid");
const fs = require("fs");
const { getTikByUserName } = require("./src/scraping");
const { editVideo } = require("./src/editor");
const { downloadvideo, storeJson } = require("./src/utils");
const { uploadVideoToYoutube } = require("./src/upload2");
const { description } = require("./src/constant");

async function doTheJob(result) {
  const paths = [];
  //download video

  for (let i = 0; i < result.collector.length; i++) {
    let to = `./temp/${userName}${i}`;
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
  // //edit videos
  let path = await editVideo(paths, `./out/${userName}${v4()}.mp4`, {});

  let url = await uploadVideoToYoutube(path, {
    title: `Best of compilation, funny videos`,
    description: description,
  });
  console.log(url);

  paths.forEach((path) => fs.unlink(path, (err) => console.log(err)));

  console.log("application finished 🎉");

  return url;
}

module.exports = { doTheJob };
