class Department {
  // private id: string; => 이중 초기화 코드를 입력하는 대신 필드 정의를 제거한다.
  // private name: string; => 이중 초기화 코드를 입력하는 대신 필드 정의를 제거한다.
  private employees: string[] = [];

  constructor(private id: string, public name: string) {
    // this.id = id; 
    // this.name = n;
  }

  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    // validation etc
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department("d1", "Accounting");

accounting.addEmployee("Max");
accounting.addEmployee("Manu");

// accounting.employees[2] = 'Anna';

accounting.describe();
accounting.name = "NEW NAME";
accounting.printEmployeeInformation();

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

// accountingCopy.describe();
