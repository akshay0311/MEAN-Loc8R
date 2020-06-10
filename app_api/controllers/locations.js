var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

// enumerating all the location
module.exports.listLocations = function(req,res,next){
    Loc.find()
    .exec(function(err,list){
        if (err){
            res.status(404).json(err);
            return;    
        }
        res.status(200).json(list)
    });
}


// adding new location
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
                res.status(404).json({"msg":"location id not found"});
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




// updating location
module.exports.updateLocation = function(req,res,next){
    if (req.params && req.params.lid) {
        Loc.findById(req.params.lid)
        .select('-reviews -rating')
        .exec((err,loc)=>{
            if (!loc){
                res.status(404).json({"msg":"location id not found"});
                return;
            }
            if (err){
                res.status(404).json({"error":err});
                return;
            }
            else{
                   // updating name, address , facilities
                    loc.name = req.body.name;
                    loc.address = req.body.address;
                    loc.facilities = req.body.facilities.split(",");
                    // saving the updated location
                    loc.save((err,new_loc)=>{
                        if (err) {
                            sendJsonResponse(res, 404, err);
                            }
                        else{
                            res.status(200).json(new_loc);
                        }     
                    }); 
                }
            });
        }
    else{
        res.status(404).json({"msg":"location id is required as params"});
    }        
}





// deleting location
module.exports.delLocation = function(req,res,next){
        var locationid = req.params.locationid;
        if(locationid) {
            Loc
            .findByIdAndRemove(locationid)
            .exec(
                function(err, location) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 204, null);
                }
            );
            }else{
                sendJsonResponse(res, 404, {
                    "message": "No locationid"});
            }
        }
