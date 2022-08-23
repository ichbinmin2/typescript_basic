abstract class Department {
  static fiscalYear = 2020;
  // private readonly id: string;
  // private name: string;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
    // console.log(Department.fiscalYear);
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  /** ⚡️ abstract : abstract 를 추가하면 추상 클래스에서만 사용할 수 있다는 에러가 발생한다.
   * 따라서, 메소드 앞에 abstract 가 있는 메소드가 하나 이상이라면, 클래스 앞에소 abstract를 추가해야 한다.
   */
  abstract describe(this: Department): void;
  /** ⚡️ void 로 타입을 정의함으로서 이 메소드의 형태와 메소드의 구조가 어떤 것인지를 정의만 하고 있을 뿐,
   * 그 외에는 아무 것도 정의하지 않음을 명시하고 있다.
   * 즉, abstract 가 붙은 메소드는 해당 클래스를 상속 받은 어떤 클래스든
   * 그 내부에서 구현이 되어야 한다는 뜻이 된다.
   */

  /* ⚡️ 따라서 abstract는 일부 상위 클래스를 기반으로 하는(상속받는) 모든 클래스가
   * 공통 메소드 또는 속성을 공유하도록 하려는 경우 아주 유용하게 사용할 수 있다.
   * abstract 키워드로 표기된 클래스들은 자체적으로 인스턴스화 할 수 없으므로,
   * 우리는 이제 Department 클래스를 인스턴스화 할 수 없게 되었다.
   */

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

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }

  /** describe 메소드 필수 구현 */
  describe() {
    console.log("IT Department - ID: " + this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value!");
    }
    this.addReport(value);
  }

  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  describe() {
    console.log("Accounting Department - ID: " + this.id);
  }

  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment("d1", ["Max"]);

it.addEmployee("Max");
it.addEmployee("Manu");

// it.employees[2] = 'Anna';

it.describe();
it.name = "NEW NAME";
it.printEmployeeInformation();

console.log(it);

const accounting = new AccountingDepartment("d2", []);

accounting.mostRecentReport = "Year End Report";
accounting.addReport("Something went wrong...");
console.log(accounting.mostRecentReport);

accounting.addEmployee("Max");
accounting.addEmployee("Manu");

// accounting.printReports();
// accounting.printEmployeeInformation();
accounting.describe();

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

// accountingCopy.describe();
