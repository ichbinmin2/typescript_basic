interface Named {
  readonly name: string;
}

interface Greetable extends Named {
  /** interface는 확장이 가능하다.
   * 그리고 여러 interface를 하나의 interface로
   * 병합할 수 있도록 둘 이상을 확장할 수 있다.
   */
  greet(phrase: string): void;
}

/** class 의 경우 interface처럼 확장할 수 없다는 점을 기억하자.
 * 또한, class와 상속(extends)를 이용하는 경우,
 * 하나의 클래스로부터만 상속이 가능하며, 다수의 클래스로부터는 상속할 수 없다.
 * 반면, interface의 경우 여러 interface로부터 상속 받을 수 있고,
 * 이는 모두 함께 병합되기 때문에 가능한 일이다.
 */

/** interface 를 나눠야 하는 이유 **
 * 어떤 애플리케이션 작업을 수행하면서 어떤 객체에는 name을 입력하고
 * greed 메소드는 제외하는 한편,
 * 다른 객체에는 greet와 name을 입력하고자 한다면
 * 또 어떤 객체나 클래스는 Named를 구현하고,
 * 다른 객체나 클래스는 Greetable을 구현하여
 * greet나 name 모두를 입력해야 할 수도 있기 때문에
 * 이런 식으로 나누는 게 편리할 것이다.
 */

class Person implements Greetable {
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }
}

let user1: Greetable;

user1 = new Person("Max");
// user1.name = 'Manu';

user1.greet("Hi there - I am");
console.log(user1);
