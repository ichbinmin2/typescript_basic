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

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  /** ⚡️ private 속성으로 지정했기 때문에 외부에서 접근이 불가능하다.
   * 하지만, "get" 메소드를 사용함으로써 속성처럼 외부에서 접근할 수 있도록 만들 수 있다.
   */

  get mostRecentReport() {
    // get 메소드는 꼭 무언가를 반환하도록 작성해야 한다.

    if (this.lastReport) {
      // => if 문을 작성하여 값이 참인지 아닌지 확인
      return this.lastReport;
      /** ⚡️ this.lastReport 를 반환하여 캡슐화 한다.
       * 그리고 이 코드 블록은 이제 공개적으로 접근할 수 있게 된다.
       */
    }
    throw new Error("No report found");
    // => 값이 거짓일 경우, 에러를 던진다
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
/** "get" 메소드 */
console.log(accounting.mostRecentReport); // => 속성으로 접근!

accounting.addEmployee("Max");
accounting.addEmployee("Manu");

accounting.printReports();
accounting.printEmployeeInformation();

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

// accountingCopy.describe();
