var button = document.querySelector("button");
var input1 = document.getElementById("num1");
var input2 = document.getElementById("num2");

function add(num1, num2) {
  return num1 + num2;
}
button.addEventListener("click", function () {
  console.log(add(+input1.value, +input2.value));
});

// 컴파일된 자바스크립트 파일
// => 타입스크립트는 자바스크립트로 컴파일한 이후로 제거되고, 일반 자바스크립트가 출력으로 얻어진다.
