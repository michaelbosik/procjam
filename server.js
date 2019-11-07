const fs   = require( 'fs' ),
      mime = require( 'mime' ),
      express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      port = 3000,
      low = require('lowdb'),
      multer = require('multer'),
      FileSync = require('lowdb/adapters/FileSync'),
      db = low(new FileSync('db.json'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const upload = multer({dest: __dirname + '/uploads/images'});

db.defaults({ queue: [], users: [] }).write()

const sendFile = function( response, filename ) {
    const type = mime.getType( filename ) 
 
    fs.readFile( filename, function( err, content ) {
 
      if( err === null ) {
        response.writeHeader( 200, { 'Content-Type': type })
        response.end( content )
 
      }else{
        response.writeHeader( 404 )
        response.end( '404 Error: File Not Found' )
      }
    })
};

app.get("/", function (request, response) {
    sendFile( response, 'index.html' );
});

app.get("/main.js", function (request, response) {
    sendFile( response, 'scripts/main.js' );
});

app.get("/pixi.js", function (request, response) {
    sendFile( response, 'scripts/pixi.js' );
});

// app.get("/redplanet.png", function (request, response) {
//     sendFile( response, 'scripts/redplanet.png' );
// });

app.post("/upload", upload.single('photo'), function (req, res) {
    console.log("Uploaded file "+req.body.filename);
    if(req.file){
        console.log(req.file.filename);
        res.send({
            success:true
        });
    }else throw 'error in file recieving';
});

app.listen(process.env.PORT || port );