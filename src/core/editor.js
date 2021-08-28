const { intro, outro } = require("./constant");
const editly = require("editly");

async function editVideo(from, to, size) {
  let clips = [];

  if(size!== undefined){

  }

  from.forEach((e) => {
    clips.push({
      layers: [{ type: "video", path: e, resizeMode: "contain-blur" }],
    });
  });

  clips.push({
    layers: [{ type: "video", path: outro, resizeMode: "conver" }],
  });
  let options = {
    width: size.width || 1920,
    height: size.height || 1080,
    outPath: to,
    

    defaults: {
      transition: { duration: 2 },
      // layer: { fontPath: "./assets/Patua_One/PatuaOne-Regular.ttf" },
    },
    keepSourceAudio: true,
    clips: [
      {
        layers: [{ type: "video", path: intro, resizeMode: "conver" }],
      },
    ].concat(clips),
    fast: true
  };

  await editly(options).catch((e) => {
    console.log(e);
    throw e;
  });

  return new Promise((resolve, reject) => {
    resolve(to);
  });
}

module.exports = { editVideo };
