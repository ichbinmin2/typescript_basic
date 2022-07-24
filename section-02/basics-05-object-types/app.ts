const person: {
  name: string;
  age: number; // 이는 타입스크립트의 표현법일 뿐, 새로운 객체 생성이 아님!
} = {
  // const person = {
  name: "Maximilian",
  age: 30,
};

console.log(person.name);
