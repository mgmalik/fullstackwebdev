x = 45;

console.log(x);

console.log(typeof x);

x = "string value";

console.log(typeof x);

const PI = 3.1416;

console.log(PI);

// PI = 3.14; not allowed because PI is defined as constant

function greeting(name) {
  name == undefined
    ? document.write("<h2>No name is given</h2>") // do not use it
    : document.writeln("<h2>Your name is " + name + " </h2>");
}

greeting();

greeting("Bader");
greeting("Bader", "ALi");

document.write("some text"); // do not use this function
document.write("some text");
document.write("some text");

document.writeln("some text");
document.writeln("some text");
document.writeln("some text");

array = [true, 25, "Saud", [1, 2, 3, 4], { name: "Abbas", job: "Lecturer" }];

console.log(array);

array.newprop = "some value";
console.log(array);

greeting.ver = 1;

console.log(greeting.ver);
