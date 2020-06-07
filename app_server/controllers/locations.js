module.exports.home = (req,res)=>{
    res.render("home",{
        pageheader:{
            title:"Loc8r",
            strapline:"Find places to work with wifi near you!"
        },
        locations: [{
            name: 'Starcups',
            address: '125 High Street, Reading, RG6 1PS',
            rating: [1,2,3],
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '100m'
            },{
            name: 'Cafe Hero',
            address: '125 High Street, Reading, RG6 1PS',
            rating: [1,2,3,4],
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '200m'
            },{
            name: 'Burger Queen',
            address: '125 High Street, Reading, RG6 1PS',
            rating: [1,2],
            facilities: ['Food', 'Premium wifi'],
            distance: '250m'
            }]

        })
}



module.exports.location = (req,res)=>{
    res.render("location-info",{
        location:[{
            name: "Starcups",
            address : "125 High Street, Reading, RG6 1PS",
            rating:[1,2,3],
            facilities:['Hot drinks', 'Food', 'Premium wifi'],
            openingHours:[
                "Monday - Friday : 7:00am - 7:00pm",
                "Saturday : 8:00am - 5:00pm",
                "Sunday : Closed"
            ],    
            customers:[
                {
                    name:"Simon Holmes",
                    date:"9 July 2020",
                    rating:[1,2,3],
                    review:"What a great place to work in.Excellent wifi!"
                },
                {
                    name:"Charles Dickens",
                    date:"10 August 2020",
                    rating:[1,2],
                    review:"Place is ok.Need to work on ambience"
                }
            ]
        }]
    })
}

module.exports.review = (req,res)=>{
    res.render("review",{title:'Review'})
}