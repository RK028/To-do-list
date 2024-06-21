const express = require('express');
const http = require('http')
const cors = require('cors');
const app = express();
const { connect } = require('mongoose');
const collection = require('./models/list');
const { list } = require('pm2');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))


app.get('/alldatas', async(req,res)=>{
    try {
    const data = await collection.find({});
    // console.log(data);
    res.status(200).json(data) 
    } catch (error) {
        res.status(400).json({error})
        
    }
})
app.post('/create', async (req,res)=>{
    const { date, list } =req.body;
    // console.log(req.body);
    if(!date || !list){
        res.status(400).json(
            'missing the required data'
        )
    }
    try {
        const data = {date, list};
        const savedata = await collection.create(data)
        // console.log(savedata);
        res.status(200).json({savedata})
        
    } catch (error) {
        res.status(400).json({error})
        
    }

})

app.post('/update', async (req,res) =>{
    const {date,list} =req.body
    // console.log(req.body._id.id);

    const data ={
        date:date,
        list:list,
    }
    try {
        const check =await collection.findOneAndUpdate({_id:req.body._id.id},{$set:data})
        console.log(check)

        if(check){
            res.json({ status:true, data:check})
        }
        else{
            res.json({ status:false,data:"ok"})
        }
    } catch (e){
        console.log(e)
        res.json({ status:false,data:e})
        
        
    }
})

app.post('/delete', async (req,res)=>{
    // console.log(res.body);
    try {
        const check =await collection.findOneAndDelete({_id:req.body._id})
        console.log(check)

        if(check){
            res.json({ status:true, data:check})
        }
        else{
            res.json({ status:false,data:"ok"})
        }
    } catch (e){
        console.log(e)
        res.json({ status:false,data:e})
        
        
    }
})

app.use((err, req, res, next)=>{
    res.status(400).json({
        err
    })
})

app.listen(5000,()=>{
    console.log("Port is connect");
})