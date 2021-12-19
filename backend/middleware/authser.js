const jwt = require('jsonwebtoken')
const Service = require('../models/services')


const auths = async (req,res,next)=>{
    try{
        // console.log(req);
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,'thisismynewcourse')
        const serviceP = await Service.findOne({_id:decoded._id,'tokens.token':token})
        if(!serviceP){
            throw new Error()
        }
        req.token = token
        req.serviceP = serviceP
        next()

    }catch(e){
        res.status(401).send({error:'Please Authenticate.'})

    }
}

module.exports = auths