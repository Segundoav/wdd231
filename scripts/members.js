// 1. Define the data source path
const jsonUrl = "family.json"; 

// 2. Main asynchronous function to fetch data
async function fetchAndDisplayMembers() {
    const container = document.querySelector("#family-list");

    // Safety check: if the container doesn't exist in the HTML, stop the function
    if (!container) {
        console.warn("Element #family-list not found in the DOM.");
        return;
    }

    try {
        const response = await fetch(jsonUrl);
        
        // Check if the server response was successful (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        // Call the render function, passing the family members array
        displayMembers(data.family_members);

    } catch (error) {
        console.error("Error fetching or parsing data:", error);
        // User-friendly error message displayed on the screen
        container.innerHTML = `<p class="error-message">Unable to load member data at this time. Please try again later.</p>`;
    }
}

// 3. UI Function responsible purely for rendering the cards
function displayMembers(members) {
    const container = document.querySelector("#family-list");
    
    // Clear the container to prevent duplicate rendering
    container.innerHTML = "";

    // Iterate through each member in the array
    members.forEach(member => {
        // Create a semantic 'article' element for each member card
        const card = document.createElement("article");
        card.classList.add("member-card"); 

        // Insert content using Template Literals neatly
        card.innerHTML = `
            <h3>${member.name}</h3>
            <p><strong>Gender:</strong> ${member.gender}</p>
            <p><strong>Birthdate:</strong> ${formatDate(member.birthdate)}</p>
        `;
        
        // Append the card to the main container
        container.appendChild(card);
    });
}

// 4. Utility function to improve date presentation
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    // Returns a readable date format (e.g., "June 27, 1977")
    return date.toLocaleDateString('en-US', options);
}

// 5. Execute the main function when the script loads
fetchAndDisplayMembers();