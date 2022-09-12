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

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}

printEmployeeInformation({ name: "Manu", startDate: new Date() });

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
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

/**⚡️ 구별된 유니언 ⚡️
 * 특수한 typeof 타입가드나,
 * 타입가드를 도와주는 '구별된 유니언' 타입을 사용해보자.
 * '구별된 유니언' 타입은 타입가드를 조금 더 수월하게 구현할 수 있도록 도와주는
 * 유니언 타입으로 작업을 수행할 때에 사용할 수 있는 패턴을 의미한다.
 * 이는 '객체' 타입으로 작업할 때에도 사용할 수 있다. */

/** interface 타입 */
interface Bird {
  type: "bird"; // 구별된 유니언 타입
  flyingSpeed: number;
}

interface Horse {
  type: "horse"; // 구별된 유니언 타입
  runningSpeed: number;
}

/** 🔥 짚고 넘어가야 할 지점 🔥
 * interface 각각의 type 값들은
 * 사실상 타입 속성에 해당하는 값이 아니며,
 * 타입이 각각 "bird" 나 "horse" 여야 하는 문자열을 포함해야 하는
 * 리터럴 타입이라는 것이다.
 * 이처럼, type 배정은 타입으로 저장될 수 있는 값,
 * 정확히 말해 해당 문자열 값의 범위를 좁혀준다.
 */

/** union 타입 */
type Animal = Bird | Horse;

/** 타입 적용 함수 */
function moveAnimal(animal: Animal) {
  let speed;
  /** switch문을 이용해서 animal.type 에 접근하여 */
  switch (animal.type) {
    /** 두 개의 type 의 case를 각각 검사한다. */
    case "bird": // type이 "bird" 일 때
      speed = animal.flyingSpeed;
      break;
    case "horse": // type이 "horse" 일 때
      speed = animal.runningSpeed;
  }
  console.log("Moving at speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

/** 🔥 정리 🔥
 * 구별된 유니언은 유니언을 구성하는 모든 객체에는 하나의 공통 속성만 있고,
 * 구별된 유니언은 해당 속성을 설명하므로 객체를 설명하는 이 속성을
 * switch 문에 사용하여 완전한 타입 안전성을 갖추고,
 * 객체에 어떤 속성을 사용할 수 있는지 파악할 수 있다.
 * 이는 객체와 유니언 타입을 사용하는 작업시에 사용할 수 있는 아주 유용한 패턴일 것이다.
 *
 * 인터페이스와도 작동하는데, 이 인터페이스는 인터페이스를 기반으로 구축된
 * 모든 객체가 해당 타입을 갖도록 하기 때문에 가능하다.
 *
 * 주어진 속성의 존재 여부를 확인하거나, instanceof 를 사용하는 게 아닌
 * 실제 존재하는 속성을 사용하여 어떤 유형의 객체와 작업하고 있는지 확인할 수 있고
 * 이를 통해 자동완성을 표시해 주기 때문에 오타의 위험 역시 없애준다.
 */
