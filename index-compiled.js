'use strict';

var _console;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Stuff I havent really used in es6 that I should remember to use

// Can more easily use a var as an object key
/********************************************/
var candy = 'cremeEgg';
var cadbury = _defineProperty({}, candy, 'for sale now');

// { cremeEgg: "for sale now" }
console.log("\n\n\n\n");

// Classes
/********************************************/
// Sugar on top of prototypes so you don't have to learn weird stuff

// Can extend classes and user super.method() to use that stuff

// Can use static methods which ARE LIKE
//  can only use them on the class not on the new'ed up object
//    its the SAME EXACT THING as doing Animal.eat = funcion () instead of Animal.prototype.eat = function()

var Animal = function () {
  function Animal() {
    _classCallCheck(this, Animal);

    this.breathes = "Yeah duh";
    this.howManyLegs = 2;
    this.planet = "earth";
  }

  _createClass(Animal, [{
    key: 'addOneMoreLeg',
    value: function addOneMoreLeg() {
      this.howManyLegs += 1;
    }
  }], [{
    key: 'isThisAGoodExample',
    value: function isThisAGoodExample() {
      return false;
    }
  }]);

  return Animal;
}();

var Human = function (_Animal) {
  _inherits(Human, _Animal);

  function Human() {
    _classCallCheck(this, Human);

    return _possibleConstructorReturn(this, (Human.__proto__ || Object.getPrototypeOf(Human)).apply(this, arguments));
  }

  _createClass(Human, [{
    key: 'iWantThreeLegs',
    value: function iWantThreeLegs() {
      // call parent function
      _get(Human.prototype.__proto__ || Object.getPrototypeOf(Human.prototype), 'addOneMoreLeg', this).call(this);
    }
  }, {
    key: 'iWantToLiveOnJupiter',
    value: function iWantToLiveOnJupiter() {
      // If `iWantToLiveOnJupiter` is called 
      //  you will get `Cannot read property 'call' of undefined`
      _get(Human.prototype.__proto__ || Object.getPrototypeOf(Human.prototype), 'isThisAGoodExample', this).call(this);
    }
  }]);

  return Human;
}(Animal);

var alex = new Human();

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
  var nested = function nested() {};
}
// console.log(nested(), "\n\n");
//    nested is not defined

// another EXAMPLE

(function () {
  if (true) {
    var susanPlease = "HELLO SUSAN";
  }

  // console.log("susan??? ", susanPlease);
  // Uncaught ReferenceError: susanPlease is not defined
  //  this would work with `var` as its hoisted to function scope
  // not block scope`
})();

// Consts are not frozen objects

var youCanChangeThisItsOk = { areYouSure: ['yes', 'I', 'am'] };

youCanChangeThisItsOk.areYouSure.push(" ok then !");
youCanChangeThisItsOk.ohCrazy = "wow";

console.log('youCanChangeThisItsOk', youCanChangeThisItsOk);

console.log("\n\n\n\n");

// @@iterator ???
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

var someName = _defineProperty({}, Symbol.iterator, function () {
  return {
    items: ['well', 'ok', 'then'],
    next: function next() {
      return {
        done: this.items.length === 0,
        value: this.items.shift()
      };
    }
  };
});

// You can use 'for of' to itterate over any object that 
//  abides by this above 'iterable' protocol.
// That includes arrays, objects, and user defined stuff ^
//  generators, DOM node's collected via `.querySelectorAll`
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = someName[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var item = _step.value;

    console.log(item);
  }

  // Can also use spreak opperater and Array.from
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

(_console = console).log.apply(_console, _toConsumableArray(someName));

// Array.from:
// "creates a new Array instance from an array-like 
//    or iterable object"
console.log(Array.from(someName));

console.log("\n\n\n\n");

// Generators
/********************************************/

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLFFBQVEsVUFBWjtBQUNBLElBQUksOEJBQWEsS0FBYixFQUFxQixjQUFyQixDQUFKOztBQUVBO0FBQ0EsUUFBUSxHQUFSLENBQVksVUFBWjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztJQUNNLE07QUFDSixvQkFBZTtBQUFBOztBQUNiLFNBQUssUUFBTCxHQUFnQixVQUFoQjtBQUNBLFNBQUssV0FBTCxHQUFtQixDQUFuQjtBQUNBLFNBQUssTUFBTCxHQUFjLE9BQWQ7QUFDRDs7OztvQ0FFZ0I7QUFDZixXQUFLLFdBQUwsSUFBb0IsQ0FBcEI7QUFDRDs7O3lDQUU0QjtBQUMzQixhQUFPLEtBQVA7QUFDRDs7Ozs7O0lBR0csSzs7Ozs7Ozs7Ozs7cUNBQ2M7QUFDaEI7QUFDQTtBQUNEOzs7MkNBRXVCO0FBQ3RCO0FBQ0E7QUFDQztBQUNGOzs7O0VBVmlCLE07O0FBYXBCLElBQUksT0FBTyxJQUFJLEtBQUosRUFBWDs7QUFFQSxRQUFRLEdBQVIsQ0FBWSxJQUFaLEUsQ0FBbUI7O0FBRW5CLEtBQUssY0FBTDtBQUNBLFFBQVEsR0FBUixDQUFZLElBQVosRSxDQUFtQjs7QUFFbkI7O0FBRUE7QUFDQTs7QUFFQSxRQUFRLEdBQVIsQ0FBWSxVQUFaOztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUFBLE1BRVcsTUFGWCxHQUVFLFNBQVMsTUFBVCxHQUFtQixDQUVsQixDQUpIO0FBS0M7QUFDQTtBQUNEOztBQUVBOztBQUVBLENBQUMsWUFBTTtBQUNMLE1BQUcsSUFBSCxFQUFTO0FBQ1AsUUFBSSxjQUFjLGFBQWxCO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDRCxDQVREOztBQVlBOztBQUVBLElBQU0sd0JBQXdCLEVBQUUsWUFBWSxDQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWEsSUFBYixDQUFkLEVBQTlCOztBQUVBLHNCQUFzQixVQUF0QixDQUFpQyxJQUFqQyxDQUFzQyxZQUF0QztBQUNBLHNCQUFzQixPQUF0QixHQUFnQyxLQUFoQzs7QUFFQSxRQUFRLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxxQkFBckM7O0FBRUEsUUFBUSxHQUFSLENBQVksVUFBWjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLElBQUksK0JBQ0QsT0FBTyxRQUROLEVBQ2lCO0FBQUEsU0FBTztBQUN4QixXQUFPLENBQUMsTUFBRCxFQUFTLElBQVQsRUFBZSxNQUFmLENBRGlCO0FBRXhCLFVBQU0sU0FBUyxJQUFULEdBQWlCO0FBQ3JCLGFBQU87QUFDTCxjQUFNLEtBQUssS0FBTCxDQUFXLE1BQVgsS0FBc0IsQ0FEdkI7QUFFTCxlQUFPLEtBQUssS0FBTCxDQUFXLEtBQVg7QUFGRixPQUFQO0FBSUQ7QUFQdUIsR0FBUDtBQUFBLENBRGpCLENBQUo7O0FBWUE7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQUNBLHVCQUFnQixRQUFoQiw4SEFBMEI7QUFBQSxRQUFsQixJQUFrQjs7QUFDeEIsWUFBUSxHQUFSLENBQVksSUFBWjtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUEscUJBQVEsR0FBUixvQ0FBZSxRQUFmOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsR0FBUixDQUFZLE1BQU0sSUFBTixDQUFXLFFBQVgsQ0FBWjs7QUFFQSxRQUFRLEdBQVIsQ0FBWSxVQUFaOztBQUVBO0FBQ0EiLCJmaWxlIjoiaW5kZXgtY29tcGlsZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTdHVmZiBJIGhhdmVudCByZWFsbHkgdXNlZCBpbiBlczYgdGhhdCBJIHNob3VsZCByZW1lbWJlciB0byB1c2VcblxuLy8gQ2FuIG1vcmUgZWFzaWx5IHVzZSBhIHZhciBhcyBhbiBvYmplY3Qga2V5XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5sZXQgY2FuZHkgPSAnY3JlbWVFZ2cnXG5sZXQgY2FkYnVyeSA9IHsgW2NhbmR5XTogJ2ZvciBzYWxlIG5vdycgfVxuXG4vLyB7IGNyZW1lRWdnOiBcImZvciBzYWxlIG5vd1wiIH1cbmNvbnNvbGUubG9nKFwiXFxuXFxuXFxuXFxuXCIpO1xuXG4vLyBDbGFzc2VzXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vLyBTdWdhciBvbiB0b3Agb2YgcHJvdG90eXBlcyBzbyB5b3UgZG9uJ3QgaGF2ZSB0byBsZWFybiB3ZWlyZCBzdHVmZlxuXG4vLyBDYW4gZXh0ZW5kIGNsYXNzZXMgYW5kIHVzZXIgc3VwZXIubWV0aG9kKCkgdG8gdXNlIHRoYXQgc3R1ZmZcblxuLy8gQ2FuIHVzZSBzdGF0aWMgbWV0aG9kcyB3aGljaCBBUkUgTElLRVxuLy8gIGNhbiBvbmx5IHVzZSB0aGVtIG9uIHRoZSBjbGFzcyBub3Qgb24gdGhlIG5ldydlZCB1cCBvYmplY3Rcbi8vICAgIGl0cyB0aGUgU0FNRSBFWEFDVCBUSElORyBhcyBkb2luZyBBbmltYWwuZWF0ID0gZnVuY2lvbiAoKSBpbnN0ZWFkIG9mIEFuaW1hbC5wcm90b3R5cGUuZWF0ID0gZnVuY3Rpb24oKVxuY2xhc3MgQW5pbWFsIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuYnJlYXRoZXMgPSBcIlllYWggZHVoXCI7XG4gICAgdGhpcy5ob3dNYW55TGVncyA9IDI7XG4gICAgdGhpcy5wbGFuZXQgPSBcImVhcnRoXCI7XG4gIH1cblxuICBhZGRPbmVNb3JlTGVnICgpIHtcbiAgICB0aGlzLmhvd01hbnlMZWdzICs9IDE7XG4gIH1cblxuICBzdGF0aWMgaXNUaGlzQUdvb2RFeGFtcGxlICgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuY2xhc3MgSHVtYW4gZXh0ZW5kcyBBbmltYWwge1xuICBpV2FudFRocmVlTGVncyAoKSB7XG4gICAgLy8gY2FsbCBwYXJlbnQgZnVuY3Rpb25cbiAgICBzdXBlci5hZGRPbmVNb3JlTGVnKCk7XG4gIH1cblxuICBpV2FudFRvTGl2ZU9uSnVwaXRlciAoKSB7XG4gICAgLy8gSWYgYGlXYW50VG9MaXZlT25KdXBpdGVyYCBpcyBjYWxsZWQgXG4gICAgLy8gIHlvdSB3aWxsIGdldCBgQ2Fubm90IHJlYWQgcHJvcGVydHkgJ2NhbGwnIG9mIHVuZGVmaW5lZGBcbiAgICAgc3VwZXIuaXNUaGlzQUdvb2RFeGFtcGxlKCk7XG4gIH1cbn1cblxubGV0IGFsZXggPSBuZXcgSHVtYW4oKTtcblxuY29uc29sZS5sb2coYWxleCk7IC8vIDIgbGVnc1xuXG5hbGV4LmlXYW50VGhyZWVMZWdzKCk7XG5jb25zb2xlLmxvZyhhbGV4KTsgLy8gMyBsZWdzXG5cbi8vIE5PUEUgLy8gYWxleC5pc1RoaXNBR29vZEV4YW1wbGUoKTtcblxuLy8gSW50ZXJuZXQgc2F5cyAnc3RhdGljIGZ1bmN0aW9ucyBhcmUgdXN1YWxseSBtYWRlIGZvciB1dGlsaXR5IGZ1bmN0aW9ucydcbi8vICBTbyBsaWtlIGp1c3QgcmVhZCB0aGlzIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0NsYXNzZXNcblxuY29uc29sZS5sb2coXCJcXG5cXG5cXG5cXG5cIik7XG5cblxuLy8gYGxldGAgc2NvcGUgdGhpbmcgLyBgY29uc3RgIHN0dWZmXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vLyBJcyBzY29wZWQgdG8geyB9J3MgYXMgd2VsbCBhcyBmdW5jdGlvbnNcblxue1xuICBcbiAgZnVuY3Rpb24gbmVzdGVkICgpIHtcbiAgICBcbiAgfVxufVxuIC8vIGNvbnNvbGUubG9nKG5lc3RlZCgpLCBcIlxcblxcblwiKTtcbi8vICAgIG5lc3RlZCBpcyBub3QgZGVmaW5lZFxuXG4vLyBhbm90aGVyIEVYQU1QTEVcblxuKCgpID0+IHtcbiAgaWYodHJ1ZSkge1xuICAgIGxldCBzdXNhblBsZWFzZSA9IFwiSEVMTE8gU1VTQU5cIjtcbiAgfVxuXG4gIC8vIGNvbnNvbGUubG9nKFwic3VzYW4/Pz8gXCIsIHN1c2FuUGxlYXNlKTtcbiAgLy8gVW5jYXVnaHQgUmVmZXJlbmNlRXJyb3I6IHN1c2FuUGxlYXNlIGlzIG5vdCBkZWZpbmVkXG4gIC8vICB0aGlzIHdvdWxkIHdvcmsgd2l0aCBgdmFyYCBhcyBpdHMgaG9pc3RlZCB0byBmdW5jdGlvbiBzY29wZVxuICAvLyBub3QgYmxvY2sgc2NvcGVgXG59KSgpXG5cblxuLy8gQ29uc3RzIGFyZSBub3QgZnJvemVuIG9iamVjdHNcblxuY29uc3QgeW91Q2FuQ2hhbmdlVGhpc0l0c09rID0geyBhcmVZb3VTdXJlOiBbJ3llcycsICdJJywgJ2FtJ10gfVxuXG55b3VDYW5DaGFuZ2VUaGlzSXRzT2suYXJlWW91U3VyZS5wdXNoKFwiIG9rIHRoZW4gIVwiKVxueW91Q2FuQ2hhbmdlVGhpc0l0c09rLm9oQ3JhenkgPSBcIndvd1wiXG5cbmNvbnNvbGUubG9nKCd5b3VDYW5DaGFuZ2VUaGlzSXRzT2snLCB5b3VDYW5DaGFuZ2VUaGlzSXRzT2spO1xuXG5jb25zb2xlLmxvZyhcIlxcblxcblxcblxcblwiKTtcblxuLy8gQEBpdGVyYXRvciA/Pz9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8vIEBAaXRlcmF0b3IgaXMgY2FsbGVkIG9uY2UgZHVyaW5nIHNvbWUgaXRpdGlvbiAoZm9yIG9mIC8gZm9yRWFjaCAvIHdoYXRldmVyKVxuXG4vLyBCYXNpY2FsbHk6IFxuLy8gIFlvdSBjYW4gbWFrZSBhbiBvYmplY3QgdGhhdCBhYmlkZXMgYnkgdGhlIGBpdGVyYWJsZSBwcm90b2NvbGBcblxuLy8gVGhpcyBpcyBwcmV0dHkgY3JhenkgXG4vLyAgIGh0dHBzOi8vcG9ueWZvby5jb20vYXJ0aWNsZXMvZXM2LWl0ZXJhdG9ycy1pbi1kZXB0aFxuXG4vKiBcbiAgIFRoZSBmaXJzdCB0aGluZyB5b3XigJlsbCBub3RpY2UgaXMgdGhhdCBJ4oCZbSBtYWtpbmcgbXkgb2JqZWN0IGFuIFxuICAgaXRlcmFibGUgYnkgYXNzaWduaW5nIHRvIGl04oCZcyBteXN0aWNhbCBAQGl0ZXJhdG9yIHByb3BlcnR5IFxuICAgdGhyb3VnaCB0aGUgU3ltYm9sLml0ZXJhdG9yIHByb3BlcnR5LiBJIGNhbuKAmXQgdXNlIHRoZSBzeW1ib2xcbiAgIGFzIGEgcHJvcGVydHkgbmFtZSBkaXJlY3RseS4gSW5zdGVhZCwgSSBoYXZlIHRvIHdyYXAgaW4gc3F1YXJlXG4gICBicmFja2V0cywgbWVhbmluZyBpdOKAmXMgYSBjb21wdXRlZCBwcm9wZXJ0eSBuYW1lIHRoYXQgZXZhbHVhdGVzIFxuICAgdG8gdGhlIFN5bWJvbC5pdGVyYXRvciBleHByZXNzaW9uIOKAkyBhcyB5b3UgbWlnaHQgcmVjYWxsIGZyb20gXG4gICB0aGUgYXJ0aWNsZSBvbiBvYmplY3QgbGl0ZXJhbHMuIFRoZSBvYmplY3QgcmV0dXJuZWQgYnkgdGhlIFxuICAgbWV0aG9kIGFzc2lnbmVkIHRvIHRoZSBbU3ltYm9sLml0ZXJhdG9yXSBwcm9wZXJ0eSBtdXN0IGFkaGVyZSBcbiAgIHRvIHRoZSBpdGVyYXRvciBwcm90b2NvbC4gVGhlIGl0ZXJhdG9yIHByb3RvY29sIGRlZmluZXMgaG93IFxuICAgdG8gZ2V0IHZhbHVlcyBvdXQgb2YgYW4gb2JqZWN0LCBhbmQgd2UgbXVzdCByZXR1cm4gYW4gXG4gICBAQGl0ZXJhdG9yIHRoYXQgYWRoZXJlcyB0byBpdGVyYXRvciBwcm90b2NvbC4gXG5cbiAgIFRoZSBwcm90b2NvbCBpbmRpY2F0ZXMgd2UgbXVzdCBoYXZlIGFuIG9iamVjdCB3aXRoIGEgYG5leHRgIFxuICAgbWV0aG9kLiBUaGUgYG5leHRgIG1ldGhvZCB0YWtlcyBubyBhcmd1bWVudHMgYW5kIGl0IHNob3VsZCBcbiAgIHJldHVybiBhbiBvYmplY3Qgd2l0aCB0aGVzZSB0d28gcHJvcGVydGllcy5cblxuICAgLSBgZG9uZWAgc2lnbmFscyB0aGF0IHRoZSBzZXF1ZW5jZSBoYXMgZW5kZWQgd2hlbiB0cnVlLCBhbmQgZmFsc2UgbWVhbnMgdGhlcmUgbWF5IGJlIG1vcmUgdmFsdWVzXG4gICAtIGB2YWx1ZWAgaXMgdGhlIGN1cnJlbnQgaXRlbSBpbiB0aGUgc2VxdWVuY2VcblxuKi9cblxudmFyIHNvbWVOYW1lID0ge1xuICBbU3ltYm9sLml0ZXJhdG9yXTogKCkgPT4gKHtcbiAgICBpdGVtczogWyd3ZWxsJywgJ29rJywgJ3RoZW4nXSxcbiAgICBuZXh0OiBmdW5jdGlvbiBuZXh0ICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRvbmU6IHRoaXMuaXRlbXMubGVuZ3RoID09PSAwLFxuICAgICAgICB2YWx1ZTogdGhpcy5pdGVtcy5zaGlmdCgpXG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuXG4vLyBZb3UgY2FuIHVzZSAnZm9yIG9mJyB0byBpdHRlcmF0ZSBvdmVyIGFueSBvYmplY3QgdGhhdCBcbi8vICBhYmlkZXMgYnkgdGhpcyBhYm92ZSAnaXRlcmFibGUnIHByb3RvY29sLlxuLy8gVGhhdCBpbmNsdWRlcyBhcnJheXMsIG9iamVjdHMsIGFuZCB1c2VyIGRlZmluZWQgc3R1ZmYgXlxuLy8gIGdlbmVyYXRvcnMsIERPTSBub2RlJ3MgY29sbGVjdGVkIHZpYSBgLnF1ZXJ5U2VsZWN0b3JBbGxgXG5mb3IobGV0IGl0ZW0gb2Ygc29tZU5hbWUpIHtcbiAgY29uc29sZS5sb2coaXRlbSk7XG59XG5cbi8vIENhbiBhbHNvIHVzZSBzcHJlYWsgb3BwZXJhdGVyIGFuZCBBcnJheS5mcm9tXG5cbmNvbnNvbGUubG9nKC4uLnNvbWVOYW1lKTtcblxuLy8gQXJyYXkuZnJvbTpcbi8vIFwiY3JlYXRlcyBhIG5ldyBBcnJheSBpbnN0YW5jZSBmcm9tIGFuIGFycmF5LWxpa2UgXG4vLyAgICBvciBpdGVyYWJsZSBvYmplY3RcIlxuY29uc29sZS5sb2coQXJyYXkuZnJvbShzb21lTmFtZSkpO1xuXG5jb25zb2xlLmxvZyhcIlxcblxcblxcblxcblwiKTtcblxuLy8gR2VuZXJhdG9yc1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cbiJdfQ==