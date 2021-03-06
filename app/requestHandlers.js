var querystring = require("querystring"),
	fs = require("fs"),
	formidable = require("formidable"),
	sys = require("sys");

function start(response) {
	console.log("Request handler 'start' was called.");
	var body = '<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" content="text/html; '+
	'charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<form action="/upload" enctype="multipart/form-data" '+
	'method="post">'+
	'<input type="file" name="upload" multiple="multiple" /><br />'+
	'filename: <input type="text" name="filename" /><br />'+
	'<input type="submit" value="Upload file" />'+
	'</form>'+
	'</body>'+
	'</html>';
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");
	
	var form = new formidable.IncomingForm();
	console.log("about to parse")

	form.parse(request, function(error, fields, files) {
		// Ver lo recibido
		console.log("parsing done " + sys.inspect({fields: fields, files: files}));
		//Para guardar el fichero con el nombre recibido.
		//var filenewpath = "./tmp/" + fields.filename
	
		filenewpath = "./tmp/test.png";
		// Fijado para que funcione el /show/


		// Rename file to ./tmp/test.png si existe borra el anterior y renombra.
		fs.rename(files.upload.path, filenewpath, function (error) {
			if (error) {
				fs.unlink(filenewpath);
				fs.rename(files.upload.path, filenewpath);
			}
		});
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}

function show(response) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200, {"Content-Type": "image/png"});
	fs.createReadStream("./tmp/test.png").pipe(response);
}


function notfound(response) {
	console.log("Request handler 'notfound' was called.");
	response.writeHead(404, {"Content-Type": "text/plain"});
	response.write("404 Not found");
	response.end();
}

function drive(response) {
	console.log("Request handler 'drive' was called.");
	myCar1 = makeCar("Seat");
	myCar2 = makeCar("Audi");
	myCar1.honk();
	myCar1.drive("left");
	myCar2.honk();
	myCar2.drive("right");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Honked and Driven:<br/>");
	response.end();
}

var makeCar = function(brand) {
	var newCar = {};
	newCar.honk = function() {
		console.log('honk honk ... ' + brand);
	};
	newCar.drive = function(direction) {
		console.log('vromm...... ' + brand + " - " + direction);
	};
	return newCar;
};



exports.start = start;
exports.upload = upload;
exports.notfound = notfound;
exports.show = show;
exports.drive = drive;
