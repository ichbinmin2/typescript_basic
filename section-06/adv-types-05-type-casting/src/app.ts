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

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log("Moving at speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

/** ⚡️ 형 변환 ⚡️
 * 형 변환은 타입스크립트가 직접 감지하지 못하는 특정 타입의 값을
 * 타입스크립트에 알려주는 역할을 한다.
 * 타입스크립트는 HTML 파일을 살펴보고 분석하지 못하기 때문이다.
 * 관련된 좋은 예는 dom 에 있는 무언가로 접근하는 경우이니 아래 코드를 살펴보자.

const userInputElement = document.getElementById("user-input")!;
userInputElement.value = "Hi"; 🚨 type error 발생 🚨 

 * id로 HTML P 태그를 접근하려고 한다면, 
 * 타입스크립트는 그저 이것을 HTML 요소나 null 로 추론하는 것을 알 수 있다.
 * 즉, 어떤 특정 HTML 요소인지는 모른다는 뜻이다. 
 * 기본적으로 모든 HTML 요소가 타입으로서 갖는 제네릭 타입이 
 * 특정 HTML 요소인 속성을 지원하지 않기 때문이다.
 * 따라서, 우리는 위에서 선택한 input이 단순히 null 타입이 아니라
 * HTML의 Input element 라는 것을 타입스크립트에 알려줘야 한다.
 * 그리고 이를 '형 변환' 을 사용해서 구현할 수 있다.
 */

/** 🙋🏻‍♀️ 형 변환은 두 가지 구문으로 구현할 수 있다. 🙋🏻‍♀️ 
 * 첫 번째는 변환하고자 하는 '요소' 앞이나
 * 타입스크립트에 타입을 알려주고자 하는 위치 앞에
 * 무언가를 '추기' 하는 방법이다.

1. const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;

 * 이 타입은 tsconfig 에 'dom'을 lib을 포함시켰으므로 전역적으로 사용 가능하다. 
 * 이로써 타입스크립트가 <> 쌍 다음에 있는 것이 무엇이든,
 * HTMLInputElement 라는 것으로 변환되기 때문에 에러는 사라진다.

 * 두 번째는 형 변환하고자 하는 타입 다음에 무언가를 추가하는 방법이 있다.

2. const userInputElement = document.getElementById('user-input')! as HTMLInputElement

 * 선택한 부분 다음에 as 키워드를 입력해서 형 변환하고자 하는 타입을 추가한다.
 * 이 경우에는 as 앞의 표현식이 HTMLInputElement 타입의 값을 반환하므로 
 * 더이상 에러가 발생하지 않는 걸 알 수 있다.

 * 이 두가지 방법은 동등하므로 선호하는 방식을 사용하면 된다.
 * 다만, 프로젝트 전체에서의 일관성 유지를 위해서 
 * 두 구문을 같이 사용하는 것은 지양해야 할 것이다.
*/

/** 🔥 느낌표의 역할은 무엇일까? 🔥
 * 느낌표를 사용하면 느낌표 앞의 표현식을 Null로 반환하지 않겠다고
 * 타입스크립트에게 인식시킬 수 있게 할 수 있다.
 * 만약 표현식을 null로 반환하지 않을 것이라는 확신이 들지 않는 경우에는
 * (느낌표를 사용하지 않을 때)
 * if 문을 사용하여 형 변환을 진행하면 될 것이다.
 */

const userInputElement = document.getElementById("user-input");

if (userInputElement) {
  /** 지금은 타입에 대해 확신할 수 없는 경우이기에
   * value로 접근하고자 한다면,
   * value 앞의 속성에서 형 변환이 이루어져야 한다.
   */
  (userInputElement as HTMLInputElement).value = "Hi there!";
}
