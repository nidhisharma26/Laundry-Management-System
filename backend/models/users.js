const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Item = require('../models/laundry')

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
      },
      laundryNo:{
          type:Number,
          required: [true, 'Please add Laundry Number based on your room number'],
          unique:true
      },
      laundryId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Item'
      },
      rollno: {
        type: Number,
        required: [true, 'Please add a roll no.']
      },
      hostel: {
        type: String,
        trim: true,
      },
      phone: {
        type: Number,
        minlength: 10,
        maxlength: 10,
      },
      tokens:[{
        token:{
            type: String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    },
    IDcard:{
        type:Buffer
    }
})

userSchema.virtual('items', {
    ref: 'Item',
    localField: '_id',
    foreignField: 'studentId'
})

userSchema.virtual('complaints', {
    ref: 'Complaint',
    localField: '_id',
    foreignField: 'studentId'
})

userSchema.virtual('feedbacks', {
    ref: 'Feedback',
    localField: '_id',
    foreignField: 'studentId'
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    delete userObject.IDcard

    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'thisismynewcourse')

    user.tokens = user.tokens.concat({token:token})
    save = await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email,password)=>{
    // console.log(email);
    // console.log(password);
    const user = await User.findOne({email})
    // console.log(user);
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}


//match the saved text password before saving
userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User