var mongoose = require('mongoose');
var Loc = mongoose.model('Location');


var updateAvgRating = (locationid)=> {
    var i, reviewCount, ratingAvg, ratingTotal;
    Loc
        .findById(locationid)
        .select('rating reviews')
        .exec(
            function(err, location) {
                if (!err) {
                    if (location.reviews && location.reviews.length > 0){
                        reviewCount = location.reviews.length;
                        ratingTotal = 0;
                        for (i = 0; i < reviewCount; i+=1){
                            ratingTotal+=location.reviews[i].rating;
                        }
                        ratingAvg = parseInt(ratingTotal/reviewCount,10);
                        location.rating = ratingAvg;
                        location.save(function(err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("Average rating updated to", ratingAverage);
                            }    
                        })
                    }
                }
            });
        }        


function doAddReview(req,res,loc){
    if (!loc){
        res.status(404).json({"msg":"location id not found"})
        return;
    } 
    else{
        loc.reviews.push({
            author: req.body.author,
            rating: req.body.rating,
            reviewText: req.body.reviewText
           });
        loc.save((err,new_loc)=>{
           if (err){
                res.status(400).json(err)
                return;
           } 
           else{
               updateAvgRating(loc._id)
               res.status(201).json(new_loc)
           }
        })
    }  
}


// creating a new reviews for a particular lid
module.exports.reviewsCreate = function(req,res,next){
    if (req.params && req.params.lid) {
        Loc.findById(lid)
        .select('reviews')
        .exec(function(err,loc){
            if (err){
                res.status(404).json(err);
            }        
            else{
                doAddReview(req,res,loc)       
            }
        })
    }   
    else{
        res.status(404).json({"msg":"location id required"})
    }
}

// read a review based on rid
module.exports.reviewsReadOne = function(req,res,next){
    if(req.params && req.params.lid && req.params.rid ){
        Loc.findById(lid)
        .select('name reviews')
        .exec(function(err,loc){
            if(!loc){
                res.status(404).json({"msg":"location id not found"});
                return;
            } 
            else if(err){
                res.status(400).json({"msg":err});

            }
            if (loc.reviews && loc.reviews.length > 0){
                var reviews;
                reviews = loc.reviews.find.id(req.params.rid)
                if (!reviews){
                    res.status(404).json({"msg":"review id not found"});
                    return;
                }
                else{
                    res.status(200).json(reviews);
                }
            }   
            else{
                res.status(404).json({"msg":"No reviews found"});
                return;
            }
        })
    }
    else{
        res.status(404).json({"msg":"locationid and reviewid not found"})
    }
}
                    
    
// updating review
module.exports.reviewsUpdateOne = function(req,res,next){
    if (req.params.lid && req.params.rid) {
        Loc.findById(lid)
        .select('reviews')
        .exec(function(err,loc){
            if(!loc){
                res.status(404).json({"msg":"location id not found"})
                return;
            } 
            else if(err){
                res.status(400).json({"msg":err})
                return;
            }
            if (loc.reviews && loc.reviews.length > 0){
                var reviews;
                reviews = loc.reviews.find.id(req.params.rid)
                if (!reviews){
                    res.status(404).json({"msg":"review id not found"})
                    return;
                }
                else{
                    loc.author = req.body.author;
                    loc.rating = req.body.rating;
                    loc.review = req.body.review;
                    loc.save(function(err,new_loc){
                        if (err) {
                            sendJsonResponse(res, 404, err);
                            }
                        else{
                            updateAvgRating(loc._id);
                            res.status(200).json(new_loc);
                        }     
                    }); 
                }
            }   
            else{
                res.status(404).json({"msg":"No reviews found"})
                return;
            }
        })
    }
    else{
        res.status(404).json({"msg":"locationid or reviewid is require"});
    }
}


// deleting review for a particular locatiob
module.exports.reviewsDeleteOne = function(req,res,next){
    res.status(200).json({"msg":"Success"})
}

