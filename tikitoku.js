const { v4 } = require("uuid");
const fs = require("fs");

const { editVideo } = require("./src/editor");
const { downloadvideo, storeJson } = require("./src/utils");
const { uploadVideoToYoutube } = require("./src/upload");
const { description } = require("./src/constant");

async function doTheJob(result) {
  // const paths = [];
  // //download video

  // for (let i = 0; i < result.collector.length; i++) {
  //   let to = `./temp/${v4()}`;
  //   let path = await downloadvideo(
  //     result.collector[i].videoUrl,
  //     result.headers,
  //     to
  //   );
  //   if (path == null) {
  //     console.log("download video failed");
  //     continue;
  //   }
  //   paths.push(path);
  //   console.log(path);
  // }
  // //edit videos
  let path = "./out/bellapoarchc58e0906-50c0-49f8-b0c7-49e136e95fd4.mp4";
  //  await editVideo(paths, `./out/${v4()}.mp4`, {});

  let url = await uploadVideoToYoutube(path, {
    title: `Best of compilation, funny videos`,
    description: description,
  });
  
  // console.log(url);

  // paths.forEach((path) =>  fs.unlink(path, (err) => console.log(err)));

  //  fs.unlink(path);

  // console.log("Video uploaded with succes to " + url);

  return url;
  
}

module.exports = { doTheJob };
