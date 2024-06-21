const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/todolist")
.then(()=>{
    console.log("mongo Connected");
})
.catch(()=>{
    console.log("Mongo Not Connected");
})

const todolist = new mongoose.Schema({
    date:{
        required:true,
        type:String,
    },
    list:{
        type:String,
        required:true
    }
})
const collection = mongoose.model("todolist", todolist)
module.exports = collection;