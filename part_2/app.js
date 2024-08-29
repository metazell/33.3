const deckBaseURL = "https://deckofcardsapi.com/api/deck";

$(document).ready(async function() {
  let deckId = null;

  // Create a new deck on page load
  try {
    const response = await fetch(`${deckBaseURL}/new/shuffle/`);
    const data = await response.json();
    deckId = data.deck_id;
    $("#draw-card-btn").prop("disabled", false);  // Enable the draw button
  } catch (error) {
    console.error("Error creating a new deck:", error);
  }

  // Event listener for the draw button
  $("#draw-card-btn").on("click", async function() {
    try {
      const response = await fetch(`${deckBaseURL}/${deckId}/draw/?count=1`);
      const data = await response.json();
      let card = data.cards[0];
      let cardImg = `<div class="card-image"><img src="${card.image}" alt="${card.value} of ${card.suit}"></div>`;
      let $card = $(cardImg).appendTo("body"); // Append directly to the body

      // Apply random rotation to the card without changing its position
      let randomAngle = Math.floor(Math.random() * 60) - 30; // Rotate between -30 and 30 degrees
      $card.css({
        transform: `translate(-50%, -50%) rotate(${randomAngle}deg)`
      });

      // Disable the button if no cards are left
      if (data.remaining === 0) {
        $("#draw-card-btn").prop("disabled", true);
        $("#draw-card-btn").text("No more cards");
      }
    } catch (error) {
      console.error("Error drawing a card:", error);
    }
  });
});
