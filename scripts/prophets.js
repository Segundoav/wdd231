// Store the URL of the JSON resource provided by the university
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// Select the HTML div element with the id of 'cards'
const cards = document.querySelector('#cards');

// Define an asynchronous function to fetch data from the JSON source
async function getProphetData() {
    try {
        // Wait for the fetch() request to complete and store the response
        const response = await fetch(url);
        
        // Convert the response into a readable JSON object
        const data = await response.json();
        
        // Call the display function and pass the array of prophets
        displayProphets(data.prophets); 
        
    } catch (error) {
        // Handle any errors if the network fetch request fails
        console.error("Error fetching prophet data:", error);
    }
}

// Define a function expression to handle the array and build the cards
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create elements to add to the div.cards element
        let card = document.createElement('section');
        let fullName = document.createElement('h2'); 
        let portrait = document.createElement('img');
        
        // Additional elements for birth information
        let birthDate = document.createElement('p');
        let birthPlace = document.createElement('p');

        // Build the h2 content out to show the prophet's full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        
        // Populate additional details
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

        // Build the image portrait by setting all the relevant attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`); 
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Append the created elements to the section (card)
        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);

        // Append the section card to the main container in the HTML
        cards.appendChild(card);
    });
}

// Call the function to execute the fetch request on page load
getProphetData();