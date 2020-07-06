const mongoose = require('mongoose')
const noteSchema = new mongoose.Schema({
    note:{
        type:String,
        required:true
    }
})

mongoose.model("Note",noteSchema)