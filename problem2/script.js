import axios from "axios";

// Validate number input
function validateNumberInput() {
  let inputAmount = document.getElementById("input-amount-send").value;
  let numberPattern = /^[0-9]+$/;

  if (inputAmount.match(numberPattern)) {
    console.log("Submit form");
  } else {
    alert("Input is not a valid number. Please enter only numbers.");
    
  }
}

// Submit form

function submitForm() {
  const form = document.getElementById("myform");

  form.addEventListener("submit", (e) => {
    const selectElementFrom = document.getElementById("select-currency-from");
    const selectElementTo = document.getElementById("select-currency-to");
    const inputSend = document.getElementById("input-amount-send");

    const selectValueFrom = selectElementFrom.value;
    const selectValueTo = selectElementTo.value;

    const numberEx = Number(selectValueFrom);
    console.log("Number", numberEx);

    const currencyExchange = () => {
      const inputSendValue = inputSend.value;
      console.log("value send", typeof inputSendValue);
      console.log("selectValue", typeof selectValueFrom, typeof selectValueTo);
      const resultExchange =
        (Number(inputSendValue) * (1 / Number(selectValueFrom))) /
        (1 / Number(selectValueTo));

      console.log("result exchange", resultExchange);
      const result = document.getElementById("input-amount-receive");
      result.value = `${resultExchange}`;
    };

    e.preventDefault();
    validateNumberInput();
    currencyExchange();
  });
}

// Fetch data from API
let dataSwap = [];
function fetchDataSwap() {
  const apiUrl = "https://interview.switcheo.com/prices.json";
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      dataSwap = data;
      console.log(dataSwap);
      displayData();
    })
    .catch((err) => console.log("Error fetch"));
}
fetchDataSwap();

const setSwap = (swaps) => {
  let innerHTML = "";

  swaps.forEach((swap) => {
    innerHTML += `
    <option value="${swap.price}">${swap.currency}</option>`;
  });
  console.log(swaps);
  document.getElementById("select-currency-from").innerHTML = innerHTML;
  document.getElementById("select-currency-to").innerHTML = innerHTML;
};

// Fetch data from API with axios
const fetchDataAxios = async () => {
  try {
    const response = await axios("https://interview.switcheo.com/prices.json");
    console.log(response);
    setSwap(response.data);
    submitForm();
  } catch (error) {}
};
fetchDataAxios();

// Hàm để hiển thị dữ liệu trong HTML
// function displayData() {
//   const dataList = document.getElementById("data-list");

//   // Xóa dữ liệu cũ trong danh sách (nếu có)
//   dataList.innerHTML = "";

//   // Duyệt qua mảng và tạo các mục danh sách
//   dataSwap.forEach((item) => {
//     const listItem = document.createElement("li");
//     listItem.textContent = `Currency: ${item.currency}, Value: ${item.price}`;
//     dataList.appendChild(listItem);
//   });
// }
