// interface Admin {
//   name: string;
//   privileges: string[];
// }

// interface Employee {
//   name: string;
//   startDate: Date;
// }

// interface ElevatedEmployee extends Admin, Employee {}

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "max",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Comvinable = string | number;

type Numeric = number | boolean;

type Universal = Comvinable & Numeric;

/** 인터섹션 타입은 항상 사용하지는 않겠지만
 * 이 타입을 이용하면 더 단순하고 적은 양의 코드로
 * 무언가를 표현할 수 있는 경우가 있을 때 사용하면 좋다.
 */
