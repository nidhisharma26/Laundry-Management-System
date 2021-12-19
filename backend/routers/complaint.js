const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/users')
const Complaint = require('../models/complaints')
const auth = require('../middleware/auth')
const auths = require('../middleware/authser')
const router = new express.Router()

router.post('/users/me/complaint',auth,async(req,res)=>{    
    const complaint = new Complaint({
        ...req.body,
        studentId:req.user._id
    })
    console.log(complaint);
    try{            
        const save = await complaint.save() 
        res.status(201).send({complaint})
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/users/me/complaint',auth,async(req,res)=>{
    const match = {}
    const sort = {}
    var limit = 0
    var skip = 0
    if(req.query.resolved){
        match.completed = req.query.completed ==='true'
    }
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
            path: 'complaints',
            match:match,
            options:{
                limit: parseInt(limit),
                skip: parseInt(skip),
                sort:sort
            }
        })
        res.send(req.user.complaints)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/users/me/complaint/:id',auth,async(req,res)=>{
    console.log(req.body);
    console.log(req.params.id);
    const updates = Object.keys(req.body)
    const allowedUpdates = ['message','resolved']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation)
    {
        return res.status(400).send({error:'Invalid update'})
    }

    try{
        const complaint = await Complaint.findOne({_id:req.params.id ,studentId:req.user._id})
        // const task = await Task.findByIdAndUpdate(req.params.id)
        if(!complaint){
            return res.status(404).send()
        }
        updates.forEach((update)=>{
            complaint[update] = req.body[update]
        })
        await complaint.save()
        res.send(complaint)

    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/me/complaint/:id',auth,async(req,res)=>{
    try{
        const complaint = await Complaint.findOneAndDelete({_id:req.params.id,studentId:req.user._id})
        if(!complaint){
            return res.status(404).send()
        }
        res.send(complaint)

    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/service/complaint',auths,async(req,res)=>{
    try{
        const complaint = await  Complaint.find()
        res.send(complaint)
        console.log(complaint);
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/service/complaint/:id',auths,async(req,res)=>{
    // console.log(req.body);
    // console.log(req.params.id);
    const updates = Object.keys(req.body)
    const allowedUpdates = ['message','resolved']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation)
    {
        return res.status(400).send({error:'Invalid update'})
    }

    try{
        const complaint = await Complaint.findOne({_id:req.params.id})
        // const task = await Task.findByIdAndUpdate(req.params.id)
        if(!complaint){
            return res.status(404).send()
        }
        updates.forEach((update)=>{
            complaint[update] = req.body[update]
        })
        await complaint.save()
        res.send(complaint)

    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/service/complaint/:id',auths,async(req,res)=>{
    try{
        const complaint = await Complaint.findOneAndDelete({_id:req.params.id})
        if(!complaint){
            return res.status(404).send()
        }
        res.send(complaint)

    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router