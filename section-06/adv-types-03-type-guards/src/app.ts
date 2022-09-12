type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Employee, Admin {}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

/** 타입가드는 유니언 타입을 돕는데 사용된다.
 * 유니언 타입을 통해 유연성을 가진다는 건 좋지만
 * 런타임 시 정확하게 어떤 타입을 얻게 될지를 알아야 하는 경우가 많기 때문이다.
 */

function add(a: Combinable, b: Combinable) {
  /** 타입 가드 예시 : typeof */

  // 1. 만약 매개변수 a와 b 모두 문자열 이라면
  if (typeof a === "string" || typeof b === "string") {
    // 두 문자열을 결합하고,
    return a.toString() + b.toString();
  }
  // 2. 아니라면(number) 타입이라면,
  // 두 숫자를 더한다.
  return a + b;
}
/** 🔥 타입 비교를 할 때 typeof를 사용하기 위해서는 🔥
 * 자바스크립트가 알고 있는 타입이어야 하고,
 * typeof가 가능한 객체, 문자열, 숫자형, 불리언 등만 가능하다.
 */

type UnknownEmployee = Employee | Admin; // 타입이 객체 일 때

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name); // Employee와 Admin 모두 name 속성이 있기 때문에 가능.

  /** 타입 가드 예시 : in
   * 🔥 in은 자바스크립트에 내장된 키워드이다.
   * 이를 사용해서 비교함으로써 객체 속성에 접근할 수 있다.🔥
   */

  // 1. 만약 매개변수 emp 객체 안에 "privileges" 속성이 있다면,
  if ("privileges" in emp) {
    // emp의 privileges 속성에 접근하여 콘솔에 출력한다.
    console.log("Privileges: " + emp.privileges);
  }
  // 2. 만약 매개변수 emp 객체 안에 "startDate" 속성이 있다면,
  if ("startDate" in emp) {
    // emp의 startDate 속성에 접근하여 콘솔에 출력한다.
    console.log("Start Date: " + emp.startDate);
  }
}

printEmployeeInformation({ name: "Min", startDate: new Date() });

/** class 를 사용하여 작업하는 경우 다른 유형의 타입가드도 사용할 수 있다. */
class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo ..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive(); // drive 메소드는 Car와 Truck 에 동시에 존재하는 속성이기에 접근 가능하다.

  /** 🔥 타입 가드 예시 : in 🔥 **
  if("loadCargo" in vehicle) {
    vehicle.loadCargo(1000);
  }
   */

  /** 🔥 타입 가드 예시 : instanceof 🔥 **
   * instanceof 는 타입스크립트가 아니라
   * 런타임시 실행되는 typeof 같은 자바스크립트 내부의 일반 연산자이고,
   * in을 사용할 때 문자열에서 오타를 낼 위험을 덜어주는 자바스크립트 키워드이다.
   */

  // 만약 vehicle이 Truck 클래스의 인스턴스라면,
  if (vehicle instanceof Truck) {
    // vehicle 의 loadCargo 메소드에 접근하여 1000 을 전달한다.
    vehicle.loadCargo(1000);
  }

  /** 짚고 넘어가야 할 점 🔥
   * 인터페이스는 어떤 자바스크립트 코드와도 비교할 수 없기 때문에
   * 런타임 시에는 인터페이스를 사용할 수 없다.
   * 하지만 클래스는 자바스크립트가 클래스와 생성자 함수를 지원하기 때문에
   * 런타임 시에 사용할 수 있다.
   */
}

useVehicle(v1);
useVehicle(v2);

/** 정리
 * 결국 타입가드는 특정 속성이나 메소드를 사용하기 전에
 * 그것이 존재하는지 확인하거나 타입을 사용하기 전에
 * 이 타입으로 어떤 작업을 수행할 수 있는지를 확인하는 개념 또는 방식을 나타내는 용어이다.
 */
