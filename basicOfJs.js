/* console.log('Server file is runnig..');

let add = (a, b) => a+b;
let result = add(125, 5);
console.log(result);
 */
/* (function(){
  console.log('Kaleem is added');
})();
 */
/* function callBack(){
  console.log('kaleem is calling callback function..')
} */

const add = function(a, b, callBack){
  let res = a+b;
  console.log(res); // main function work complete.
  callBack();
}

//add(20, 80, callBack); // 1st way to represent callback fucntion.

/* add(10, 20, function(){ // 2nd way to rpresent callback function.
  console.log('Add completed'); 
}); */

add(2, 3, () => console.log('add completed')); // 3rd way to rpresent callback function.

const jsonString = '{"name": "john", "age": 30, "city": "New York"}';
const jsonObject = JSON.parse(jsonString);
console.log(jsonObject);
console.log(jsonObject.name);

const objectToConvert = {
  name: "Alice",
  age: 20
};

const json = JSON.stringify(objectToConvert); // convert object to JSON string
console.log(json);

console.log(typeof json);
