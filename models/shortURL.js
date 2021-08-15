const mongoose = require('mongoose');
const shortid = require('shortid');


const URLschema = new mongoose.Schema({
    full:{
        type:String,
        required:true
    },
    short:{
        type:String,
        require:true,
        default: shortid.generate
    },
    clicks:{
        type:Number,
        require:true,
        default:0
    }

})

module.exports = mongoose.model('url',URLschema);