var count = 5;
function test () {
	console.log(this.count === 5);
}

test();