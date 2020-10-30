//I have used node for solving this assessment
//First run npm install
//Then run npm start

const axios = require("axios");

const fetchData = async () => {
  try {
    return await axios.get("https://test-schema.herokuapp.com/vegetables");
  } catch (error) {
    console.log(error);
  }
};

(async function () {
  const response = await fetchData();

  //Item details without vat
  const items = response.data.data;
  console.log("Items before vat: ", items);

  const totalWithoutVat = items
    .map((item) => item.price)
    .reduce((acc, curr) => acc + curr);
  console.log("Total without vat", totalWithoutVat); //Total without vat

  const fiteredItemsWithoutVAt = items.filter((item) => item.price > 50);
  console.log("Filtered Items (Without Vat): ", fiteredItemsWithoutVAt); //Filter without vat

  //Item details with 15% vat
  const itemsWithVat = items.map((item) => ({
    name: item.name,
    price: Math.round(item.price * 1.15 * 100) / 100,
  }));
  console.log("Items after applying 15% vat: ", itemsWithVat);

  const totalWithVat = itemsWithVat
    .map((item) => item.price)
    .reduce((acc, curr) => acc + curr);
  console.log("Total with vat", totalWithVat); //Total with vat

  const fiteredItemsWithVAt = itemsWithVat.filter((item) => item.price > 50); //Filtered with vat
  console.log("Filtered Items (With Vat): ", fiteredItemsWithVAt);
})();
