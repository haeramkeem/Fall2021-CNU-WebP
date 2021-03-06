# 11 - JS Functions
#opencse/웹프로그래밍

## Self-invoking
```
(function() {
    console.log("using anonymous function definition");
})();

(() => {
    console.log("using arrow function definition");
})();

(function ft() {
    console.log("using named function definition");
})();
```
* 위 세가지는 되지만
```
(const ft = function() {
    console.log("ft");
})();

(const ft = () => {
    console.log("fuckt");
})();
```
* 이렇게는 안된다는 것 - 이름을 가진 함수 정의하는 것은 Statement expression이지만 변수에 넣는 것은 Statement이기 때문인듯
- - - -
## Parameters
* js는 ::입력받은 인자의 갯수를 확인하지 않는다::
```
function print(a, b, c) {
    console.log(`${a} ${b} ${c}`);
}

print("aa", "bb", "cc");
print("ab", "cd");
```
	1. `aa bb cc`
	2. `ab cd undefined`
* 인자의 갯수보다 적으면 에러가 나는게 아니고 위처럼 해당 파라미터에 접근했을때 undefined가 나온다
```
function print() {
    console.log(arguments);
}

print("aa", "bb", "cc");
print("ab", "cd");
```
	1. `Arguments["aa", "bb", "cc"]`
	2. `Arguments["ab", "cd"]`
* 파라미터의 개수보다 많이 인자를 주면 위처럼 `arguments` 이라는 iterable 프로퍼티를 통해 접근할 수 있다(배열은 아닌듯)
- - - -
## Scope of Function
* JS에서 ::함수는 항상 **Default Global Object**로 선언::된다
* 그말인 즉슨 ::HTML페이지가 이놈의 Scope가 된다는 사실 - 다른 JS에 정의를 해도 같은 HTML에 링크되어있으면 사용할 수 있다::
* ::HTML에 종속되는 Default Global Object는 항상 **window**객체에 담기게 된다 - 그냥 func()하는 거랑 window.func()하는거랑 똑같다 이소리야::
* 따라서 ::JS의 모든 함수는 항상 어떤 객체의 메소드라고 생각::해야 된다
- - - -
## This
* ::함수 내에서 사용되는 **this**는 해당 함수를 _가지고 있는_ 객체를 말한다::
```
function printGlobalThis() {
    console.log(this);
}

printGlobalThis();
```
	1. `Window { ... }`
* 위의 예시에서 ::함수는 어느 객체 내에 선언된것이 아니므로 최상위인 **Window**에 포함된다::
```
function Person() {
    this.name = "abc";
}

Person.prototype.printThis = function() {
    console.log(this);
}

const p = new Person();
p.printThis();
```
	1. `Person { name: "abc", printThis: function }`
* 위의 예시에서는 ::함수가 객체 안에 선언되어 있으므로 해당 객체의 정보가 나오게 된다::
- - - -
## Call, Apply, Bind
* ::**.call()**, **.apply()**, **.bind()**모두 함수 내에서 사용되는 this를 직접 전달할 수 있게 해주는 메소드이다::
* 즉, ::함수들이 실행되는 상위객체(환경)을 지정::해주는 것이라 생각하면 됨
- - - -
### Call
```
function testMethod(arg1, arg2) {
    console.log(this.prop + arg1 + arg2);
}

const obj1 = { prop: 1 };
const obj2 = { prop: 2 };

testMethod.call(obj1, 3, 4);
testMethod.call(obj2, 3, 4);
```
	1. `8`
	2. `9`
* 저런식으로 ::함수 내에서 this로 사용될 객체를 넣어줌으로 해당 객체의 프로퍼티를 연산에 사용할 수 있게 함::
- - - -
### Apply
```
function testMethod(arg1, arg2) {
    console.log(this.prop + arg1 + arg2);
}

const obj1 = { prop: 1 };
const obj2 = { prop: 2 };

testMethod.apply(obj1, [3, 4]);
testMethod.apply(obj2, [3, 4]);
```
* ::Apply와 Call의 차이점은 인자를 개별적으로 주느냐 아니면 배열로 묶어서 주느냐의 차이::이다
- - - -
### Bind
```
function testMethod(arg1, arg2) {
    console.log(this.prop + arg1 + arg2);
}

const obj1 = { prop: 1 };
const obj2 = { prop: 2 };

testMethod.bind(obj1, 2)(3);
testMethod.bind(obj2, 3, 4)();
```
	1. `6`
	2. `9`
* _OCaml에서 함수 인자를 덜 전달해주면 그의 결과로 부분적으로 완성된 함수가 반환되었듯이_
* JS에서도 그와 비슷한 기능을 할 수 있음
* 일단 ::Bind의 첫번째 인자는 타겟 객체::이고
* ::그 다음부터 인자를 넘겨주면 되는데 넘겨준 인자만큼 앞에서부터 파라미터를 채워서 _함수로 반환_ 한다::
* `testMethod.bind(obj1, 2)(3);`의 예시에서는 `obj1`을 타겟 객체로 주고 `arg1`로 2로 주었으므로 다음과 같은 기능을 하는 함수가 반환된다고 생각하면 된다
```
function testMethod(arg2) {
	console.log(1 + 2 + arg2);
}
```
따라서 이 함수의 인자로 3을 주면 그 결과로 6이 나오게 되는 것
* `testMethod.bind(obj2, 3, 4)();`의 예시에서는 `obj2`을 타겟 객체로 주고 `arg1`로 3, `arg2`로 4를 주었으므로 다음과 동일한 기능을 하는 함수가 반환된다고 생각하면 된다
```
function testMethod() {
	console.log(2 + 3 + 4);
}
```
따라서 이 함수에 인자를 하나도 주지 않고 실행시켰을 때 9가 나오게 되는 것