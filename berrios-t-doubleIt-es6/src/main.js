import { doubleIt } from "./utils.js";

const init = () => {
  // hook up UI
  const output = document.querySelector("#output");
  const numberField = document.querySelector("#number");
  const btnDouble = document.querySelector("#btn-double");

  btnDouble.onclick = () => {
    // the .value of an <input> element are always of type `String`
    // so we need to convert it to a `Number`
    const num = Number(numberField.value.trim()) || 0;
    const doubledNum = doubleIt(num);
    output.innerHTML = `${num} doubled is ${doubledNum}`;
  };
};

init();