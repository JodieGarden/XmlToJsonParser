var MongoClient = require('mongodb').MongoClient;



var ParserQuery = function(){ 
  this.url = 'mongodb://localhost:27017/parsed_submissions';
}

ParserQuery.prototype = {
  all: function(collectionName, onQueryFinished){
    console.log("ive been called")
    MongoClient.connect(this.url, function(err, db) {

      console.log("database connected at .all")

      if(err) { console.log("can't connect to url")} else {
        var collection = db.collection(collectionName); 
          collection.find().toArray(function(err, docs){
          if (!err){
          onQueryFinished(docs)
          db.close();
          }
        })
      }
    })
  },

  add: function(fileToAdd, collectionName){
    MongoClient.connect(this.url, function(err,db){
      if(db){
        db.collection(collectionName).save({"Processed" : fileToAdd});
        db.close();
      }
    });
  },

  find: function(fileToCheck){
    MongoClient.connect(this.url, function(err,db){
      if(db){
        foundFile = db.collection('JsonFiles').find(fileToCheck);
        db.close
      }
    })
  }
}


module.exports = ParserQuery; 