/** interface는 객체의 구조를 정의하는데 사용된다.
 * 그런데, interface는 함수의 구조를 정의하는 데에도 사용할 수 있다.
 * 왜냐하면 결국 함수는 객체일 뿐이기 때문이다.
 */

/** ⭐️ interface로 정의하기 전  ⭐️ ** 
type AddFn = (a: number, b: number) => number;

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};
 */

/** ⚡️ interface로 정의한 후 ⚡️ **/
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

/* ----------------------------- */

interface Named {
  readonly name: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

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
