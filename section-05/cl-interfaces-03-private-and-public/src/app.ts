class Department {
  public name: string; // public : 기본 값. 외부에서 접근할 수 있다.
  private employees: string[] = []; // private 제어자 : 생성된 객체 내부에서만 접근할 수 잇는 속성

  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    console.log("Department: " + this.name);
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

const accounting = new Department("Accounting");

accounting.addEmployee("Max");
accounting.addEmployee("Manu");

// accounting.employees[2] = 'Anna'; => 🚨 접근 불가능 🚨

accounting.describe();
accounting.name = "NEW NAME";
accounting.printEmployeeInformation();

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

// accountingCopy.describe();
