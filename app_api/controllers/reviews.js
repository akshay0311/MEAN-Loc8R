var mongoose = require('mongoose');
var Loc = mongoose.model('Location');




module.exports.reviewsCreate = function(req,res,next){
    res.status(201).json({"msg":"Success"})
}

module.exports.reviewsReadOne = function(req,res,next){
    if(req.params && req.params.lid && req.params.rid ){
        Loc.findById(lid)
        .select('name reviews')
        .exec(function(err,loc){
            if(!loc){
                res.status(404).json({"msg":"location id not found"})
                return;
            } 
            else if(err){
                res.status(400).json({"msg":err})
            }
            if (loc.reviews && loc.reviews.lenght > 0){
                var reviews;
                reviews = loc.reviews.find.id(req.params.rid)
                if (!reviews){
                    res.status(404).json({"msg":"review id not found"})
                    return;
                }
                else{
                    res.status(200).json(reviews)
                }
            }   
            else{
                res.status(404).json({"msg":"No reviews found"})
                return;
            }
        })
    }




    else{
        res.status(404).json({"msg":"locationid and reviewid not found"})
    }
}
                    
    

module.exports.reviewsUpdateOne = function(req,res,next){
    res.status(201).json({"msg":"Success"})
}

module.exports.reviewsDeleteOne = function(req,res,next){
    res.status(200).json({"msg":"Success"})
}

