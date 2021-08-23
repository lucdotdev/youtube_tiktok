const app = require('express')();
const {doTheJob} = require('./tikitoku');
const {authGoogle} = require("./src/auth2");

app.get('/', (req, res) => {    
    res.send('Hello World again!');
}
);

app.post('/tikitoku/byusername',async (req, res) => {   
    const userName = req.body.userName;
    const number = req.body.number;
    const result = await getTikByUserName(number, userName);
    const url = await doTheJob(result);

    res.send(url);
 })

app.listen(3000, () => {  
    
    authGoogle();
    console.log("App listen to ") 
});