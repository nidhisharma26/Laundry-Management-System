const mongoose = require('mongoose')

const complaintSchema = new mongoose.Schema({
    message:{
        type:String,
        trim:true,
    },
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    resolved:{
        type:Boolean,
        default:false
    },
})
const Complaint = mongoose.model("Complaint",complaintSchema)

module.exports = Complaint