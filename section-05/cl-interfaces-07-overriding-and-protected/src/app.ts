class Department {
  // private readonly id: string;
  // private name: string;
  protected employees: string[] = [];

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

// Department 를 상속 받는 새로운 클래스 ITDepartment
/* 클래스 안이 비어 있어도 {} 제대로 작동한다.
 * 왜냐하면, ITDepartment는 Department 클래스를 상속받기 때문에
 * 생성자를 포함하여, 기본 Department 클래스가 가진 모든 것을 자동으로 가져오기 때문이다.
 * 따라서 상속 받은 클래스에 고유 생성자를 추가하지 않는 한, 하위 클래스에 대한 기본 클래스는 생성자이므로
 * 하위 클래스를 인스턴스할 때 이 생성자(new ITDepartment)가 자동으로 사용된다.
 * 그렇기 때문에 기본 클래스 생성자를 ITDepartment 에 전달되는 인수를 사용하여 호출할 수 있다.
 */
class ITDepartment extends Department {
  admins: string[];
  // 고유 생성자 추가
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    /** super()는 다른 클래스로부터 상속받는 클래스에 고유 생성자를 추가할 때마다
     * 상속하는 클래스로 super()를 추가하고, 이를 함수처럼 실행해야 한다.
     * 현재 해당 super()는 부모 생성자(Department)의 인수들인 `id`와 `name`을 취하므로
     * 여기에 `id`를 super로 전달하고, `name`의 값을 하드코딩할 수 있다.
     * 중요한 건 생성자에서 super를 먼저 호출한 다음 this 키워드를 사용하여 작업을 수행해야 한다.
     * 특히 다른 특수한 속성을 할당하려면 super부터 호출해야 한다.
     */

    this.admins = admins;
  }
}

// Department 를 상속 받는 새로운 클래스 AccountingDepartment
class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, "Account");
  }

  // 고유 메소드
  addReport(text: string) {
    this.reports.push(text);
  }

  // 고유 메소드
  printReport() {
    console.log(this.reports);
  }
}

const it = new ITDepartment("d1", ["Max"]);
/** 전체 Department에 대한 항목 뿐만 아니라, ITDepartment의 admins 도 출력된다. */

// accounting.addReport('Something went wrong...');

it.addEmployee("Max");
it.addEmployee("Manu");

it.describe();
it.name = "NEW NAME";
it.printEmployeeInformation();

console.log("it", it);

const accounting = new AccountingDepartment("d2", []);

accounting.addReport("Something went wrong...");
accounting.printReport();
// accounting.printReports();
// accounting.printEmployeeInformation();

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

// accountingCopy.describe();
