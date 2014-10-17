var server = require("./app/server");
var router = require("./app/router");
var requestHandlers = require("./app/requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/notfound"] = requestHandlers.notfound;

server.start(router.route, handle);

