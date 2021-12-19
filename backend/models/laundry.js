const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    laundryNo:{
        type: Number,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
    totalItems:{
        type: Number,
        required:true
        
    },
    completed:{
        type:Boolean,
        default:false
    },
    top:{
        type: Number,
    },   
    lower:{
        type: Number,
    },
    towel:{
        type: Number,
    },
    bedsheet:{
        type: Number,
    },
    pillowCover:{
        type: Number,
    },
    servicePname:{
        type:String,
        trim:true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Service'
    }
},{
    timestamps:true
})
const Item = mongoose.model("Item",itemSchema)

module.exports = Item