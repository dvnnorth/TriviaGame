function Person(fn, ln) {
	this.first_name = fn;
	this.last_name = ln;

	let displayName = (fn, ln) => {
        console.log(`Name: ${fn} ${ln}`);
    };
}

let person = new Person("John", "Reed");
person.displayName();
let person2 = new Person("Paul", "Adams");
person2.displayName(); 

