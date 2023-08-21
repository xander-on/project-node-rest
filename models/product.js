
const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name:{
        type     : String,
        required : [ true, 'El nombre de la category es obligatorio'],
        unique   : true
    },

    state:{
        type     : Boolean,
        default  : true,
        required : true
    },

    user:{
        type     : Schema.Types.ObjectId,
        ref      : 'User',
        required : true
    },

    precio:{
        type    : Number,
        default : 0,
    },

    category:{
        type     : Schema.Types.ObjectId,
        ref      : 'Category',
        required : true
    },

    description:{
        type : String
    },

    isAvailable:{
        type    : Boolean,
        default : true
    }
});


ProductSchema.methods.toJSON = function(){
    const { __v, ...data } = this.toObject();
    return data;
}



module.exports = model( 'Product', ProductSchema );
