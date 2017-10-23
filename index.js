// Stuff I havent really used in es6 that I should remember to use

// Can more easily use a var as an object key
/********************************************/
let candy = 'cremeEgg'
let cadbury = { [candy]: 'for sale now' }

// { cremeEgg: "for sale now" }
console.log("\n\n\n\n");

// Classes
/********************************************/
// Sugar on top of prototypes so you don't have to learn weird stuff

// Can extend classes and user super.method() to use that stuff

// Can use static methods which ARE LIKE
//  can only use them on the class not on the new'ed up object
//    its the SAME EXACT THING as doing Animal.eat = funcion () instead of Animal.prototype.eat = function()
class Animal {
  constructor () {
    this.breathes = "Yeah duh";
    this.howManyLegs = 2;
    this.planet = "earth";
  }

  addOneMoreLeg () {
    this.howManyLegs += 1;
  }

  static isThisAGoodExample () {
    return false;
  }
}

class Human extends Animal {
  iWantThreeLegs () {
    // call parent function
    super.addOneMoreLeg();
  }

  iWantToLiveOnJupiter () {
    // If `iWantToLiveOnJupiter` is called 
    //  you will get `Cannot read property 'call' of undefined`
     super.isThisAGoodExample();
  }
}

let alex = new Human();

console.log(alex); // 2 legs

alex.iWantThreeLegs();
console.log(alex); // 3 legs

// NOPE // alex.isThisAGoodExample();

// Internet says 'static functions are usually made for utility functions'
//  So like just read this https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

console.log("\n\n\n\n");


// `let` scope thing / `const` stuff
/********************************************/
// Is scoped to { }'s as well as functions

{
  
  function nested () {
    
  }
}
 // console.log(nested(), "\n\n");
//    nested is not defined

// another EXAMPLE

(() => {
  if(true) {
    let susanPlease = "HELLO SUSAN";
  }

  // console.log("susan??? ", susanPlease);
  // Uncaught ReferenceError: susanPlease is not defined
  //  this would work with `var` as its hoisted to function scope
  // not block scope`
})()


// Consts are not frozen objects

const youCanChangeThisItsOk = { areYouSure: ['yes', 'I', 'am'] }

youCanChangeThisItsOk.areYouSure.push(" ok then !")
youCanChangeThisItsOk.ohCrazy = "wow"

console.log('youCanChangeThisItsOk', youCanChangeThisItsOk);

console.log("\n\n\n\n");

// @@iterator ???
console.log('@@iterator')
/********************************************/
// @@iterator is called once during some itition (for of / forEach / whatever)

// Basically: 
//  You can make an object that abides by the `iterable protocol`

// This is pretty crazy 
//   https://ponyfoo.com/articles/es6-iterators-in-depth

/* 
   The first thing you’ll notice is that I’m making my object an 
   iterable by assigning to it’s mystical @@iterator property 
   through the Symbol.iterator property. I can’t use the symbol
   as a property name directly. Instead, I have to wrap in square
   brackets, meaning it’s a computed property name that evaluates 
   to the Symbol.iterator expression – as you might recall from 
   the article on object literals. The object returned by the 
   method assigned to the [Symbol.iterator] property must adhere 
   to the iterator protocol. The iterator protocol defines how 
   to get values out of an object, and we must return an 
   @@iterator that adheres to iterator protocol. 

   The protocol indicates we must have an object with a `next` 
   method. The `next` method takes no arguments and it should 
   return an object with these two properties.

   - `done` signals that the sequence has ended when true, and false means there may be more values
   - `value` is the current item in the sequence

*/

var someName = {
  [Symbol.iterator]: () => ({
    items: ['well', 'ok', 'then'],
    next: function next () {
      return {
        done: this.items.length === 0,
        value: this.items.shift()
      }
    }
  })
}

// You can use 'for of' to itterate over any object that 
//  abides by this above 'iterable' protocol.
// That includes arrays, objects, and user defined stuff ^
//  generators, DOM node's collected via `.querySelectorAll`
for(let item of someName) {
  console.log(item);
}

// Can also use spreak opperater and Array.from

console.log(...someName);

// Array.from:
// "creates a new Array instance from an array-like 
//    or iterable object"
console.log(Array.from(someName));

console.log("\n\n\n\n");

// Generators
console.log('Generators:');
/********************************************/

// Generator functions (which you declare) return generator
//  objects

// Generator objects can be iterated wirth the same ^ three things
//  iterator objects can be

// Generator functions are letting you declare a _special kind_
//  of iterator functions (caps for no reason)

// Fun bit: They can SUSPECT EXECUTION,
//   while retaining their CONTEXT

// You make a generator function by adding a *
//  after `function` 

// lol god damnit
// import like this so babel doesn't use require so we can use compiled
//  V in browser
import 'babel-polyfill/dist/polyfill';

function* someGenerator () {
  yield 'w'
  yield 't'
  yield 'f'
}


// Generators abide by both the iterable AND iterator protocol

let generatorObject = someGenerator()

// Is built using the generator function
typeof generatorObject[Symbol.iterator] === 'function'

// Has that 'next' method that iterator's have
typeof generatorObject.next === 'function'

// The iterator for the generator object is the generatorObject itself
generatorObject[Symbol.iterator]() === generatorObject

// and yeah
console.log([...generatorObject]);
console.log(Array.from(generatorObject));

// WHATS THIS `yield` ABOUT

// Whenver yield is hit, the value is emitted and the 
//   function execuition is SUSPENDED

function* anotherGenerator() {
  yield 'h'
  console.log('?');
  yield 'i'
  console.log('??');
  yield '!'
  console.log('???');
}

let generateStuffThx = anotherGenerator()
for(let thing of generateStuffThx) {
  console.log(thing);
}


function* yetAnotherGenerator() {
  yield 'h'
  console.log('?');
  yield 'i'
  console.log('??');
  yield '!'
  console.log('???');
}

let generateMoreStuff = yetAnotherGenerator();

console.log("hmm \n\n");
console.log([...generateMoreStuff]);
// ^ This only prints ["h", "i", "!"]
//  w/out console logs because we are constructing the range 
//  for the entire sequence

// You can use `yield*` anything that adheres to the iterator protocol
//  to deligate to another generator function.

function* generator () {
  yield* 'hi!' // gets turned into like yield 'h'; yield 'o'; yield '!'
}
console.log([...generator()]) // ["h", "e", "l", "l"]


function* generator () {
  yield 'only'
}
var g = generator()
console.log(g.next())
// <- { done: false, value: 'only' }
console.log(g.next())
// <- { done: true }
console.log(g.next())
// <- { done: true }


// They also have some more methods besdies

// * A yield expression returning the next value in the sequence
// * A return statement returning the last value in the sequence
// * A throw statement halts execution in the generator entirely
// Reaching the end of the generator function signals { done: true }


// You can send values.. INTO.. the generator :O
// Look at genie example 
//  https://ponyfoo.com/articles/es6-generators-in-depth

// async / await is based on generators principles. 
//  Pretty cool stuff


console.log("\n\n\n\n\n\n");

// Symbols | new primitive type (like strings or numbers or w/)
/********************************************/

// Note NO `new` 
let hmm = Symbol()

let whatAreYou = Symbol("it would help if I was described huh")
console.log('whatAreYou', whatAreYou);
console.log(typeof whatAreYou) // `symbol`


// Get back to tomorrow:
// https://ponyfoo.com/articles/es6-symbols-in-depth





