function foo () {
	'use strict';
	console.log(this === window); 
}

foo();