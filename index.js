var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

const multer = require('multer');

// prepare multer middleware
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// the API
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    res.json({
      error: "No file uploaded"
    });
  }
  else {
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  }
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
