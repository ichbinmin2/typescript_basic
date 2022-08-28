/** 인터페이스는 객체의 구조를 설명한다.
 * 간단히 말해 객체의 형태를 설명하는데 사용할 수 있다는 이야기다.
 * 클래스와는 달리 인터페이스는 청사진으로 사용되지 않는다.
 * 다만, 사용자 정의 타입으로 사용할 뿐이다.
 * 기본 값을 할당할 수 없으며 구체적인 값이 아닌, '구조' 만 있을 뿐이다.
 */

interface Person {
  name: string /* 기본 값을 할당할 수 없다. */;
  age: number;

  /** 메소드를 추가할 수도 있는데.
   * 실제 메소드를 추가하는 것이 아니라,
   * '구조'와 어떤 '형태' 여야 하는지 설명을 추가하여
   * Person 객체가 가질 메소드를 정의하는 것이다.
   * 만약 매개변수를 받는 함수의 형태라면,
   * 이 매개변수의 타입을 설명해주면 된다.
   */
  greet(phrase: string): void;
}

/** Person 인터페이스로 무엇을 할 수 있을까?
 * 1. 객체의 타입을 확인하는 데 사용할 수 있다.
 */

let user1: Person; // 변수 user1에 대한 타입을 Person으로 지정할 수 있다.

/** 이제 user1에 대한 값을 할당하면 interface가 객체를 정의하기 위해 사용되었기에
 * user1은 객체가 되며, string 타입인 name과 number 타입인 age,
 * 그리고 string 타입의 phrase 이란 이름의 매개변수를 받고
 * 아무 것도 반환하지 않는 함수(메소드)인 greet을 가진 객체가 될 것이다.
 */

user1 = {
  name: "Max",
  age: 20,

  greet(phrase: string) {
    console.log(phrase + this.name);
  },
};

user1.greet("hi");

/** interface는 객체의 구조를 정의할 수 있게 만들어준다.
 * 즉, 해당 구조를 가져야 하는 객체에 대한 타입을 확인하는 타입으로 사용될 수 있다.
 */

// interface Person {
//   name: string;
//   age: number;

//   greet(phrase: string): void;
// }

// let user1: Person;

// user1 = {
//   name: 'Max',
//   age: 30,
//   greet(phrase: string) {
//     console.log(phrase + ' ' + this.name);
//   }
// };

// user1.greet('Hi there - I am');
