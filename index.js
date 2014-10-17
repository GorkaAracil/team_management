var server = require("./app/server");
var router = require("./app/router");
var requestHandlers = require("./app/requestHandlers");
var mycar = require("./app/mycar");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/notfound"] = requestHandlers.notfound;
handle["/drive"] = requestHandlers.drive;

server.start(router.route, handle);

