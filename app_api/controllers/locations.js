var mongoose = require('mongoose');
var Loc = mongoose.model('Location');


module.exports.listLocations = function(req,res,next){
    res.status(200).json({"msg":"Success"})
}

module.exports.newLocation = function(req,res,next){
    var newLoc;
    newLoc = {
            name: req.body.name,
            address: req.body.address,
            facilities: req.body.facilities.split(","),
            coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
            openingTimes: [{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed: req.body.closed1,
            }, {
                days: req.body.days2,
                opening: req.body.opening2,
                closing: req.body.closing2,
                closed: req.body.closed2,
            }]
        }
    
    Loc.create(newLoc,(err,res)=>{
        if (err){
            res.status(404).json({"msg":err})
            return;
        }
        else{
            res.status(201).json({"msg":"successfully created"})
        }
    })
}


// fetching location data
module.exports.readLocation = function(req, res) {
    if (req.params && req.params.lid) {
        Loc.findById(req.params.lid)
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