function foo () {
	'use strict';
	console.log(this === window); 
}

let user = {
	count: 10,
	foo: foo,
	foo1: function() {
		console.log(this === window);
	}
}

user.foo();
let fun1 = user.foo1;
fun1();
user.foo1();