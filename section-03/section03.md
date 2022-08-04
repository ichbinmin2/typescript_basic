## The TypeScript Compiler (and its Configuration)

### 목차

- [Using "Watch Mode"](#Watch-Mode-이용하기)
- [Compiling the Entire Project / Multiple Files](#전체-프로젝트-컴파일과-다수의-파일)
- [Including & Excluding Files](#파일-포함-및-제외하기)
- [Setting a Compilation Target](#컴파일-대상-설정하기)
- [Understanding TypeScript Core Libs](#TypeScript-핵심-라이브러리-이해하기)
- [More Configuration & Compilation Options](#추가-구성-및-컴파일-옵션)
- [Working with Source Maps](#소스-맵-작업하기)
- [rootDir and outDir](#rootDir-및-outDir)

### Watch Mode 이용하기

- 변경사항이 있을 때마다 `tsc` 커맨드를 실행하는 것은 어쩐지 번거롭다. 변경사항을 자동으로 업데이트하고 컴파일 해주는 `watch mode`를 사용하면 훨씬 편리하다.

```js
tsc app.ts --watch
tsc app.ts -w
```

- 관찰(watch) 모드를 설정하면 컴파일 오류를 실시간으로 받아볼 수 있기 때문에 매번 컴파일 오류를 확인해줄 필요도 없다. 이처럼 관찰 모드는 생산성 향상을 위한 우수한 기능을 가지고 있다. 다만, 관찰 모드를 사용할 때는 해당 파일을 구체적으로 지정해야 한다는 단점이 있고, 이는 큰 규모의 프로젝트에는 적합하지 않을 것이다.

</br>

## 전체 프로젝트 컴파일과 다수의 파일

- 관찰(watch) 모드는 생산성을 높여주지만, 하나의 파일에만 국한 되어야 한다는 단점이 있었다. 타입스크립트 파일이 두개 이상이라면 사용할 수 없기 때문이다.

```js
tsc --init
```

- `tsc --init` 명령어를 사용하면 파일을 지정하지 않아도 관찰 모드로 전체 프로젝트 폴더를 확인하고 업데이트 사항이 적용될 수 있게 하며, 해당 프로젝트 폴더의 모든 타입스크립트 파일을 다시 컴파일할 수 있게 된다. 즉, 이 프로젝트 폴더가 타입스크립트로 관리해야 할 프로젝트라고 타입스크립트에게 알려주는 명령어라고 보면 된다. 해당 명령어가 실행되는 폴더의 모든 항목을 타입스크립트에 알려주는 역할을 하게 되며, 해당 프로젝트를 타입스크립트 프로젝트라고 타입스크립트에 처음에 알려주기 위해 단 한 번만 실행하면 된다. (따라서, 올바른 폴더 위치에 명령어를 사용하는 것이 중요하다.) 설치가 끝나면, 이제 해당 프로젝트는 타입스크립트가 관리하게 되며, `tsconfig.json` 파일 역시 생성된다.

> `tsconfig.json` 파일은 타입스크립트가 관리해야 하는 해당 파일이 포함된 프로젝트와 모든 폴더와 하위 폴더를 참고하기 위한 파일이다. 파일을 보면 많은 옵션을 설정할 수 있는 항목들이 있다. 한 번 확인해보자.

```js
tsc;
```

- 그런 후, 이제 `tsc` 명령어를 특정 파일을 지정하지 않고 한 번만 실행하면, 타입스크립트는 모든 타입스크립트 파일, 즉 해당 프로젝트의 모든 타입스크립트 파일을 컴파일 하게 된다. 그리고 `tsc` 명령어 실행이 끝나면 모든 타입스크립트 파일이 컴파일된 javascript 파일이 생성된다.

```js
tsc --watch
tsc -w
```

- 마지막으로 모든 파일을 관찰 모드로 결합할 수 있도록 `watch` 모드를 실행한다. 이 역시 앞에서 `tsc init`으로 모든 파일들을 타입스크립트로 관리해주기로 했으므로, 특정 파일을 지정하지 않아도 모든 파일에 관찰 모드를 사용할 수 있다. 이제 변경 사항을 적용하면 변경된 파일이 다시 자동으로 컴파일 되며, 자바스크립트 파일로 변경사항이 반영되는 걸 알 수 있다.

</br>

## 파일 포함 및 제외하기

- 여러 파일로 작업할 때 바닐라 자바스크립트의 모듈을 사용하여 파일을 가져올 수가 있다. 지금의 프로젝트를 살펴보면, `index.html`을 통해 두 파일을 한 꺼번에 가져오고 있다.

```html
<script src="app.js" defer></script>
<script src="analytics.js" defer></script>
```

- 앞으로 소개할 방식을 사용하여 이제 두 개의 파일을 프로젝트로서 관리할 수 있고 여러 파일도 컴파일 할 수 있게 된다. `tsconfig.json` 파일을 살펴보자.

### `tsconfig.json`

- `tsconfig.json` 파일은 프로젝트의 파일들을 어떻게 컴파일 해야 하는지 타입스크립트에게 알려주는 역할을 한다. 해당 파일의 `compilerOptions` 설정 다음에 우리가 설정할 수 있는 옵션에 대해서 알아보자.

### exclude

- 이 옵션들은 컴파일러나 컴파일 단계 동작에 영향을 미치지 않고 대신 컴파일러가 이 프로젝트에서 작동하는 방식을 의미한다.

```json
  "exclude": [
    "" // would be the default
  ]
```

- `exclude` 옵션을 설정해보자. 여기에 `exclude`을 추가하면 이는 문자열이 된다. 그리고 그 값으로 전체 프로젝트를 상대로 `tsc` 명령어를 실행할 때 컴파일 되서는 안되는 파일을 분석해서 컴파일을 막아준다. 예를 들어,

```json
  "exclude": [
    "analytics.ts" // would be the default
  ]
```

- `analytics.ts` 파일을 컴파일에서 제외(`exclude`)하고 싶다면 추가한다. 저장하고 `tsc` 명령어를 실행하면, `analytics.ts`만 제외하고 모든 타입스크립트 파일이 컴파일 된다.

```json
  "exclude": [
    "*.dev.ts" // would be the default
  ]
```

- 만약 와일드카드 문자인 별표(`*`)를 앞에 추가하면 타입스크립트는 `dev.ts`가 포함된 이름인 모든 파일을 무시하게 된다.

```json
  "exclude": [
    "**/*.dev.ts" // would be the default
  ]
```

- 만약 `**/*`를 앞에 추가하면 모든 폴더에서 이와 같은 패턴(`dev.ts`)의 모든 파일을 무시하게 된다.

```json
  "exclude": [
    "node_modules" // would be the default
  ]
```

- 실제로 자주 추가하는 옵션인 `node_modules` 폴더를 추가해서 컴파일에서 제외(`exclude`)시킨다.

> 📍 `node_modules` 폴더에는 `package.json`에 설치한 모든 종속성와 이 종속성들의 모든 종속성이 포함되어 있다. 즉, 변경하지 말아야 하는 타사 라이브러리를 가져오는 위치이다. 또한 종속성의 타사 라이브러리들 중 일부가 타입스크립트 코드를 제공하는 경우 당연히 컴파일 되는 것을 막아야 할 것이다. 컴파일을 하게 되면 연산 과정이 느려져서 최악의 경우에 프로젝트가 망가질 수도 있기 때문이다.

- 하지만, `exclude` 옵션을 아예 지정하지 않게 되면,

```json
//   "exclude": [
//     "node_modules" // would be the default
//   ]
```

- `node_modules`는 기본 설정상 자동으로 제외된다. 따라서 굳이 `node_modules`를 컴파일에서 제외시키기 위해 `exclude` 옵션을 추가할 필요는 없다. 즉, `exclude` 라는 컴파일 제외 옵션이 있긴 하지만, 제외하고자 하는 항목이 `node_modules`인 경우 `exclude` 설정을 추가할 필요는 전혀 없다는 의미이다.

### include

```json
  "include": [
    "app.ts"
  ]
```

- `include`는 `exclude`와 반대 개념의 작업을 수행한다. `include`는 컴파일 과정에 포함시킬 파일을 타입스크립트에 의도적으로 알려서 `include` 옵션에 포함되지 않은 그 어떤 파일이나 폴더도 컴파일되지 않도록 한다. 하지만 `include` 설정을 하면 컴파일하고자 하는 '모든' 항목을 포함시켜야 한다. `include` 설정을 했을 때 포함되지 않는 파일은 컴파일 되지 않기 때문에 주의해서 사용해야만 한다.

### files

```json
  "files": [
    "app.ts"
  ]
```

- `files` 설정은 `include`와 다소 비슷하지만 `include`는 제외하고자 하는 항목으로 전체 폴더를 지정할 수 있지만, `files` 설정은 컴파일 하고자 하는 '개발 파일'만을 지정할 수 있다. 해당 옵션은 규모가 작은 프로젝트에 사용하면 좋을 것이다.

### 정리

- 실제로는 많은 옵션 기능을 사용하지 않으므로, 기본 컴파일 기능이나 프로젝트 관리 옵션만 사용하게 될 것이다. 물론 컴파일러 자체와 컴파일 단계에서의 작동 방식에 대해 지정할 수 있는 방법은 다양하다.

</br>

## 컴파일 대상 설정하기

- 이제 컴파일러로 파일을 관리하는 방법을 알아보자. `tsconfig.json` 파일의 첫 번째 옵션인 `compilerOptions`를 살펴보면, 흥미로운 지점이 많다. `compilerOptions`은 타입스크립트 코드가 컴파일되는 방식을 관리하는 옵션이다. `compilerOptions` 에서는 어떤 파일을 컴파일할지, 그리고 컴파일되는 파일이 타입스크립트로 어떻게 처리되어야 하는지를 설정할 수 있다. 살펴보면, 기본적으로 설정된 옵션(주석 처리된)들이 많은 걸 알 수 있다. 각각의 옵션에는 주석처리와 함께 간단한 설명이 있는데, 대부분의 옵션들은 실무 프로젝트에서 그다지 중요하지 않을 가능성이 높으므로 모든 옵션을 설정하거나 고려할 필요는 없다.

### compilerOptions의 target 옵션

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */,
    "module": "commonjs"
  }
}
```

- `target` 옵션은 `compilerOptions` 에 기본적으로 설정되어 있다. 이 옵션으로는 어떤 자바스크립트 '버전'을 대상으로 코드를 컴파일할 것인지 타입스크립트에게 알려줄 수 있다. 타입스크립트는 자바스크립트 코드에 존재하지 않는 타입 주석과 같은 새로운 기능만 컴파일하는 것이 아니기 때문이다. 따라서 이 옵션은 특정 브라우저에서 실행되는 자바스크립트로 코드를 컴파일한다. `target`을 설정하면, 어떤 브라우저가 디컴파일된 코드를 지원하는지 정의할 것이다. 해당 프로젝트의 `target`의 기본 값은 `es5` 인데, 이는 모든 유형의 코드가 컴파일되었다는 의미다. `tsc` 명령어를 실행하여 모든 파일을 컴파일해보자.

**`app.ts`**

```ts
let age: number;
age = 30;

const userName = "Maximilian";
console.log(userName);
```

**`app.js`**

```js
"use strict";
var age;
age = 30;
var userName = "Maximilian";
console.log(userName);
```

- `app.ts`는 let과 const를 사용하고 있는데, `app.js`는 var를 이용하고 있는 걸 알 수 있다. 이는 `target` 옵션의 기본 값은 `es5`이고, `es5`에는 let과 const가 포함되어 있지 않기 때문에 일어난 일이다. 여기서 알 수 있는 좋은 점은 타입스크립트를 사용하여 이전 브라우저에서도 작동하는 코드를 생성할 수 있다는 점이다.

### 정리

- 물론 `target` 옵션을 사용하는 것은 전적으로 선택에 달려있다. 그리고 타입스크립트로 굳이 이런 작업을 수행하지 않아도 된다. 자바스크립트 변환을 지원하는 다른 빌드 도구들도 충분히 많기 때문이다. 혹은 어플리케이션이 최신 브라우저에서만 실행되어야 하기 때문에 최신 브라우저에서만 작동하는 코드로 구성해야 하는 경우도 있을 때라면 굳이 `target` 옵션을 이렇게 사용할 필요는 없을 것이다.
- 당연히, `target` 옵션에서 기본 값으로 선택하는 자바스크립트 버전이 최신일 수록 생성되는 코드는 더 간결해지며, 이는 타입스크립트가 점차 더 적은 양의 코드를 컴파일하며 존재하지 않는 기능에 대해 작업을 해야하는 경우가 줄어들기 때문일 것이다. 따라서 컴파일된 코드는 `target` 옵션 값이 최신 버전일 수록 더 간결하고 짧아진다.

  </br>

## TypeScript 핵심 라이브러리 이해하기

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es6"
    "module": "commonjs"
    // "lib": [],
    ...
  }
}
```

- `lib` 은 `dom`으로 작업을 수행하는 항목들, 즉 기본 객체/기능/타입스크립트 노드를 지정하게 해주는 옵션이다.

```html
<button>Click me</button>
```

- 먼저 `index.html`에 `<button>` 태그를 만들고 `app.ts`로 이동하여 아래와 같이 작성해준다.

```ts
const button = document.querySelector("button");

button.addEventListener();
```

- `button`에 `addEventListenr()`를 추가하면 에러가 발생하는데 `button`을 찾아낸 게 맞는지 여부를 타입스크립트가 확신하지 못하기 때문이다.

```ts
const button = document.querySelector("button")!;

button.addEventListener("click", () => {
  console.log("Clicked");
});
```

- 지금은 간단하게 라인의 끝에 느낌표를 붙여 에러를 해결해준다.
  > ✍🏻 느낌표는 기본적으로 button이 존재하고 있으니 값이 반환될 것라고 타입스크립트에 알려주는 역할을 한다.
- 그리고 `tsc` 명령어를 사용하면 컴파일이 수행된다. 타입스크립트는 왜 해당 `document`가 `unknown` 이라는 에러를 표시하지 않는 걸까? 이와 같은 `document`와 `const`, 변수 등이 존재한다는 것을 어떻게 타입스크립트는 아는 걸까? 설령 `document`를 사용할 수 있다 하더라도 `querySelector` 메소드가 있는 객체를 포함한다는 것, `button`이 `addEventListener`를 가지고 있다는 것은 또 어떻게 알고 있는 걸까? 타입스크립트는 어떻게 다 아는 걸까?

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es6"
    "module": "commonjs"
    // "lib": [],
    ...
  }
}
```

- 타입스크립트가 이 모든 것을 알고 작동시키는 이유는 바로 `lib` 옵션 때문이다..

### compilerOptions의 lib 옵션

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es6"
    "module": "commonjs"
    // "lib": [],
    ...
  }
}
```

- 보다시피 지금은 주석처리되어 있지만, 이런 경우에 일부 기본 설정이 적용된다. `lib` 설정이 되어있지 않으면 기본 설정은 자바스크립트의 `target`에 따라 달라진다. `es6`로 설정한 경우 기본적으로 `es6`에서 전역적으로 사용 가능한 모든 기능이 포함된다. 즉 자바스크립트에서 전역적으로 사용가능한 `es6`의 기능들을 타입스크립트에서도 사용가능하게 해준다는 뜻이다. 이는 또한 모든 `DOM` API도 사용 가능하게 만들어준다. 간단히 말해, `lib` 옵션이 설정되어 있지 않은 경우, 일부 기본 옵션이 적용되는데 이러한 기본 옵션은 타입스크립트가 브라우저에 작동하는 데 필요한 사항들이므로 `DOM` API 등이 포함되는 것이다.

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es6"
    "module": "commonjs"
    "lib": []
    ...
  }
}
```

- 주석 처리된 `lib`의 주석을 해제하고 다시 컴파일하면 에러가 발생한다. 주석 처리를 해제하면 기본 설정이 더이상 적용되지 않기 때문이다. 대신 `lib`으로 기본 라이브러리를 포함시켜야 한다. 즉 `lib` 배열에 사용할 몇 가지 기본 타입 정의들 말이다. (다시 주석처리를 하면, 타입스크립트가 기본 설정을 적용하여 작동한다.)

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es6"
    "module": "commonjs"
    "lib": [
      "DOM"
    ]
    ...
  }
}
```

- 따라서 적합한 값을 `lib`에 설정해두도록 한다. `DOM`은 타입스크립트가 이해할 수 있으며, 모든 `DOM` API를 타입스크립트에서 사용할 수 있게 해준다.

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es6"
    "module": "commonjs"
    "lib": [
      "DOM",
      "ES6",
      "DOM.Iterable",
      "ScriptHost"
    ]
    ...
  }
}
```

- 현재 `ES6` 세대의 자바스크립트로 작업을 하고 있으므로 전역적으로 사용 가능한 모든 `ES6` 옵션들을 타입스크립트가 이해할 수 있도록 `ES6`도 추가한다. `DOM.Iterable` 와 `ScriptHost` 도 추가하는 것이 좋다. 이 두가지를 추가하면 작업에 사용할 만한 자바스크립트의 핵심 기능을 모두 사용할 수 있게 된다. 그런데 이 네가지 옵션 값은 정확하게 `ES6`로 설정했을 때의 자동 기본 설정과 같다.

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es6"
    "module": "commonjs"
    // "lib": [
    //   "DOM",
    //   "ES6",
    //   "DOM.Iterable",
    //   "ScriptHost"
    // ]
    ...
  }
}
```

- 즉, 주석처리를 해도 이는 그냥 `ES6`의 기본값이 자동으로 설정되는 기본 설정과 동일하다는 의미이다.

</br>

## 추가 구성 및 컴파일 옵션

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es6"
    "module": "commonjs"
    "lib": [
      "DOM",
      "ES6",
      "DOM.Iterable",
      "ScriptHost"
    ]
    /* Specify library files to be included in the compilation. */,

    // "allowJs": true, /* Allow javascript files to be compiled. */
    // "checkJs": true,  /* Report errors in .js files. */
    ...
  }
}
```

- `allowJs` 역시 흥미로운 옵션이다. `allowJs`는 컴파일시에 `checkJS` 옵션과 함께 자바스크립트 파일에 포함시킬 수 있다. `allowJs` 옵션은 타입스크립트가 자바스크립트 파일을 컴파일할 수 있도록 해준다. `allowJs`를 사용하면, 파일이 `.ts`로 끝나지 않더라도 타입스크립트는 컴파일할 수 있다. `checkJS` 옵션은 타입스크립트가 컴파일을 수행하지 않더라도, 구문을 검사하고 잠재적 에러를 '보고'해주고, 타입스크립트를 사용하지 않고 일부 기능의 장점을 취하고자 할 때 유용하다. 타입스크립트는 자바스크립트에서 효과적으로 사용할 수 있는 `any` 타입만 허용하는데 이 옵션들(`checkJS`, `allowJs`)를 활성화하면 그와 같이 설정된다.

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es6"
    "module": "commonjs"
    "lib": [
      "DOM",
      "ES6",
      "DOM.Iterable",
      "ScriptHost"
    ]
    /* Specify library files to be included in the compilation. */,

    // "allowJs": true, /* Allow javascript files to be compiled. */
    // "checkJs": true,  /* Report errors in .js files. */
    ...
  }
}
```

- 타입스크립트를 전혀 사용하지 않는 프로젝트나 타입스크립트 파일과 바닐라 자바스크립트 파일을 함께 사용하면서 바닐라 자바스크립트 파일도 함께 검사하고 싶은 경우에 사용 가능하다.

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es6"
    "module": "commonjs"
    "lib": [
      "DOM",
      "ES6",
      "DOM.Iterable",
      "ScriptHost"
    ]
    /* Specify library files to be included in the compilation. */,

    // "allowJs": true, /* Allow javascript files to be compiled. */
    // "checkJs": true,  /* Report errors in .js files. */
    // "jsx": "preserve", /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true, /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true, /* Generates a sourcemap for each corresponding '.d.ts' file. */
    ...
  }
}
```

- 현재 프로젝트에서는 필요하지 않은 `declaration`와 `declarationMap`는 주석처리 해준다.`d.ts` 파일은 프로젝트를 라이브러리로 배포할 때 중요한 고급 개념이다. 프로젝트의 모든 타입을 설명하는 `manifest` 파일이 필요한데 그것이 바로 `.d.ts`이기 때문이다.

</br>

## 소스 맵 작업하기

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es6"
    "module": "commonjs"
    "lib": [
      "DOM",
      "ES6",
      "DOM.Iterable",
      "ScriptHost"
    ]
    /* Specify library files to be included in the compilation. */,

    // "allowJs": true, /* Allow javascript files to be compiled. */
    // "checkJs": true,  /* Report errors in .js files. */
    // "jsx": "preserve", /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true, /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true, /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true, /* Generates corresponding '.map' file. */
    ...
  }
}
```

- `sourceMap`는 디버깅 작업과 개발에 유용한 옵션이다. 만약 이 옵션을 사용하지 않고 `tsc`를 사용해서 모든 파일을 컴파일하고 브라우저의 데브 서버를 열어서 개발자 도구의 `Sources` 탭으로 이동해보자.

![스크린샷 2022-08-01 오전 7 34 23](https://user-images.githubusercontent.com/53133662/182047975-09e9060a-01ef-4fb4-b0ad-63b992c06eea.png)

- 소스맵 탭을 확인해보면 포함된 내용이 결국은 자바스크립트 코드라는 걸 알수 있다. 현재는 간단한 코드이지만 만약 복잡한 방식의 코드가 있어서 타입스크립트 코드와 디컴파일된 자바스크립트 코드를 디버깅 해야한다면 어떻게 해야할까? 자바스크립트 파일이 아닌 타입스크립트 파일이 있다면 좋을 것이다.

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es6"
    "module": "commonjs"
    "lib": [
      "DOM",
      "ES6",
      "DOM.Iterable",
      "ScriptHost"
    ]
    /* Specify library files to be included in the compilation. */,

    // "allowJs": true, /* Allow javascript files to be compiled. */
    // "checkJs": true,  /* Report errors in .js files. */
    // "jsx": "preserve", /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true, /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true, /* Generates a sourcemap for each corresponding '.d.ts' file. */
    "sourceMap": true, /* Generates corresponding '.map' file. */
    ...
  }
}
```

- `sourceMap` 옵션의 주석을 풀고, 값을 참true로 설정한 뒤 `tsc` 명령어로 전체 파일을 컴파일 해주면,

![image](https://user-images.githubusercontent.com/53133662/182049203-1d097dc6-2711-40be-ac45-6a969869d8af.png)

- 폴더 내부에 `js.map` 파일들이 생성된다. 파일들을 살펴보면, 이해할 수 없는 내용들이 들어있지만 기본적으로 이 파일은 입력 파일에 자바슼릡트 파일을 연결하는 최신 브라우저와 개발자 도구 간의 다리 역할을 한다는 걸 기억하자. 개발자 도구를 열고 소스탭으로 이동해보면,

![image](https://user-images.githubusercontent.com/53133662/182049175-30d6012c-b8a7-4a9b-a312-9d4a6ff5684d.png)

- 소스 탭에서 자바스크립트 파일 뿐만 아니라, 타입스크립트 파일도 볼 수 있다는 걸 알 수 있다. 타입스크립트에 중단점을 둘 수도 있기 때문에 이런 기능들은 디버깅 프로세스를 한 단계 향상시켜줄 것이다. 자바스크립트 파일 대신 기본적으로 타입스크립트 파일에서 직접 작업을 수행할 수 있기 때문이다. 물론 지금처럼 아주 간단한 프로젝트로 작업을 할 때에는 굳이 이 옵션을 추가할 필요는 없을 것이다. 다만 이 `sourceMap` 옵션의 기능은 디버깅을 단순화해주기 때문에 프로젝트를 진행할 때 아주 유용하다는 것을 잊지 말자.

</br>

## rootDir 및 outDir

- `dist` 폴더는 모든 출력값을 보관하는 작업을 수행한다. 모든 자바스크립트 파일과 `src` 폴더에 모든 타입스크립트 파일이 보관되므로 `dist`와 `src` 폴더를 셍성하고, 타입스크립트 파일을 전부 `src` 폴더로 옮긴다. 루트 위치에 있는 자바스크립트 폴더를 삭제하고 `tsc` 명령어를 사용해서 `.ts` 파일을 다시 컴파일한다. 타입스크립트 디컴파일러는 하위 폴더를 들여다보지만, 출력값은 입력파일 옆에 있기 때문에 이 입력 파일을 `outDir`로 제어할 수 있다.

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es6"
    "module": "commonjs"
    "lib": [
      "DOM",
      "ES6",
      "DOM.Iterable",
      "ScriptHost"
    ]
    /* Specify library files to be included in the compilation. */,

    ...
    // "outFile": "./", /* Concatenate and emit output to single file. */
    "outDir": "./dist", /* Redirect output structure to the directory. */
    // "rootDir": "./", /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    ...
  }
}
```

- 예를 들어, `outDir`를 설정하면, 생성된 파일이 저장되는 위치를 타입스크립트 컴파일러에 알릴 수 있다. 그리고 이를 `dist`로 설정할 수 있다. 이 작업을 수행한 후에 `tsc` 명령어를 실행하면 자바스크립트 파일이 `src` 폴더가 아닌, `dist` 폴더에 생성된다.

```html
<script src="app.js" defer></script>
<script src="analytics.js" defer></script>
```

- 이제 `index.html`로 이동하여 `app.js`를 `dist/app.js`로, `analytics.js`를 `dist/analytics.js`로 조정한다. `index.html` 파일을 `dist` 폴더로 이동시킨다. 이제 `dev` 서버가 제대로 작동하지 않을 것이다.

```html
<script src="dist/app.js" defer></script>
<script src="dist/analytics.js" defer></script>
```

- 이제 가져온 항목들을 조정해보자. 작업 중인 애플리케이션의 프로젝트 구조가 더 깔끔해졌다.

![image](https://user-images.githubusercontent.com/53133662/182844536-b348da44-fc03-4e48-b666-a19564718142.png)

- 만약 `analytics.ts` 파일을 동일한 이름의 폴더로 만들어서 그 안에 넣어두고 `tsc` 명령어를 실행한다고 해도, 이제 컴파일된 `js` 파일은 알아서 `dist` 폴더 안에서 생성될 것이다.

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es6"
    "module": "commonjs"
    "lib": [
      "DOM",
      "ES6",
      "DOM.Iterable",
      "ScriptHost"
    ]
    /* Specify library files to be included in the compilation. */,

    ...
    // "outFile": "./", /* Concatenate and emit output to single file. */
    "outDir": "./dist", /* Redirect output structure to the directory. */
    "rootDir": "./src", /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    ...
  }
}
```

- 이제 `rootDir` 를 설정하고 `src`와 같이 파일이 저장되는 폴더를 구체적으로 경로 설정하여, 타입스크립트 컴파일러가 폴더에서 보이지 않도록 한다. (이는 밑에 있는 `include` 옵션으로도 수행할 수 있는 작업이다.) `rootDir` 설정에서 타입스크립트 컴파일러는 `src` 폴더도 확인할 뿐만 아니라, 설정한 프로젝트 구조가 `dist` 폴더에서 유지되고 있는지도 확인한다. 이 옵션을 사용하지 않고 `outDir`를 설정하게 되면, 모든 파일에 `dist` 생성이 적용되므로 주의해야 한다.

- 따라서 `rootDir`와 `outDir`를 모두 사용할 때는 입력파일이 있는 위치와 출력 파일이 생성될 위치에 대해 정확하게 설정을 해야 할 것이다.

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es6"
    "module": "commonjs"
    "lib": [
      "DOM",
      "ES6",
      "DOM.Iterable",
      "ScriptHost"
    ]
    /* Specify library files to be included in the compilation. */,

    ...
    // "outFile": "./", /* Concatenate and emit output to single file. */
    "outDir": "./dist", /* Redirect output structure to the directory. */
    "rootDir": "./src", /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    ...
    "removeComments": true,
    ...
  }
}
```

- `removeComments` 에 대해서도 살펴보자. 이는 이름만으로도 기능이 짐작 가능하다. `removeComments` 옵션을 설정하면, 타입스크립트 파일의 모든 주석이 컴파일된 자바스크립트 파일에서 '제거' 된다! 이는 파일 크기를 줄이는데 좋은 옵션이 될 수 있다.

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es6"
    "module": "commonjs"
    "lib": [
      "DOM",
      "ES6",
      "DOM.Iterable",
      "ScriptHost"
    ]
    /* Specify library files to be included in the compilation. */,

    ...
    // "outFile": "./", /* Concatenate and emit output to single file. */
    "outDir": "./dist", /* Redirect output structure to the directory. */
    "rootDir": "./src", /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    ...
    "removeComments": true,
    // "noEmit": true,

    ...
  }
}
```

- `noEmit`은 어떨까? `noEmit`은 자바스크립트 파일을 생성하지 않을 때 설정하는 옵션이다. 타입스크립트 개념이라서 조금 이상하게 보이겠지만, 이 옵션은 파일이 정확한지 확인하고 싶지만 시간을 절약하기 위해 모든 출력 파일을 작성하고 싶지 않을 때 사용한다. 예를 들어, 규모가 큰 프로젝트에서는 이 값을 참(true)으로 설정하여 출력 파일을 가져오지 않고도 타입스크립트 컴파일러가 파일을 검사하고 잠재적 에러를 보고하도록 할 수 있다.

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es6"
    "module": "commonjs"
    "lib": [
      "DOM",
      "ES6",
      "DOM.Iterable",
      "ScriptHost"
    ]
    /* Specify library files to be included in the compilation. */,

    ...
    // "outFile": "./", /* Concatenate and emit output to single file. */
    "outDir": "./dist", /* Redirect output structure to the directory. */
    "rootDir": "./src", /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    ...
    "removeComments": true,
    // "noEmit": true,
    // "downlevelIteration": true,
    ...
  }
}
```

- `downlevelIteration` 옵션은 고급 기능이다. `for` 루프가 있고 생성된 코드가 해당 루프와 다르게 작동하는 경우에만 해당 옵션을 사용해야만 한다.

  </br>
