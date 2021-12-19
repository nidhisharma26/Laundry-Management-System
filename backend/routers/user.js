const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/users')
const Item = require('../models/laundry')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users',async(req,res)=>{
    const user = new User(req.body)
    console.log(user)
    try{
        
        const save = await user.save()
        const token = await user.generateAuthToken()    
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/login',async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }
    catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout',auth,async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()

    }
})

router.post('/users/logoutAll',auth,async (req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/users/me',auth,async(req,res)=>{
    res.send(req.user)
})

router.patch('/users/me',auth,async(req,res)=>{
    console.log(req.body);
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','hostel','rollno','phone','laundryNo']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates!'})
    }
    try{
        updates.forEach((update)=>{
            req.user[update] = req.body[update]

        })
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
            
    }
})

router.delete('/users/me',auth,async(req,res)=>{
    try{
        await req.user.remove()
        res.send(req.user)

    }catch(e){
        res.status(400).send(e)
    }
})

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image'))
        }
        cb(undefined,true)
    }
})

router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()

},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})


router.get('/users/me/avatar',auth,async (req,res)=>{
    try{
        const user = await User.findById(req.user.id)

        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})

router.delete('/users/me/avatar',auth,async(req,res)=>{
    try{
        req.user.avatar=undefined
        await req.user.save()
        res.status(200).send()

    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/me/IDcard',auth,upload.single('IDcard'),async(req,res)=>{
    const buffer = await sharp(req.file.buffer).resize().png().toBuffer()
    req.user.IDcard = buffer
    await req.user.save()
    res.send()

},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.get('/users/me/IDcard',auth,async (req,res)=>{
    try{
        const user = await User.findById(req.user.id)

        if(!user || !user.IDcard){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.IDcard)
    }catch(e){
        res.status(404).send()
    }
})

router.delete('/users/me/IDcard',auth,async(req,res)=>{
    try{
        req.user.IDcard=undefined
        await req.user.save()
        res.status(200).send()

    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/users/me/laundry',auth,async(req,res)=>{
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
        const items = await  Item.find({studentId: req.user._id})
        // await req.user.populate({
        //     path: 'items',
        //     match:match,
        //     options:{
        //         limit: parseInt(limit),
        //         skip: parseInt(skip),
        //         sort:sort
        //     }
        // })
        // console.log(req.user.items);
        // res.send(req.user.items)
        res.send(items)
        console.log(items);
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router
