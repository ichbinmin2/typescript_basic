class Department {
  name: string;

  // 예약어 생성자
  constructor(n: string) {
    this.name = n;
  }
}

const accounting = new Department("Accounting");

console.log(accounting);
