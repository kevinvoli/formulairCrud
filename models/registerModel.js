const mongoose = require('mongoose')


const ProduitShema = new mongoose.Schema({
    name : {type:String},
    lastName:{type:String},
    email: {type:String, require:true},
    numero:{type: Number}
}) 

exports.User= mongoose.model('user',ProduitShema)