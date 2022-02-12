// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API from freecodecamp'});
});


app.get("/api/", function (req, res) {
  res.json({'unix': Date.now(), 'utc': Date()});
});




app.get("/api/:date", (req, res) => {
  let dateString = req.params.date;
  if(dateString.includes(" ")){
    res.json({'unix': new Date(dateString).getTime()})
  }

  if (!isNaN(Date.parse(dateString))) {
    let dateObject = new Date(dateString);
    res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
  } else if (/\d{5,}/.test(dateString)) {
      let dateInt = parseInt(dateString);
      res.json({ unix:+" "+ dateInt, utc: new Date(dateInt).toUTCString() });
  } else {
    res.json({ error: "Invalid Date" });
  }

});

// listen for requests :)
app.listen(3500,()=>{
  console.log("APP is listeng on port 3500")
})
