class Department {
  name: string;

  // 예약어 생성자
  constructor(n: string) {
    this.name = n;
  }

  // 메소드
  describe(this: Department) {
    // this 의 타입은 클래스 타입이어야 한다
    console.log("Department : " + this.name); // Department 클래스에 기반한 인스턴스를 참조하기 때문
  }
}

const accounting = new Department("Accounting");

accounting.describe();

// ex 새로운 객체 생성
const accountingCopy = { describe: accounting.describe };
accountingCopy.describe(); // undefined 출력
/* 🚨 위의 예시에서 에러가 발생한 이유 🚨
 * accountingCopy 에서 descibe 메소드를 호출하면서 Department 의 인스턴스에서 호출한 게 아니기 때문
 * 따라서 this가 위반되었기 때문에 에러가 발생한 것이다.
 */

// ex 새로운 객체 생성2
const accountingCopy2 = { name: "DUMMY", describe: accounting.describe };
accountingCopy2.describe(); // DUMMY 출력
/* ⚡️ 위의 예시에서 에러가 발생하지 않은 이유 ⚡️
 * 현재 describe 메소드를 호출하는 accountingCopy2 객체에는
 * name 속성을 가지고 있고 이 this는 name 속성을 가진 Department를 기반으로 하기 때문에 에러가 발생하지 않는다.
 * 따라서 새로운 객체를 생성하면서 name을 추가하면 타입스크립트 에러가 발생하지 않는 것이다.
 */
