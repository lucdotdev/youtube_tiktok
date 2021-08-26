const express = require('express');
const app = express();
const {doTheJob} = require('./tikitoku');
const {getTikByUserName}= require("./src/scraping")


const port = process.env.PORT || 3000;

app.use(express.json())
app.get('/', (req, res) => {    
    res.send('Hello World again!');
}
);

app.post('/tikitoku/byusername',async (req, res) => { 
    
    try{
        const userName = req.body.userName;
        const number = req.body.number;
    
       
        const result = await getTikByUserName(number, userName);
        const url = await doTheJob(result);
        console.log(url);
        res.send(url);
    } catch(e){
        res.send(e);
    }
  
 })

app.listen(port, () => {  
    
   
    console.log("App 🧥 listen to port : " + port) 
});