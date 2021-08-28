const router = require("express").Router();
const {runTheJob} = require('../../tikitoku');
const {getTikByUserName, getTikByHashTag, getTikByTrending}= require("../core/scraping")


router.post('/byusername',async (req, res) => { 
    res.send("done");
    try{
        const userName = req.body.userName;
        const number = req.body.number;
        const result = await getTikByUserName(number, userName);
        const url = await runTheJob(result);
        console.log(url);
       
    } catch(e){
        console.log(e);
    }
    
  
 });
 router.post('/byhastag',async (req, res) => { 
    res.send("done");
    try{
        const hashtag = req.body.name;
        const number = req.body.number;
        const result = await getTikByHashTag(number, hashtag);
        const url = await runTheJob(result);
        console.log(url);
       
    } catch(e){
        console.log(e);
    }
  
 })

 router.post('/bytrending',async (req, res) => { 
    res.send("done");
    try{
        const trending = req.body.name;
        const number = req.body.number;
        const result = await getTikByTrending(number, trending);
        const url = await runTheJob(result);
        console.log(url);
       
    } catch(e){
        console.log(e);
    }
  
 })

 module.exports = router;