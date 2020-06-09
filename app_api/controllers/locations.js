var mongoose = require('mongoose');
var Loc = mongoose.model('Location');


module.exports.listLocations = function(req,res,next){
    res.status(200).json({"msg":"Success"})
}

module.exports.newLocation = function(req,res,next){
    res.status(201).json({"msg":"Success"})
}



module.exports.readLocation = function(req, res) {
    if (req.params && req.params.locationid) {
        Loc.findById(req.params.locationid)
        .exec((err,loc)=>{
            if (!loc){
                res.status(404).json({"msg":"location not found"});
                return;
            }
            if (err){
                res.status(404).json({"error":err});
                return;
            }
            else{
                res.status(200).json({"location":loc});
            }
        });
    }    
        else{
            res.status(404).json({"msg":"enter the param"});
        }

}



module.exports.updateLocation = function(req,res,next){
    res.status(201).json({"msg":"Success"})
}


module.exports.delLocation = function(req,res,next){
    res.status(200).json({"msg":"Success"})
}