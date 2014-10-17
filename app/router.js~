function route(handle, pathname, response) {
	console.log("About to route a request for " + pathname);

	if (typeof handle[pathname] === 'function') {
		console.log("Routing for " + pathname);
		handle[pathname](response);
	} else {
		console.log("No handler found for " + pathname + ". Routing to notfound");
		handle["/notfound"](response);	
	}
}


exports.route = route;

