const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const Notescheme = mongoose.model("Note")
const protected = require('../middleware/authMiddleware')

//fetch all note
router.get("/getNotes",protected, (req, res) => {
    Notescheme.find() 
    .then(data=>{
        res.json({data})
    })
    .catch(err=>{
        console.log(err)
    })
});

//create note

router.post('/newNote',protected,(req,res)=>{
    const {note} = req.body
    const createNote = new Notescheme({
        note
    })
    createNote.save().then(result=>{
        res.json({createNote:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

//delete note

router.delete('/deleteNote/:id',protected,(req,res) =>{
    Notescheme.findOne({_id:req.params.id})
    .then(data=>{
        data.remove()
        res.json("note deleted successfully");
    })
    .catch(err=>{
        console.log(err)
    })
})

//fetch note by id

router.get('/getNote/:id',protected,(req,res) =>{
    Notescheme.findOne({_id:req.params.id})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

//update user

router.put('/editNote/:id',protected,(req,res) =>{

    const Id  = req.params.id;
    var note = { $set: {note: req.body.note } };

    Notescheme.findByIdAndUpdate({_id:Id}, note)
    .then(data =>{
        res.json("note edited successfully")
    }).catch(err=>{console.log(err)})
})


module.exports = router