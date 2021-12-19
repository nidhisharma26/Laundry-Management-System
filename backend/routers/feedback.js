const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/users')
const Feedback = require('../models/feedbacks')
const auth = require('../middleware/auth')
const auths = require('../middleware/authser')
const router = new express.Router()

router.post('/users/me/feedback',auth,async(req,res)=>{ 
    const feedback = new Feedback({
        ...req.body,
        studentId:req.user._id
    })
    console.log(feedback);
    try{            
        const save = await feedback.save() 
        res.status(201).send({feedback})
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/users/me/feedback',auth,async(req,res)=>{
    const match = {}
    const sort = {}
    var limit = 0
    var skip = 0
    if(req.query.limit){
        limit = req.query.limit
    }
    if(req.query.skip){
        limit = req.query.skip
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] ==='desc'?-1:1
    }
    try{
        // const tasks = await  Task.find({owner: req.user._id}).execPopulate()
        await req.user.populate({
            path: 'feedbacks',
            match:match,
            options:{
                limit: parseInt(limit),
                skip: parseInt(skip),
                sort:sort
            }
        })
        res.send(req.user.feedbacks)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/users/me/feedback/:id',auth,async(req,res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ['message','rating']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation)
    {
        return res.status(400).send({error:'Invalid update'})
    }

    try{
        const feedback = await Feedback.findOne({_id:req.params.id ,studentId:req.user._id})
        // const task = await Task.findByIdAndUpdate(req.params.id)
        if(!feedback){
            return res.status(404).send()
        }
        updates.forEach((update)=>{
            feedback[update] = req.body[update]
        })
        await feedback.save()
        res.send(feedback)

    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/me/feedback/:id',auth,async(req,res)=>{
    try{
        const feedback = await Feedback.findOneAndDelete({_id:req.params.id,studentId:req.user._id})
        if(!feedback){
            return res.status(404).send()
        }
        res.send(feedback)

    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/service/feedback',auths,async(req,res)=>{

    try{
        const feedback = await  Feedback.find()
        res.send(feedback)
        console.log(feedback);
    }catch(e){
        res.status(500).send()
    }
})

router.delete('/service/feedback/:id',auths,async(req,res)=>{
    try{
        const feedback = await Feedback.findOneAndDelete({_id:req.params.id})
        if(!feedback){
            return res.status(404).send()
        }
        res.send(feedback)

    }catch(e){
        res.status(400).send(e)
    }
})


module.exports = router