const baseURl =
  "https://v6.exchangerate-api.com/v6/416317fcad2598fc1c010ce9/pair";

let amt = document.querySelector("#input");
let img = document.getElementsByTagName("img");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// const flagUrl = "https://flagsapi.com/IN/flat/64.png";
let dropdowns = document.querySelectorAll(".dropdown select");

for (let dropdown of dropdowns) {
  // console.log("dropdown", dropdown);
  for (code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    dropdown.append(newOption);
  }
  dropdown.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  // console.log(element.value);
  flag = countryList[element.value];
  // console.log(flag);
  //  console.log(img.)
  newSrc = `https://flagsapi.com/${flag}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

let submit = document.querySelector("#submit");
submit.addEventListener("click", async () => {
  let amtval = amt.value;
  if (amtval === "" || amtval <= 0) {
    amt.value = "1";
  }

  // console.log(fromCurr.value, toCurr.value);
  const URl = `${baseURl}/${fromCurr.value}/${toCurr.value}`;
  // console.log(URl);
  let response = await fetch(URl);
  let data = await response.json();
  // console.log(data.conversion_rate);

  finalAmmount = amtval * data.conversion_rate;
  // console.log(finalAmmount);
  // console.log(msg.innerText);
  msg.innerText = `${amtval} ${fromCurr.value}=${finalAmmount} ${toCurr.value}`;
});
