// 1. Path to the JSON data file
const jsonUrl = 'data/members.json';

// 2. DOM Elements selection
const container = document.querySelector('#directory-container');
const gridButton = document.querySelector('#grid-btn');
const listButton = document.querySelector('#list-btn');
const menuButton = document.querySelector('#menu-button');
const navMenu = document.querySelector('#nav-menu');

// 3. Asynchronous function to fetch JSON data using async/await
async function fetchMembers() {
    try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Failed to load chamber members data:", error);
    }
}

// 4. Function to dynamically render the members layout
function displayMembers(members) {
    // Clear any existing content inside the container
    container.innerHTML = "";

    members.forEach(member => {
        const section = document.createElement('section');
        
        // Map numeric membership levels to text strings (1=Member, 2=Silver, 3=Gold)
        let membershipText = "Member";
        if (member.membership === 2) membershipText = "Silver";
        if (member.membership === 3) membershipText = "Gold";

        // Check if container currently uses list layout to omit images accordingly
        if (container.classList.contains('list-layout')) {
            section.innerHTML = `
                <h3>${member.name}</h3>
                <p class="address">📍 ${member.address}</p>
                <p class="phone">📞 ${member.phone}</p>
                <p class="url"><a href="${member.website}" target="_blank">${member.website}</a></p>
                <p class="level">⭐ ${membershipText} Member</p>
            `;
        } else {
            section.innerHTML = `
                <img src="${member.image}" alt="${member.name} Logo" loading="lazy" width="300" height="200">
                <h3>${member.name}</h3>
                <p class="address">📍 ${member.address}</p>
                <p class="phone">📞 ${member.phone}</p>
                <p class="url"><a href="${member.website}" target="_blank">Visit Website</a></p>
                <p class="level">⭐ ${membershipText} Member</p>
            `;
        }
        container.appendChild(section);
    });
}

// 5. Event Listeners for Grid and List View Toggles
gridButton.addEventListener('click', () => {
    if (!container.classList.contains('grid-layout')) {
        container.classList.add('grid-layout');
        container.classList.remove('list-layout');
        gridButton.classList.add('active');
        listButton.classList.remove('active');
        fetchMembers(); // Re-render elements to bring back layout cards with images
    }
});

listButton.addEventListener('click', () => {
    if (!container.classList.contains('list-layout')) {
        container.classList.add('list-layout');
        container.classList.remove('grid-layout');
        listButton.classList.add('active');
        gridButton.classList.remove('active');
        fetchMembers(); // Re-render elements to clean up structures and remove images
    }
});

// 6. Hamburger Menu Interaction for Mobile Layout Responsive Adaptation
menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// 7. Dynamic Footer Metadata Insertion (Copyright year and last modified metric)
document.querySelector('#currentYear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Initialize application execution
fetchMembers();