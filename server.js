const express = require('express');
const app = express();
const {authorise} = require('./src/auth2')
const {doTheJob} = require('./tikitoku');
const {getTikByUserName}= require("./src/scraping")


const port = process.env.PORT || 3000;

app.use(express.json())
app.get('/', (req, res) => {    
    res.send('Hello World again!');
}
);

app.post('/tikitoku/byusername',async (req, res) => { 
    res.send("done");
    try{
        const userName = req.body.userName;
        const number = req.body.number;
    
       
        const result = await getTikByUserName(number, userName);
        const url = await doTheJob(result);
        console.log(url);
       
    } catch(e){
        console.log(e);
    }
  
 })

app.listen(port, () => {  
    authorise();
    console.log("App 🧥 listen to port : " + port) 
});