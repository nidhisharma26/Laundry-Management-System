const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const Service = require('../models/services')
const auth = require('../middleware/authser')
const router = new express.Router()

router.post('/service',async(req,res)=>{
    const serviceP = new Service(req.body)
    console.log(serviceP)
    try{      
        const save = await serviceP.save()
        const token = await serviceP.generateAuthToken()    
        res.status(201).send({serviceP,token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/service/login',async(req,res)=>{
    try{
        console.log(req.body);
        const serviceP = await Service.findByCredentials(req.body.email,req.body.password)
        const token = await serviceP.generateAuthToken()
        res.send({serviceP,token})
    }
    catch(e){
        res.status(400).send()
    }
})

router.post('/service/logout',auth,async (req,res)=>{
    try{
        console.log(req.serviceP);
        req.serviceP.tokens = req.serviceP.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.serviceP.save()
        res.send()
    }catch(e){
        res.status(500).send()

    }
})

router.post('/service/logoutAll',auth,async (req,res)=>{
    try{
        req.serviceP.tokens = []
        await req.serviceP.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/service/me',auth,async(req,res)=>{
    res.send(req.serviceP)
})

router.patch('/service/me',auth,async(req,res)=>{
    // console.log(req.body);
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates!'})
    }
    try{
        updates.forEach((update)=>{
            req.serviceP[update] = req.body[update]

        })
        await req.serviceP.save()
        res.send(req.serviceP)
    }catch(e){
        res.status(400).send(e)
            
    }
})

router.delete('/service/me',auth,async(req,res)=>{
    try{
        await req.serviceP.remove()
        res.send(req.serviceP)

    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router