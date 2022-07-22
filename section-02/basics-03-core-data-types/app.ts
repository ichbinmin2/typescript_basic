function add(n1: number, n2: number, showResult: boolean) {
  // if (typeof n1 !== 'number' || typeof n2 !== 'number') {
  //   throw new Error('Incorrect input!');
  // }
  const result = n1 + n2;
  if (showResult) {
    console.log(result);
  } else {
    return result;
  }
}

// function add(n1: number, n2: number) {
//   if (typeof n1 !== "number" || typeof n2 !== "number") {
//     throw new Error("Incorrect input!");
//   } // 숫자가 아니면 에러를 처리

//   return n1 + n2;
// }

const number1 = 5; // 5.0
const number2 = 2.8;
const printResult = true;
// const resultPhrase = "Result is: ";
// const result = add(number1, number2);

add(number1, number2, printResult);

// console.log(result);
