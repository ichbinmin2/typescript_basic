class Department {
  // private readonly id: string;
  // private name: string;
  private employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
  }

  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    // validation etc
    // this.id = 'd2';
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

/* extends로 Department를 상속 1 
 class ITDepartment extends Department {
  }
}

const accounting = new ITDepartment('id', "Accounting") => 가능.

** 비어있는 ITDepartment여도 에러가 나지 않는 이유 **
 * Department 클래스를 상속하고 있기 때문에 생성자를 포함하여
 * Department 클래스가 가진 모든 것을 자동으로 가져오기 때문이다.
*/

// Department 를 상속 받는 새로운 클래스 ITDepartment
/* 클래스 안이 비어 있어도 {} 제대로 작동한다.
 * 왜냐하면, ITDepartment는 Department 클래스를 상속받기 때문에
 * 생성자를 포함하여, 기본 Department 클래스가 가진 모든 것을 자동으로 가져오기 때문이다.
 * 따라서 상속 받은 클래스에 고유 생성자를 추가하지 않는 한, 하위 클래스에 대한 기본 클래스는 생성자이므로
 * 하위 클래스를 인스턴스할 때 이 생성자(new ITDepartment)가 자동으로 사용된다.
 * 그렇기 때문에 기본 클래스 생성자를 ITDepartment 에 전달되는 인수를 사용하여 호출할 수 있다.
 */
class ITDepartment extends Department {
  // '하나'의 클래스만 상속할 수 있다.
  admins: string[]; // 고유 생성자 추가

  // ITDepartment 만의 고유 생성자 생성
  constructor(id: string, admins: string[]) {
    super(id, "IT"); // 기본 클래스()의 기존의 생성자 id와 name을 호출해서 하드코딩으로 지정.
    /** ⚡ super ⚡️
     * 다른 클래스로부터 상속받는 클래스에 고유 생성자를 추가할 때마다
     * 상속하는 클래스로 super를 추가하고 이를 함수처럼 실행해야 한다.
     * 여기서 super는 기본 클래스(Department) 의 생성자를 호출하는 역할을 한다.
     * 따라서 생성자에서 super를 먼저 호출하고, 그 이후 this 키워드를 사용하여 고유의 생성자를 추가해야 한다.
     */
    this.admins = admins; // 축약 코드로서 생략도 가능하다.
  }
}

const it = new ITDepartment("d1", ["Max"]);
// 고유 생성자를 추가하면 에러가 발생한다. => 그래서 super() 를 먼저 호출해야함.

it.addEmployee("Max");
it.addEmployee("Manu");

// it.employees[2] = 'Anna';

it.describe();
it.name = "NEW NAME";
it.printEmployeeInformation();

console.log(it);
/** 전체 Department 클래스의 생성자들을 비롯하여,
 * ITDepartment 클래스의 고유 생성자인 this.admins도 함꼐 출력된다. **/

// Department 를 상속 받는 새로운 클래스 AccountingDepartment
class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    // 고유 생성자 reports 추가
    // 클래스 내부에서만 사용 가능하도록 reports에 private 설정을 함
    super(id, "Accounting"); // 기본 클래스()의 기존의 생성자 id와 name을 호출해서 하드코딩으로 지정.
    // this.reports = reports 는 축약코드로서 생략 가능
  }

  // 고유 메소드 1
  addReport(text: string) {
    this.reports.push(text);
  }

  // 고유 메소드 2
  printReports() {
    console.log(this.reports);
  }
}

// 클래스 객체 생성
const accounting = new AccountingDepartment("d2", []);

// 메소드 호출
accounting.addReport("Something went wrong...");
accounting.printReports();

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };
// accountingCopy.describe();
