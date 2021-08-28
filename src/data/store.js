const Videos = require("./videos");
const Worker = require("./worker");
const os = require("os");

const {getIPAddress} = require("../core/utils");

async function saveVideoToDataBase(video) {
    const result = await Videos.create(video);
    return result;
}
async function getAllVideosFromDataBase() {
    const result = await Videos.find();
    return result;
}


async function saveWorkerToDataBase(status) {

    let ip = await getIPAddress();
    let worker = {
        status : status,
        ip:ip,
        load: os.loadavg()[0],
    };
    const result = await Worker.findOneAndUpdate({ip:ip},worker,{upsert:true});
    
}
module.exports = {saveVideoToDataBase, getAllVideosFromDataBase, saveWorkerToDataBase};