require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = require("./src/routes/routes");
const { authorise } = require("./src/core/auth2");
const { saveWorkerToDataBase } = require("./src/data/store");
const { getIPAddress, notifyBySms } = require("./src/core/utils");
const os = require("os");

const port = process.env.PORT || 3000;

app.use(express.json());
app.get("/", async (req, res) => {
  let ip = await getIPAddress(req);
  res.send(`
   <p>
    Hello World again\n
    from ${os.hostname()} \n
    my ip is ${ip}
    my current pid is ${process.pid}\n
    my cpu count is ${os.cpus().length}\n
    my cpu load is ${os.loadavg()}\n
    my memory is ${(os.freemem() / 1024 / 1024).toFixed(0)}/ ${(
    os.totalmem() /
    1024 /
    1024
  ).toFixed(0)} mb\n
    </p>
    `);
});

app.use("/tikitoku", routes);

app.listen(port, async () => {
  let ip = await getIPAddress();

  try {
    await authorise();
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/tikitoku"
    );
    notifyBySms("Server " + ip + "is up");
    await saveWorkerToDataBase(1);
  } catch (e) {
    notifyBySms("Server " + ip + "failed to run");
    saveWorkerToDataBase(0);
    // process.exit(1);
    console.error(e);
  }
  console.log("App 🧥 listen to port : " + port);
});
