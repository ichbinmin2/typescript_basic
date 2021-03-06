## Typescript Basics & Basic Types

### 목차

- [Using Types](#Using-Types)
- [TypeScript Types vs JavaScript Types](#TypeScript-타입-vs-JavaScript-타입)
- [Working with Numbers, Strings & Booleans](#숫자-문자열-및-불리언-작업하기)
- [Object Type](#객체-형태)

### Using Types

#### number

- 숫자 타입

#### string

- 문자열 타입
- string 타입은 작은 따옴표(''), 큰 따옴표(""), 백틱(`) 과 같은 세 가지 방법 중에 하나로 정의할 수 있다.

> 백틱(`)을 사용하여 일부 데이터를 동적으로 주입할 수 있는 일반 문자열, 즉 텝플릿 리터럴을 작성할 수 있다.

#### boolean

- boolean 타입
- true/false 로 나뉘는 타입. 이는 프로그래밍 중에 특히 `if`문에서 작업할 때 아주 중요한 역할을 담당한다. true/false는 자바스크립트에서 참 같은 값(truthy)과 거짓 같은 값(falsy)의 `id`를 알 수 있기 때문에 중요하다. 예를 들어, `if`문에서 숫자 0을 사용하면 이는 거짓(false)으로 처리되어 거짓 값(falsy)이 된다.

#### 정리

- 타입스크립트는 컴파일 하는 동안에만 유용하다. 브라우저에는 내장 타입스크립트 지원이 없기 때문에 런타임에서 자바스크립트가 다른 식으로 작동하도록 변경하지 않는다. 타입스크립트 코드를 자바스크립트로 컴파일하기 전까지 개발 도중에만 유용하겠지만 이는 추가적인 단계와 온전성 검사를 추가하기 때문에 아주 유용하다. 추가 기능을 통해 실수가 있는 경우(문자열이어야 하는데 숫자형이어야 한다던가) 이를 바로 수정할 수 있다. 즉, 타입스크립트는 런타임 코드를 변경하지 않는다.

</br>

## TypeScript 타입 vs JavaScript 타입

```js
function add(n1: number, n2: number) {
  if (typeof n1 === "number" || typeof n2 === "number") {
    throw new Error("Incorrect Input");
  }
  return n1 + n2;
}

const number1 = "5";
const number2 = 2.6;

const result = add(number1, number2);
console.log(result);
```

- 여기서 타입과 관련하여 자바스크립트와 타입스크립트의 차이점을 확인할 수 있다. 자바스크립트는 동적 타입이다. 이는 나중에 문자열을 할당할 때 처음에 숫자형을 잡아둘 수 있는 변수가 있더라고 하더라도 전혀 문제가 될 게 없다는 의미이기도 하다. 그래서 특정 타입에 의존하는 코드가 있는 경우, 런타임에서 무언가의 현재의 타입을 확인할 수 있게 해주는 `typeof` 연산자를 사용하는 것이다. 반면 타입스크립트는 정적 타입으로 이는 변수와 매개변수의 타입을 개발 도중에 정의한다는 것을 의미한다. 즉 런타임 중에 갑자기 변경되거나 하지는 않는 것이다. 타입스크립트가 자바스크립트로 컴파일 되어 브라우저에서 구동되기 때문에 이론적으로는 가능할 것 같지만 타입스크립트를 사용하여 숫자 타입 변수를 작성한 뒤 갑자기 문자열을 새로 할당한다면 '개발 도중에' 에러가 발생하므로 어떤 타입을 보유해야하는지 여부를 보다 명확히 할 수 밖에 없을 것이다. 그리고 이것이 자바스크립트와 타입스크립트의 차이점이다. 따라서 타입스크립트를 사용해서 이러한 문제들을 방지할 수 있다면, 앞서 `typeof` 연산자를 사용하는 방식으로 해결할 필요는 없다. 그리고 런타임 검사는 타입스크립트로 수행하는 것보다 유연하거나 강력하지 않기 때문이다.

</br>

## 숫자 문자열 및 불리언 작업하기

```js
const number1 = 5;
const number2 = 5.0;
```

- 모든 숫자형은 기본적으로 float 실수형이다. 자바스크립트 및 타입스크립트에서의 `5`와 `5.0` 는 차이가 없는 것이다. 본질적으로 같은 숫자형이 된다.

```js
function add(n1: number, n2: number) {
  if (typeof n1 !== "number" || typeof n2 !== "number") {
    throw new Error("Incorrect input!");
  }

  return n1 + n2;
}

const number1 = 5;
const number2 = 2.8;

const result = add(number1, number2);
console.log(result); // 7.8
```

- 삼항연산자와 `if`문을 사용하는 것 대신, 동적으로 생성해서 참 또는 거짓 값을 가진 변수의 초기값으로 할당할 수도 있다.

```js
function add(n1: number, n2: number, showResult: boolean) {
  const result = n1 + n2;
  if (showResult) {
    console.log(result);
  } else {
    return result;
  }
}

const number1 = 5; // 5.0
const number2 = 2.8;
const printResult = true;

add(number1, number2, printResult); // 7.8
```

</br>

