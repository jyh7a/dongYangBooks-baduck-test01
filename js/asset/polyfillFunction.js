// sucess polyfill
// fill, forEach, includes

// fill method
if (!Array.prototype.fill) {
 
  Object.defineProperty(Array.prototype, 'fill', {
    value: function (value) {

      // Steps 1-2.
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      var O = Object(this);

      // Steps 3-5.
      var len = O.length >>> 0;

      // Steps 6-7.
      var start = arguments[1];
      var relativeStart = start >> 0;

      // Step 8.
      var k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);

      // Steps 9-10.
      var end = arguments[2];
      var relativeEnd = end === undefined ?
        len : end >> 0;

      // Step 11.
      var final = relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0) :
        Math.min(relativeEnd, len);

      // Step 12.
      while (k < final) {
        O[k] = value;
        k++;
      }

      // Step 13.
      return O;
    }
  });
}

// forEach
if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

// forEach
// ECMA-262 5판, 15.4.4.18항의 작성 과정
// 참고: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback, thisArg) {

    var T, k;

    if (this === null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. O를 인수로서 |this| 값을 전달한
    // toObject() 호출의 결과이게 함.
    var O = Object(this);

    // 2. lenValue를 "length" 인수가 있는 O의 Get()
    // 내부 메소드 호출의 결과이게 함.
    // 3. len을 toUint32(lenValue)이게 함.
    var len = O.length >>> 0;

    // 4. isCallable(callback)이 false인 경우, TypeError 예외 발생.
    // 참조: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. thisArg가 공급됐다면, T를 thisArg이게 함;
    // 아니면 T를 undefined이게 함.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. k를 0이게 함
    k = 0;

    // 7. 반복, k < len일 동안
    while (k < len) {

      var kValue;

      // a. Pk를 ToString(k)이게 함.
      //    이는 in 연산자의 좌변(LHS) 피연산자에 대한 묵시(implicit)임
      // b. kPresent를 Pk 인수가 있는 O의 HasProperty
      //    내부 메소드 호출의 결과이게 함.
      //    이 과정은 c와 결합될 수 있음
      // c. kPresent가 true인 경우, 그러면
      if (k in O) {

        // i. kValue를 인수 Pk가 있는 O의 Get 내부
        // 메소드 호출의 결과이게 함.
        kValue = O[k];

        // ii. this 값으로 T 그리고 kValue, k 및 O을 포함하는
        // 인수 목록과 함께 callback의 call 내부 메소드 호출.
        callback.call(T, kValue, k, O);
      }
      // d. k를 1씩 증가.
      k++;
    }
    // 8. undefined 반환
  };
}


// includes
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        // c. Increase k by 1. 
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}