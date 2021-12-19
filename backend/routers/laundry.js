const express = require('express')
const mongoose = require('mongoose')
const Item = require('../models/laundry')
const User = require('../models/users')
const auth = require('../middleware/authser')
const router = new express.Router()

router.post('/laundry',auth,async(req,res)=>{
    lno = req.body.laundryNo
    try{   
        const user = await User.findOne({"laundryNo":lno})        
        const item = new Item({...req.body,owner: req.serviceP._id,studentId:user._id})
        const save = await item.save() 
        user['laundryId'] = req.body['_id']
        const save1 = await user.save() 
        res.status(201).send({item})
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/laundry',auth,async(req,res)=>{
    const match = {}
    const sort = {}
    var limit = 0
    var skip = 0
    if(req.query.completed){
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
        await req.serviceP.populate({
            path: 'items',
            match:match,
            options:{
                limit: parseInt(limit),
                skip: parseInt(skip),
                sort:sort
            }
        })
        console.log(req.serviceP.items);
        res.send(req.serviceP.items)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router