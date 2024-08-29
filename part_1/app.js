const baseURL = "http://numbersapi.com";
const favNumber = 9;
const favNumbers = [25, 2017, 2020];

const getSingleFact = async () => {
  try {
    const response = await fetch(`${baseURL}/${favNumber}?json`);
    const data = await response.json();
    document.getElementById("single-fact").innerText = data.text;
  } catch (error) {
    console.error("Error fetching single fact:", error);
  }
};

const getMultipleFacts = async () => {
  try {
    const response = await fetch(`${baseURL}/${favNumbers}?json`);
    const data = await response.json();
    for (let num in data) {
      document.getElementById("multiple-facts").innerHTML += `<p>${num}: ${data[num]}</p>`;
    }
  } catch (error) {
    console.error("Error fetching multiple facts:", error);
  }
};

const getMultipleFactsForFavorite = async () => {
  try {
    const promises = Array.from({ length: 4 }, () => fetch(`${baseURL}/${favNumber}?json`));
    const responses = await Promise.all(promises);
    const facts = await Promise.all(responses.map(response => response.json()));
    facts.forEach(data => document.getElementById("favorite-number-facts").innerHTML += `<p>${data.text}</p>`);
  } catch (error) {
    console.error("Error fetching multiple facts for favorite number:", error);
  }
};

// Initialize the number facts
getSingleFact();
getMultipleFacts();
getMultipleFactsForFavorite();
