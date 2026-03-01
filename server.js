/* let fs = require('fs');
let os = require('os');


let user = os.userInfo();
console.log(user);
console.log(user.username);

fs.appendFile('greeting.txt', 'Hi ' + user.username + '!\n', () => {
  console.log('file is created');
});

console.log(os);

console.log(fs); */

// import notes.js file.

const notes = require('./notes.js');
let _ = require('lodash');

let age = notes.age;

let res = notes.addNumber(age+20, 10);

console.log(age);

console.log('result is now '+ res );

let data = ["person", "person", 1, 2, 1, 2, 'name', 'age', '2'];
let filter = _.uniq(data);
console.log(filter);

console.log(_.isString('kaleem'));

console.log(_.isString(true));