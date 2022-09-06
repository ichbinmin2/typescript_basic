// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name?: string;
  outputName?: string;
  /** 문자열이어야 하는지의 여부는 선택적으로 하고자 할 때
   * 속성 이름 다음에 물음표를 추가하여
   * '선택적 속성'을 지정할 수 있게 된다.
   * 이렇게 지정하게 되면, 이 인터페이스를 구현하는 클래스 내에
   * outputName 이 있을 수도 있지만 없을 수도 있다는 뜻이 된다.
   */
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  /** 이렇게 되면, Named interface를 지정한 Person에서
   * outputName 속성이 없어도 에러가 발생하지 않게 된다.
   */
  name?: string;
  /** 클래스 내부에서도 속성을 선택적으로 지정할 수 있다.
   * name 속성을 선택적으로 지정하기 위해 물음표를 추가한다.
   * 이렇게 되면, Named interface 에서도 역시 물음표를 추가해주어야 한다.
   */
  age = 30;

  constructor(n?: string) {
    // 1. 매개변수 속성을 선택적으로 바꿔줌으로써
    if (n) {
      this.name = n; // 빈 문자열이 아닐 경우에만 name 가 설정된다.
    }
  }

  greet(phrase: string) {
    // 4. 따라서 name 이 존재하는지 확인이 필요하다.
    if (this.name) {
      console.log(phrase + " " + this.name); // 5. name 이 있다면 콘솔을 입력하고
    } else {
      console.log("Hi!"); // 6. name 이 없다면 콘솔에 hi 를 입력한다.
    }
  }
}

let user1: Greetable;

user1 = new Person(); // 2. 새로운 객체를 생성할 때에도 더이상 매개변수르 전달하지 않아도 된다.
// user1.name = 'Manu';

user1.greet("Hi there - I am"); // 3. 이 역시 greet에서 this.name도 정의되지 않았다고 반환하지 않는다.
console.log(user1);

/** 정리
 * 클래스와 인터페이스 그리고 생성자 목록에서도 선택적 속성이 가능하다.
 * 그리고 이 세 요소는 느슨하게 연관된다.
 * 인터페이스에 선택적 속성을 입력하고 이어서
 * 클래스에서는 선택적 속성으로 구현한 다음
 * 선택적 옵션을 클래스에 입력하면 된다.
 */
