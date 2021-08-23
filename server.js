const app = require('express')();
const {doTheJob} = require('./tikitoku');

app.get('/', (req, res) => {    
    res.send('Hello World!');
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
});