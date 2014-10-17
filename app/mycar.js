function honk() {
	console.log('honk honk');
	return "honki";
};

function drive() {
	console.log('vroom, vroom');
};

exports.honk = honk;
exports.drive = drive;

