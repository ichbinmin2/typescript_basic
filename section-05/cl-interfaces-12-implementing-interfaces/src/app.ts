/** interface가 필요한 이유
 * interface를 왜 사용해야 할까?
 * 사용자 정의 type 과 뭐가 다른 걸까?
 */

/** ⚡️ 사용자 정의 타입
 * type Person = { 
  name: string 
  age: number;

  greet(phrase: string): void;
}
 */

/** 이렇게 interface를 사용자 정의 Type으로 바꾸더라도
 * 이전과 동일하게 동작한다. 그럼에도 interface를 사용해야하는 이유는 뭘까?
 * 사용자 정의 type과 interface는 비슷해보이지만 엄연히 다르다.
 * 물론, 종종 서로 바꿔서 사용자 지정 타입 대신에 interface를 사용하거나 그 반대로도 가능하다.
 * 그러나, 가장 큰 차이점이 있다.
 * interface는 객체의 구조를 '설명' 하기 위해서만 사용한다는 것이다.
 * 그리고 무언가를 interface를 정의하는 경우,
 * 그것이 분명 객체의 구조를 정의하는데 쓰일 것이다.
 * 실제로 객체 유형을 정의할 때 사용자 정의 type을 사용하는 것보다
 * interface를 사용하는 경우를 더 자주 볼 수 있다.
 * 만약 사용자 정의 type과 interface 둘 다 사용할 수 있는 경우라면
 * 분명 클래스 내에 인터페이스를 구현하는 것일 것이다. 이게 무슨 의미일까?
 * 작업 중 interface를 더 자주 사용하는 이유는
 * class 가 interface를 이행하고 준수해야 하는 '약속' 처럼 사용할 수 있기 때문이다.
 */

interface Greetable {
  readonly name: string /* 기본 값을 할당할 수 없다. */;

  /** 1. 만약 여기서 age를 지운다면 */
  greet(phrase: string): void;
}

/** 4. 새로운 클래스를 생성하고
 * 클래스 이름 뒤에 implements 키워드를 추가해서
 * 준수할 interface인 Greetable을 입력한다.
 * 📌 여러 개의 interface를 구현할 수 있다는 게
 * extends(상속)과의 차이점이다. 📌
 * extends(상속)은 한 클래스로부터만 상속할 수 있지만
 * interface는 쉼표로 구분하여
 * 여러 개의 interface를 구현할 수 있으므로
 * 또 다른 interface를 받을 수 있다!
 */

/** 5. 따라서, interface는 주로 구체적인 구현이 아닌,
 * 서로 다른 클래스 간의 기능을 공유하기 위해 사용한다.
 * interface 내부에서는 구현이나 값을 입력하는 게 아닌
 * 구조와 클래스가 가져야 할 기능을 입력해야 한다.
 * 이는 추상 클래스로 작업하는 것과 다소 비슷하기 해보인다.
 * 허나, interface에는 구현 세부 사항이 전혀 없는 반면
 * 추상 클래스는 우리가 덮어써야 했던 부분과
 * 내가 수행한 구체적 구현 부분을 혼합 할 수 있다는 중요한 차이점이 있다.
 * */

class Person implements Greetable {
  name: string;
  age: 30 | undefined;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase + this.name);
  }

  /** 필드를 더 많이 입력하거나
   * 메소드를 더 많이 입력하거나
   * Person 클래스를 확장할 수도 있다.
   * 항상 그렇듯이 Person 클래스를 사용하여 작업을 수행할 수도 있지만
   * 메소드를 정확하게 구현하고, name 속성을 입력해야만 한다.
   * Greetable(interface)를 구현하는 작업이기 때문이다.
   */
}

let user1: Greetable;

user1 = new Person("Max");
user1.greet("Hi");

/** 📍 정리
 * 여기서 중요한 점은,
 * interface를 구현하는 클래스를 기반으로 하여
 * interface를 타입으로서 사용할 수 있다.
 * 위의 예시를 보면 user1의 타입을 Person 으로 설정할 수도 있지만,
 * 현재 user1에 저장한 Person 객체는
 * 결국 Greetable interface를 기반으로 했기 때문에
 * 동일하게 작동할 수 있다는 걸 알 수 있다.
 */

// user1 = {
//   name: "Max",

/** 2. interface 에서 age를 설명하지 않았으므로,
 * Type error 가 발생한다. */

//   age: 20,

//   greet(phrase: string) {
//     console.log(phrase + this.name);
//   },
// };

/** 3. 이것의 의미는 즉 Greetable interface를 준수하는 모든 class가
 * Greetable이 설명하고 있는 name, age, greet()을 갖도록 해야 한다는 뜻이다.
 */

user1.greet("hi");

// interface Greetable {
//   name: string;

//   greet(phrase: string): void;
// }

// class Person implements Greetable {
//   name: string;
//   age = 30;

//   constructor(n: string) {
//     this.name = n;
//   }

//   greet(phrase: string) {
//     console.log(phrase + ' ' + this.name);
//   }
// }

// let user1: Greetable;

// user1 = new Person('Max');

// user1.greet('Hi there - I am');
// console.log(user1);
