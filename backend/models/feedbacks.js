const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    message:{
        type:String,
        trim:true
    },
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    rating:{
        Number:Boolean,
    },
})
const Feedback = mongoose.model("Feedback",feedbackSchema)

module.exports = Feedback