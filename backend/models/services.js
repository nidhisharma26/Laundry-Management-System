const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const serviceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'Please add an email'],
        trim:true,
        lowercase:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error('Email is invalid')
            }
        }
    },
    designation:{
        type:String,
        // required:[true, 'Hostel/Cos Shop owner'],
        trim:true
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
      },
      hostel: {
        type: String,
        trim: true,
      },
      tokens:[{
        token:{
            type: String,
            required:true
        }
    }]
})

serviceSchema.virtual('items', {
    ref: 'Item',
    localField: '_id',
    foreignField: 'owner'
})


serviceSchema.methods.toJSON = function(){
    const serviceP = this
    const serviceObject = serviceP.toObject()
    delete serviceObject.password
    delete serviceObject.tokens

    return serviceObject
}

serviceSchema.methods.generateAuthToken = async function(){
    const serviceP = this
    const token = jwt.sign({_id:serviceP._id.toString()},'thisismynewcourse')

    serviceP.tokens = serviceP.tokens.concat({token:token})
    save = await serviceP.save()
    return token
}

serviceSchema.statics.findByCredentials = async (email,password)=>{
    const serviceP = await Service.findOne({email})
    if(!serviceP){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,serviceP.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }

    return serviceP
}

//match the saved text password before saving
serviceSchema.pre('save',async function(next){
    const serviceP = this
    if(serviceP.isModified('password')){
        serviceP.password = await bcrypt.hash(serviceP.password,8)
    }
    next()
})


const Service = mongoose.model('Service', serviceSchema)

module.exports = Service
