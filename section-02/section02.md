## Typescript Basics & Basic Types

### 목차

- [Using Types](#Using-Types)
- [TypeScript Types vs JavaScript Types](#TypeScript-타입-vs-JavaScript-타입)
- [Working with Numbers, Strings & Booleans](#숫자-문자열-및-불리언-작업하기)
- [Object Type](#객체-형태)
- [중첩된 객체 타입](#중첩된-객체-타입)
- [배열 타입](#배열-타입)
- [튜플 작업하기](#튜플-작업하기)
- [enum 열거형으로 작업하기](#enum-열거형으로-작업하기)
- [any 타입](#any-타입)
- [union 타입](#union-타입)

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

## 중첩된 객체 타입

물론 객체 타입은 중첩 객체에 대해서도 생성할 수 있다.
다음과 같은 자바스크립트 객체가 있다고 가정해보면,

```js
const product = {
  id: "abc1",
  price: 12.99,
  tags: ["great-offer", "hot-and-new"],
  details: {
    title: "Red Carpet",
    description: "A great carpet - almost brand-new!",
  },
};
```

이러한 객체의 타입은 아래와 같다.

```ts
{
  id: string;
  price: number;
  tags: string[];
  details: {
    title: string;
    description: string;
  }
}
```

따라서 객체 타입 안에 객체 타입이 있다고 말할 수 있다.

</br>

## 튜플 작업하기

- 튜플 타입은 자바스크립트에는 없는 타입스크립트의 타입이다.

```js
[1, 2];
```

- 위의 코드를 보면, 보통은 배열이라고 생각할 것이다. 물론 튜플은 배열이 맞다. 하지만 길이가 고정된 배열을 의미한다. 그리고 길이 뿐 아니라 타입도 고정된다.

```js
const person: {
  name: string,
  age: number,
  hobbies: string[],
  /*⚡️*/ role: [number, string] /*⚡️*/,
} = {
  name: "Maximilian",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  /*⚡️*/ role: [2, "author"] /*⚡️*/,
};
```

- `role`은 Tuple 타입이다. 그리고 person은 한 가지의 `role`만 가질 수 있고 `role`은 두개의 요소로만 구성되어 있기 때문에 항상 두 개의 요소만 지녀야만 한다.

</br>

## enum 열거형으로 작업하기

- `enum` 타입은 다른 프로그래밍 언어에도 존재하는 타입이지만 자바스크립트에서는 존재하지 않는 타입이다. 타입스크립트에만 존재하는 이 `enum` 키워드에 사용하는 `enum`을 생성하는 방법은 식별자들을 중괄호 쌍 안에 넣는 것이다. 열거형 타입은 열거 목록을 제공한다. 이 목록의 라벨들은 0부터 시작하는 숫자로 변환되며, 여기에는 코드 내에서 작업 가능한 (인간이 읽을 수 있는) 라벨로 표현 되어있다.

```js
const person = {
  name: "Maximilian",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role:,
};
```

- 위의 코드와 같은 객체 내부의 요소인 `role`에 'admin', 'read_only', 'author'를 추가하고자 한다. 각각의 `id`는 'admin'에서는 0으로 설정하고, 읽기 전용 'read_only'은 1, 그리고 'author'은 2로 설정한다.

```js
const person = {
  name: "Maximilian",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: 2, // author
};
```

- 그리고 위의 사례(숫자 2는 'author'의 `id`이다.)처럼 `id` 숫자로 정확하게 설정할 수 있을 것이다. 하지만 여기서 한 가지 단점이 있는데 바로 역할(`role`)이 없을 수도 있는 숫자를 추가할 수 있다는 가능성이다. 코드를 작성하면서 나중에서야 `role`을 추출하고 `if` 검사를 수행하면 에러가 발생할 수 있게 된다. 또한 개발자로서 이 사용자의 `role`이 무엇일지 바로 이해하기 어려울 가능성도 있다. 2가 'author' 인지 'admin' 인지를 언제나 외우고 있지는 않기 때문이다. 그렇기 때문에 차라리 인간이 읽을 수 있는 식별자로 구분하는 것이 훨씬 나을지도 모른다. 어쩌면 문자열 식별자를 사용해볼 수도 있을 것이다. 아래의 경우라면 어떨까?

```js
const person = {
  name: "Maximilian",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: "READ ONLY USER",
};

...

if (person.role === "READ-ONLY-USER") {
  console.log('is read only');
}
```

- 위의 코드의 문제는 "READ ONLY USER"처럼 그저 단어로만 이루어져 있는지, "READ-ONLY-USER" 처럼 밑줄이 쳐져있는지 등을 정확히 기억해서 확인을 해야 한다는 것에 있다. 이것을 출력했을 때 "READ ONLY USER"와 "READ-ONLY-USER"는 다르기 때문에 제대로 작동되지 않을 것이다. 문자열 식별자는 이러한 단점을 내포하고 있다. 이런 경우, 보통은 전역 상수를 정의해서 사용할 때도 있다. 예를 들어,

```js
const ADMIN = 0;
const READ_ONLY = 1;
const AUTHOR = 2;

const person = {
  name: "Maximilian",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: ADMIN,
};
```

- 이런 식으로 전역 상수를 정의해서 사용할 수 있도록 할 수도 있을 것이다. 물론 숫자를 사용해서 코드의 양과 메모리 점유를 낮출 수 있으니, 각각의 값에 숫자를 할당하고 `role`에 필요한 상수를 가져다 사용하는 방법은 어쩌면 우리에겐 꽤나 익숙한 방법일 것이다.

```js
const ADMIN = 0;
const READ_ONLY = 1;
const AUTHOR = 2;

const person = {
  name: "Maximilian",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: ADMIN,
};

if (person.role === ADMIN) {
  console.log("is admin");
}
```

- 하지만 이런 패턴에는 단점이 있다. 모든 상수를 정의하고 관리해야 한다는 것이다. 그리고 `enum`은 앞서 말한 패턴의 문제를 해결할 수 있는 타입이다.

```js
enum Role
```

- 먼저, `enum` 키워드로 `enum`을 생성하고, 키워드는 대문자로 시작하는 `Role`로 지정한다. `enum` 역시 사용자 지정 타입이기 때문에 이러한 방식을 따르는 것이다. 그리고 중괄호 쌍을 입력한 뒤,

```js
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}
```

- ADMIN, READ_ONLY, AUTHOR, 같은 값을 지정한다. 순서대로 각각 0, 1, 2 라는 숫자가 할당될 것이다.

```js
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person = {
  name: "Maximilian",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};
```

- 그리고 아래 `role` 에서 `Role.ADMIN`으로 접근하여 값을 지정한다.

```js
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person = {
  name: "Maximilian",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

...

if (person.role === Role.AUTHOR) {
  console.log("is author");
}
```

- `if` 문에서 `role`이 `AUTHOR` 인지 확인하고 참이면 콘솔에 문자열을 출력하도록 했다. 지금까지 이 모든 작업을 라벨을 숫자로 할당하게 해주는 `enum`으로 수행해보았다. 해당 코드를 컴파일한 자바스크립트를 살펴보면,

```js
var Role;
(function (Role) {
  Role[(Role["ADMIN"] = 0)] = "ADMIN";
  Role[(Role["READ_ONLY"] = 1)] = "READ_ONLY";
  Role[(Role["AUTHOR"] = 2)] = "AUTHOR";
})(Role || (Role = {}));
var person = {
  name: "Maximilian",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

...

if (person.role === Role.AUTHOR) {
  console.log("is author");
}
```

- 컴파일된 코드가 재현되고 있음을 알 수 있다. 숫자 값을 저장할 수 있는 해당 코드 블록에는 ADMIN, READ_ONLY, AUTHOR 속성 등이 포함되므로 다소 복잡하지만 타입스크립트에서는 아주 간단하게 수행이 가능하다.

```ts
enum Role {
  ADMIN = 5,
  READ_ONLY = 100,
  AUTHOR = 200,
}
```

- `enum`의 경우 기본 동작에만 국한되지 않는다. 특정 이유로 인해서 시작 숫자를 0으로 시작하지 못하는 경우, 식별자에 등호를 추가하여 다른 숫자를 입력할 수도 있다. 시작 값이 0이 아니라 5라면 이 시작 값 식별자 다음의 다른 식별자 값은 시작 값으로부터 증가시켜서 할당해줘야 한다. 이를테면 이전의 기본 동작이 0, 1, 2 였다면 5로 시작 값을 할당한 지금은 5, 6, 7이 되는 것이다. 물론 `enum`에는 숫자 뿐만 아니라 텍스트를 할당할 수도 있고, 혼합도 가능하다.

```ts
enum Role {
  ADMIN = "ADMIN",
  READ_ONLY = 1,
  AUTHOR = "200",
}
```

- 어떤 것이든 할당이 가능하고, 숫자가 증가하기 시작하는 기본 값(`ADMIN`)이 0이지만 동작을 다른 식으로 구성하기 위해선 문자열에 이어서 숫자를 입력할 수도 있고 다른 문자열을 입력해도 된다. 이렇게 `enum`으로 정의한 `Role`은 `role` 타입을 참조하거나, 사용자 정의 타입을 참조하거나, 생성한 사용자 정의 사용 가능하다는 장점이 있고 이것은 `enum`의 강점이라고 할 수 있다. 인간이 읽을 수 있고 백그라운드에 매핑된 값이 있는 식별자가 필요할 때 `enum`의 강점을 우리는 활용할 수 있다.

</br>

## any 타입

- `any` 타입은 타입스크립트에서 할당할 수 있는 가장 유연한 타입이다. 이 타입은 모든 종류의 값을 저장하고, 타입 배정도 딱히 필요하지 않다. 그리고 `any` 타입을 사용하더라도 타입스크립트에 아무런 문제가 되지 않는다.

### any 타입의 문제점

- `any`는 아주 유연하고 훌륭한 타입처럼 보이지만, 이것이 지닌 큰 단점 때문에 `any`를 가능한 쓰지 않아야 겠다고 생각하게 될 것이다. 왜냐하면 타입스크립트를 사용함으로써 가지게 되는 모든 장점을 `any`가 상쇄시켜 그저 바닐라 자바스크립트를 사용할 때와 다를 바가 없게 되기 때문이다. `any` 또는 `any` 변수가 어떤 값도 저장하지 않기 때문에 컴파일러가 검사할 부분이 없어진다. 따라서 `any`를 사용해야만 하는 몇 가지 이유가 있을 때에만 사용해야 한다. 이를 테면 어떠한 값이나 종류의 데이터가 어디에 저장될지 전혀 알 수 없는 경우를 대비하거나, 런타임 검사를 수행하는 경우 도중에 특정 값에 수행 하는 작업의 범위를 좁힐 때에만 말이다. 그외에는 `any` 타입을 가능한 사용하지 않는 게 좋다.

</br>

## union 타입

- 숫자와 문자열로 작업 가능한 유연한 조합의 함수를 포함하는 어플리케이션을 구축할 수 있도록 우리는 `union` 타입을 사용해보려고 한다.

```js
function combine(input1: number, input2: number) {
  const result = input1 + input2;
  return result;
}

const combinedAges = combine(30, 26);
console.log(combinedAges); // 56

const combinedNames = combine("Max", "Anna");

console.log(combinedNames); // error !!!!
```

- 위의 코드인 경우, 문제가 있다. 지금은 함수에서 받는 매개변수 모두 숫자 타입으로 설정되어 있기 때문에 숫자로 작업을 하는 경우 해당 함수를 호출할 수 있지만, 문자열로 작업을 하는 경우, 즉시 에러가 발생하기 때문이다. 물론, 매개 변수의 타입을 문자열로 변환할 수도 있지만 그렇게 되면 숫자로 작업을 할 수 없게 된다. 이럴 때 우리는 `union` 타입을 사용해서 문제를 해결할 수 있다.

```js
function combine(input1: number | string, input2: number | string) {
  const result = input1 + input2;

  return result;
}

const combinedAges = combine(30, 26);
console.log(combinedAges); // 56

const combinedNames = combine("Max", "Anna");
console.log(combinedNames); // MaxAnna
```

- 두 종류(숫자, 문자열)의 값을 사용해야 하는 어플리케이션에서 매개변수를 유연하게 받아오기 위해서는 `union` 타입을 사용하여 타입스크립트에세 숫자나 문자열 중 하나를 사용해도 괜찮다는 것을 알려야 한다. 이때 우리는 파이프 기호`|` 을 사용하여 다른 타입을 입력하면 된다. 이처럼 예시의 두 가지 이상의 타입이나 혹은 그 이상의 타입을 필요한 만큼 사용할 수 있게 된다. 하지만 더하기 연산자에서는 '문자열'이나 '숫자' 타입을 적용할 수 없다는 에러가 발생한다. 물론 더하기 연산자는 숫자와 문자열 모두 사용할 수 있으므로 문제가 없어야 하지만, 더하기 연산자를 사용할 수 없는 타입도 있을 것이라고 타입스크립트는 이해하고 있는 것이다. 이를 해결하기 위해서는 간단한 런타임 검사를 추가하여 매개변수가 숫자 타입일 때와 문자열 타입일 때를 각각 다르게 연산하여 반환할 수 있다.

```js
function combine(input1: number | string, input2: number | string) {
  let result;
  // 런타임 검사 추가
  if (typeof input1 === "number" && typeof input2 === "number") {
    // number type
    result = input1 + input2;
  } else {
    // string type
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 26);
console.log(combinedAges); // 56

const combinedNames = combine("Max", "Anna");
console.log(combinedNames); // MaxAnna
```

- 이제 두 문자열을 연결할 수 있기 때문에 더이상 에러가 발생하지 않는다.

### 정리

- 코드의 어느 위치에서든 함수 내에서 수행하는 작업과 관련하여 보다 유연하게 유니언 타입을 활용할 수 있다. (물론 추가적인 런타임 검사는 `union` 타입을 사용하여 작업할 때에 종종 필요한 부분이니 기억해두자.) 이처럼 `union` 타입을 사용하면 코드에 적용한 매개변수를 보다 유연하게 사용할 수 있다. 그런데 이를 사용했을 때 타입에 따라 함수 내에 다른 로직을 적용할 수 있으므로 함수가 여러 유형의 값으로 작동할 수 있게 된다. 물론 타입에 따라 조금씩 달라지므로 `union` 타입으로 작업할 때 위의 경우처럼 종종 런타임 검사가 필요한 경우도 있고, 프로그램에 따라 런타임 검사를 수행하지 않아도 `union` 타입을 사용할 수 있는 경우도 있다. 단지 구성하는 로직이 어떤 식이냐에 따라 달린 문제이다.

</br>
