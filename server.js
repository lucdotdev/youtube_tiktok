const express = require('express');
const app = express();
const {doTheJob} = require('./tikitoku');
const {getTikByUserName}= require("./src/scraping")
const {authGoogle} = require("./src/auth2");

app.use(express.json())
app.get('/', (req, res) => {    
    res.send('Hello World again!');
}
);

app.post('/tikitoku/byusername',async (req, res) => { 
    
    
    const userName = req.body.userName;
    const number = req.body.number;

    res.send("wait");
    const result = await getTikByUserName(number, userName);
    const url = await doTheJob(result);

    console.log(url);

  
 })

app.listen(process.env.PORT || 5000, () => {  
    
    authGoogle();
    console.log("App listen to ") 
});