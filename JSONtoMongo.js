'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri, {
    useMongoClient: true
});

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
var listings = JSON.parse(fs.readFileSync('listings.json', 'utf8'));
listings = listings["entries"];

for(var i = 0; i<listings.length; i++){
    var entry = new Listing({
        code: listings[i].code,
        name: listings[i].name
    });

    if(listings[i].hasOwnProperty('coordinates')){
        entry.coordinates.latitude = listings[i].coordinates.latitude;
        entry.coordinates.longitude = listings[i].coordinates.longitude;
    }

    if(listings.hasOwnProperty('address')){
        entry.address = listings[i].address;
    }

    entry.save(function(err){
        if(err){
            throw err;
        }
    });
}


/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */