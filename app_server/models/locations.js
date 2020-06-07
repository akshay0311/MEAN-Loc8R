var mongoose = require("mongoose");

var openingTimeSchema = new mongoose.Schema({
    days: {type: String, required: true},
    opening: String,
    closing: String,
    closed: {type: Boolean, required: true}
});

var customerReviewsSchema = new mongoose.Schema({
  author :{type:String,required:true},
  createdOn:String,
  rating:{type:Number,default:0, min: 0, max: 5},  
  review:{type:String, required:true}
});

var locationSchema = new mongoose.Schema({
    name:{type:String, required: true},
    address:String,
    facilities:[String],
    distance:Number,
    rating:{type: Number,default: 0, min: 0 ,max: 5},
    coords: {type: [Number], index: '2dsphere'},
 });


module.exports =  mongoose.model('Location', locationSchema);
