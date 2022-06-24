var express = require('express');
var cors = require('cors');
require('dotenv').config();

const multer = require('multer');
const upload = multer().single('upfile')

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', (req, res) => {
	upload(req, res, (err) => {
		if (err instanceof multer.MulterError) {
			console.log('multer err >>>>', err);
		} else if (err) {
			console.log('unknown error >>>>', err);
		} else {
			console.log('req.file >>>>', req.file);
			console.log('req.body >>>>', req.body);
			const name = req.file.originalname,
				type = req.file.mimetype,
				size = req.file.size;
		}
	});
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
