var path = require('path');
var request = require("request");
var express = require("express");
var app = express.Router();


//scraping tools
var request = require("request");
var cheerio = require("cheerio");


//models 
// var Note = require("../../models/Note.js");
var User = require("../../models/User.js");
var Item = require("../../models/Item.js");





// Routes
//==========================
//getItemIds
app.get("/getUserData/:id", function (req, res) {
    console.log("I'm in profile api js /getUserData/:id")
    console.log(req.params.id);
    User.findById(req.params.id)
        .populate("properties.items")
        .then(function (doc, error) {
            // Log any errors
            if (error) {
                console.log("getUserData back-end failed!")
                console.log(error);
            }
            // Or send the doc to the browser as a json object
            else {
                console.log("getUserData back-end was successful!");
                //// below console log log out the long query of imageUpload
                // console.log(doc);
                res.json(doc);
            }
        });

    // //Get Items
    // app.get("/getItems", function (req, res) {
    //     console.log("I'm IN THE BACKEND /getItems route api/profile")
    //     var result = req.body;
    //     console.log(result);
    //     for(i=0; i<result.length; i++) {
    //         result[i] = mongoose.Types.ObjectId(result[i]);
    //     }

    //     User.find({
    //         '_id': {
    //             $in: result

    //             [
    //                 mongoose.Types.ObjectId('4ed3ede8844f0f351100000c'),
    //                 mongoose.Types.ObjectId('4ed3f117a844e0471100000d'),
    //                 mongoose.Types.ObjectId('4ed3f18132f50c491100000e')

    //             ]
    //         }
    //     },function (error, doc) {
    //         // Log any errors
    //         if (error) {
    //             console.log(error);
    //         }
    //         // Or send the doc to the browser as a json object
    //         else {
    //             console.log("GET ITEMS WAS SUCCESSFUL ON THE BACK END")
    //             console.log(doc);
    //             res.json(doc);
    //         }
    //     });


    // });

    //SAVE ITEM EVERYTIME SOMEONE CLICKS ADD ITEM
    app.post("/saveItem", function (req, res) {
        console.log("I'm IN THE BACKEND /saveItem route api/profile")
        var resultObj = {
            properties: {
                itemName: req.body.item.itemObj.itemName,
                itemSummary: req.body.item.itemObj.itemSummary,
                itemImage: req.body.item.itemObj.itemImage
            },
            geometry: {}
        };
        var userProfile = req.body.item.itemObj.userProfile
        // console.log(result);
        // Using our Article model, create a new entry
        // This effectively passes the result object to the entry (and the title and link)
        // Create a new note and pass the req.body to the entry

        // resultObj.results = results
        // var apiKey = "AIzaSyBIG5ox_iGJBmdS5y1vyuaGEZUb9eBWe6U"
        // var query = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + req.params.location + "&key=" + apiKey;
        // var query2 = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + result.location + "&destinations=&key=" + apiKey;
        // request(query, function (error, response, body) {
        //     if (!error && response.statusCode === 200) {

        //         resultObj.location = JSON.parse(body).results;
        //         // resultObj.location = body
        //         res.json(resultObj)

        //     } else {
        //         resultObj.results = "Google Maps API was not successful!"
        //     }

        // });
        console.log("BEFORE I REQUEST GOOGLE API");
        console.log(userProfile);
        var apiKey = "AIzaSyBIG5ox_iGJBmdS5y1vyuaGEZUb9eBWe6U"
        var query = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + userProfile.user_address + "+" + userProfile.user_city + "+" + userProfile.user_state + "&key=" + apiKey;
        // var query2 = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + req.params.location + "&destinations=&key=" + apiKey;
        console.log(query);
        request(query, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("I've requested the registered user's access, google api, below is googleLocation")
                let googledLocation = JSON.parse(body).results[0];
                console.log("test")
                console.log(googledLocation)

                // resultObj.location = body
                let coordinateString = googledLocation.geometry.location.lng + "," + googledLocation.geometry.location.lat;
                resultObj.geometry = {
                    coordinates: coordinateString.split(',').map(Number)
                }
                resultObj.user_formatted_address = googledLocation.formatted_address;
                var newItem = new Item(resultObj);
                // And save the new note the db
                newItem.save(function (error, doc) {
                    // Log any errors
                    if (error) {
                        console.log(error);
                    }
                    // Otherwise
                    else {
                        console.log("newItem.save was successful in profile route /saveItem")
                        console.log("bleow is doc")
                        console.log(doc._id)
                        console.log(doc);
                        // Use the item id to find and update it's note
                        User.findOneAndUpdate({ "_id": req.body.item.userId }, { $push: { "properties.items": doc._id } },
                            { safe: true, upsert: true })
                            // Execute the above query
                            .exec(function (err, doc) {
                                // Log any errors
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    // Or send the document to the browser
                                    console.log("User.Find One And Update in Save Item Route is successful. ")
                                    console.log(doc);
                                    res.json(doc);
                                }
                            });
                    }
                });
            }
        })

    });
});


/**
 * SaveProfile function for updating the profile information against the user
 */
app.post("/saveProfile", function(req, res) {
    console.log("server log: saveProfile function called");
    var result = req.body;
    console.log(req.body.businessName);
    
    User.findOneAndUpdate({ "_id": req.body.id }, { $set: { "business_name": req.body.business_name, 
                                                            "business_address":req.body.business_address, 
                                                            "business_zip":req.body.business_zip, 
                                                            "business_phone":req.body.business_phone,
                                                            "business_fax":req.body.business_fax,
                                                            "business_email":req.body.business_email,
                                                            "business_facebook":req.body.business_facebook,
                                                            "business_instagram":req.body.business_instagram,
                                                            "business_logo":req.body.business_logo,
                                                            "business_profile":req.body.business_profile,
                                                            "business_description":req.body.business_description,
                                                        } },
                        { multi: true, upsert: false })
    .exec(function (err, doc) {
        // Log any errors
        if (err) {
            console.log(err);
        }
        else {
            // Or send the document to the browser
            // console.log(doc);
            res.json(doc);
        }
    });
});

/**
 * Get Item for a given ItemId
 */
app.get("/getItem/:id", function(req, res) {
    // console.log("Server: " + req.params.id);
    Item.findById(req.params.id)
    .then(function(doc, err) {
        if(err) {
            console.log("Error encountered while retrieving Item details for id: " + id);
            console.log("/n" + err);
        } else {
            res.json(doc);
        }
    })
});

/**
 * Update Item details for a given Item Id
 */
app.post("/updateItem/:id", function(req, res) {
    Item.findByIdAndUpdate(req.params.id,
    {$set: {
        itemName: req.body.itemName,
        itemSummary: req.body.itemSummary
    }}, {new: true}, function(err, event) {
        if(err) {
            throw err;
        }
        res.send(event);
    })
});
app.delete("/deleteItem/:id",function(req,res){
    console.log(req.params.id);
    Item.findByIdAndRemove(req.params.id, function(err, obj) {
        if(err) {
            throw err;
        }
        res.send(obj);
    });
})



module.exports = app;