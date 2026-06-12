// Import the 8 places of interest from the local .mjs data file
import { places } from "../data/discover.mjs";

// ==========================================
// 1. LOCALSTORAGE - VISITOR MESSAGE
// ==========================================
const visitorMessage = document.getElementById("visitor-message");
const lastVisit = localStorage.getItem("lastChamberVisit");
const currentDate = Date.now(); // Current time in milliseconds

if (!lastVisit) {
    // First time visiting this page
    visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    // Calculate how many days have passed since the last visit
    const daysDifference = Math.floor(
        (currentDate - parseInt(lastVisit)) / (1000 * 60 * 60 * 24)
    );

    if (daysDifference < 1) {
        visitorMessage.textContent = "Back so soon? Awesome!";
    } else if (daysDifference === 1) {
        visitorMessage.textContent = "Your last visit was 1 day ago.";
    } else {
        visitorMessage.textContent = `Your last visit was ${daysDifference} days ago.`;
    }
}

// Save the current visit date for next time
localStorage.setItem("lastChamberVisit", currentDate);


// ==========================================
// 2. DYNAMIC CARD GENERATION FROM JSON DATA
// ==========================================
const gridContainer = document.getElementById("discover-grid");

function displayCards(places) {
    gridContainer.innerHTML = "";

    places.forEach((place, index) => {
        const card = document.createElement("div");

        // Assign a named grid area to each card (card1, card2, ... card8)
        card.classList.add("discover-card");
        card.style.gridArea = `card${index + 1}`;

        // Build card using required rubric structure:
        // h2 for title, figure for image, address tag, paragraph, and "More Info" button
        card.innerHTML = `
            <h2>${place.name}</h2>
            <figure>
                <img 
                    src="${place.image}" 
                    alt="Photo of ${place.name}" 
                    loading="lazy"
                    width="300"
                    height="200"
                >
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button class="info-btn">More Information</button>
        `;

        gridContainer.appendChild(card);
    });
}

// Run the card display function on page load
displayCards(places);