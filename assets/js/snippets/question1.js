function foo () {
	console.log(this === window); 
}

foo();
console.log(this === window);