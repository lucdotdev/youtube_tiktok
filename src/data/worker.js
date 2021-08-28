const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
    ip : {type: String, unique: true},
    port : {type: Number,},
    name : {type: String, },

    // 0 = up, 1 = down, 2 = working
    status : {type: Number, },
    load : {type: Number, },
});

const Worker = mongoose.model("Worker", workerSchema);

module.exports = Worker;