var ParserQuery = require('./parserQuery');
var fs = require('fs');
var mv = require('mv');
var parseString = require('xml2js').parseString;

var Extractor = function(){
  this.query = new ParserQuery()
}

Extractor.prototype = {

  processDirectory: function(){
    var self = this;   
    var directoy = '/users/jodiegarden/documents/xmlparser/directoy/';
    fs.readdir(directoy,function(err,files){
      if(err){
        console.log("cant find directory")

      } else{
        console.log("reading files")
        var filesRead = 0;
        files.forEach(function(file){
          fs.readFile(directoy + file, 'UTF-8', function(err,data){
            if (file === {}){console.log('none founf')} else{
              if (err){
                console.log("error:", err);

              }else {
                console.log("Converting:" + file);
                var id = " " + file;

                var converXmlToJson = function(xml){
                  var jsonObject = null;

                  parseString(xml, function(err,result){
                    if(err){
                      console.log("Error:", err)

                    }else{
                      var jsonData = result;
                      console.log(jsonData)
                    }
                    jsonObject = jsonData;
                  })
                  return jsonObject;
                }
                var convertedXmlFile = converXmlToJson(data);
                console.log(convertedXmlFile);
                var jString = JSON.stringify(convertedXmlFile);
                var replacedString = jString.replace(/\$/g, "OPEN")
                console.log(replacedString);
                var jParsed = JSON.parse(replacedString);

                var returnedDebitItem = jParsed.BACSDocument.Data[0].ARUDD[0].Advice[0].OriginatingAccountRecords[0].OriginatingAccountRecord[0].ReturnedDebitItem;

                var JsonObject = JSON.parse(replacedString);
                console.log(JsonObj);
                console.log("Added")
                self.query.add(JsonObj, id, "Json");
                self.query.add(returnedDebitItem, id, "ReturnedDebitItem");
                filesRead += 1;

                mv(directoy + file, '/users/jodiegarden/documents/xmlparser/directoy/save' + file,{mkdirp: true}, function(err){
                  if(err){
                    console.log("error", err);
                  }
                  else{
                    console.log("File has been saved")
                  }
                })

                if(filesRead === files.length()){
                  console.log(filesRead);
                }

              }
            }
          })
        })
      }
    })
  }
}


      module.exports = Extractor;


