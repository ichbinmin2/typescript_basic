## Class & Interface

### 목차

- [클래스란 무엇인가](#클래스란-무엇인가)
- [퍼스트 클래스 만들기](#퍼스트-클래스-만들기)
- [자바스크립트로 컴파일하기](#자바스크립트로-컴파일하기)
- [생성자 함수 및 "this" 키워드](#생성자-함수-및-this-키워드)
- [개인 및 "공용" 액세스 수정자](#개인-및-공용-액세스-수정자)
- [약식 초기화](#약식-초기화)
- ["읽기전용" 속성](#읽기전용-속성)
- [상속](#상속)
- [속성 및 "보호된" 수정자 재정의](#속성-및-보호된-수정자-재정의)
- [게터 & 세터](#게터-&-세터)
- [정적 메서드 & 속성](#정적-메서드-&-속성)
- [추상 클래스](#추상-클래스)
- [싱글톤 & 개인 생성자](#싱글톤-&-개인-생성자)
- [첫 번째 인터페이스](#첫-번째-인터페이스)
- [클래스와 인터페이스 사용하기](#클래스와-인터페이스-사용하기)
- [왜 인터페이스인가](#왜-인터페이스인가)
- [읽기 전용 인터페이스 속성](#읽기-전용-인터페이스-속성)
- [인터페이스 확장하기](#인터페이스-확장하기)
- [선택적 매개변수 & 속성](#선택적-매개변수-&-속성)
- [자바스크립트로 인터페이스 컴파일](#자바스크립트로-인터페이스-컴파일)

### 클래스란 무엇인가

- 객체지향 프로그래밍과 클래스의 개념은 코드에서 실제 개체(entity)로 작업한다는 점에서 중요하다.

#### 클래스와 인스턴스의 개념

- 객체지향방법으로 객체를 구성하면서 앱이나 어플리케이션 로직을 로직의 일불르 관리하는 객체로 분할할 수도 있다. 자바스크립트에 있는 이러한 객체들을 사용하는 개념과 결합하여, 객체를 사용할 수 있다. 그것이 바로 클래스를 사용하는 개념이다.

- 객체(object)는 코드로 작업을 수행하면서 사용할 수 있는 구체적인 요소들, 데이터를 저장하고 메소드를 실행하기 위해 메소드를 저장하는데 사용하는 데이터 구조라고 말할 수 있다. 그리고 클래스(classes)는 객체의 청사진이다. 이 클래스를 사용하여 객체의 형태, 포함해야 하는 데이터, 클래스를 기반으로 쉽게 만들 수 있으려면 어떤 메소드가 필요한지 정의할 수 있기 때문에 아룰 클래스 내의 '인스턴스' 라고 부른다. 따라서 객체는 클래스 내의 인스턴스라고 말할 수가 있다.

- 이러한 클래스를 기반으로 하면 동일한 구조, 동일한 클래스를 기반으로 하는 동일한 메소드로 여러 객체를 빠르게 복제할 수 있다. 이처럼 클래스(classes)는 객체의 형태, 포함해야 할 속성과 메소드를 정의하는 데 도움이 된다. 그리고 클래스를 사용하면 동일한 구조와 메소드를 포함한 여러 객체를 쉽게 만들 수 있다. 물론 객체에 저장된 정확한 데이터 세부 정보만 다를 뿐이다.

</br>

### 왜 인터페이스인가

- 우리는 왜 인터페이스 기능을 사용할까? 아래의 예시를 통해 알아보자.

```ts
interface Greetable {
  name: string;

  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age: 30 | undefined;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase + this.name);
  }
}

let user1: Greetable;

user1 = new Person("Max");
user1.greet("Hi");
```

- `greet()` 메소드를 예를 들어보자. 클래스가 `greet` 메소드를 가지고 있고, 다른 클래스도 이를 가지고 있는지를 확인하고자 할 때, 이 메소드(`greet`)가 존재하게 해주는 인터페이스를 구현하면 된다. 그렇게 되면, 클래스 간에 기능을 쉽게 공유할 수 있게 되는데, 모든 클래스는 메소드가 호출 될 때 실행되어야 하는 정확한 코드, 즉 고유한 구현을 추가해야만 하기 떄문이다.

- 그리고 우리는 인터페이스를 사용하여 이 특정 구조를 구현한다. 위의 코드를 보면, 우리는 `user1`이 `Greetable` 타입이며, 내부에 무엇이 있는지 상관없다고 코드를 작성했지만 내부에 있어야 하는 것은 `greet` 메소드다. 우리는 `greet` 메소드가 내부에 있어야 한다는 것을 알고 있다. `user1`에 무엇을 저장하든 이는 `Greetable`이어야 하며, 이로써 객체나 클래스에 대한 모든 것을 알 필요가 없는 강력하고 유연한 코드를 작성할 수 있지만 여기서 무엇을 얻든 `user1`에는 `greet` 메소드가 있어야 함을 알 수 있다. `Person`이 무엇을 갖고 있든 상관 없고 다만 `greet` 메소드가 관건인 것이다.

```ts
class Person implements Greetable {
  name: string;
  age: 30 | undefined;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase + this.name);
  }
}
```

- 결국 무엇을 기반으로 하든 `Greetable`이 `greet` 메소드를 작성하게끔 한다는 의미이다.

</br>

### 읽기 전용 인터페이스 속성

```ts
interface Greetable {
  name: string;

  greet(phrase: string): void;
}
```

- 인터페이스 내에는 `readonly` 제어자를 추가할 수 있지만 다만 `public`이나 `private`는 지정할 수 없다.

```ts
interface Greetable {
  readonly name: string;

  greet(phrase: string): void;
}
```

- `readonly` 를 추가하여 인터페이스를 기반으로 구축하는 모든 속성이 한 번만 설정되어야 하며 이후에는 읽기 전용으로 설정하여 객체가 초기화되면 변경할 수 없도록 설정할 수 있다.

```ts
type Greetable = {
  readonly name: string;

  greet(phrase: string): void;
};
```

- 인터페이스 대신 type 을 대신 사용하는 경우에도 마찬가지이다.

```ts
type Greetable = {
  readonly name: string;

  greet(phrase: string): void;
};
```

```ts
interface Greetable {
  readonly name: string;

  greet(phrase: string): void;
}
```

- 이 두가지는 아주 비슷하지만, '객체'를 사용하여 타입을 지정하고자 할 때 즉 작업을 수행하고자 한다면 일반적으로 인터페이스를 더 자주 사용한다는 것을 기억하자.

```ts
interface Greetable {
  name: string;

  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age: 30 | undefined;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase + this.name);
  }
}

let user1: Greetable;

user1 = new Person("Max");
user1.greet("Hi");
```

- 우리는 class에는 `readonly` 속성을 추가하지 않았다. 그럼에도 아래의 경우처럼

```ts
user1.name = "Min";
```

- `name`으로 접근해서 이름을 다른 값으로 설정하려 하면 에러가 발생하는 걸 알 수 있다. 우리가 설정했듯 `name`은 읽기 전용이기 때문이다.

```ts
class Person implements Greetable {
  name: string;
  age: 30 | undefined;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase + this.name);
  }
}
```

- `Person` 클래스에 `readonly`를 추가하지 않았음에도 클래스는 `Greetable`을 구현한다는 것을 인지하고 있기에 `name` 속성이 읽기 전용임을 자동으로 추론하게 된다.

</br>

## 자바스크립트로 인터페이스 컴파일

- 자바스크립트는 인터페이스에 대한 변환이 이루어지지 않는다. 인터페이스는 개발 및 컴파일 도중에만 사용할 수 있는 타입스크립트의 전용 기능이다. 따라서 변환 기능을 코드를 개선하는 데 사용할 수 있다. 하지만 자바스크립트 파일로 출력되는 것은 없으므로 명확한 규칙에 따라 보다 나은 명확하게 구조화된 코드를 작성하는데 도움이 되는 순수 개발 기능이라 할 수 있다. 런타임 동안 코드를 검사하는 데에만 사용되고, 이후 인터페이스의 흔적은 사라진다.

## 정리

- 인터페이스는 클래스나 객체가 특정 구조를 갖추도록 하고 객체의 형태에 대한 개념을 명확하게 설명하는 강력한 기능이다. 객체를 사용하여 작업을 수행하고 구조를 설명하고자 한다면 인터페이스를 사용하는 것이 권장된다.

</br>
