async function loadDownloads() {
    try {
        const response = await fetch('/assets/json/f.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data = await response.json();
        const container = document.querySelector(".apps");
        
        if (!container) {
            console.error('Apps container not found');
            return;
        }
        
        container.innerHTML = "";

        data.forEach(item => {
            const card = document.createElement("div");
            card.className = "column";
            
            // Store categories as a data attribute for filtering
            card.setAttribute('data-categories', item.categories.join(','));
            
            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22145%22 height=%22145%22%3E%3Crect fill=%22%23ccc%22 width=%22145%22 height=%22145%22/%3E%3C/svg%3E'">
                <p>${item.name}</p>
            `;

            card.onclick = () => {
                const link = document.createElement("a");
                link.href = item.file;
                link.download = item.name || item.file.split('/').pop();
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading downloads:', error);
        const container = document.querySelector(".apps");
        if (container) {
            container.innerHTML = '<p style="color: white; padding: 20px;">Failed to load downloads.</p>';
        }
    }
}

function filterFiles() {
    const searchInput = document.getElementById('search');
    const categorySelect = document.getElementById('category');
    
    if (!searchInput || !categorySelect) return;
    
    const searchValue = searchInput.value.toLowerCase();
    const categoryValue = categorySelect.value.toLowerCase();
    const cards = document.getElementsByClassName('column');

    for (let i = 0; i < cards.length; i++) {
        const nameElement = cards[i].querySelector('p');
        const categories = cards[i].getAttribute('data-categories') || '';
        
        let nameMatch = true;
        let categoryMatch = true;
        
        // Check name match
        if (nameElement) {
            const name = nameElement.innerText.toLowerCase();
            nameMatch = name.includes(searchValue);
        }
        
        // Check category match
        if (categoryValue !== 'all') {
            categoryMatch = categories.includes(categoryValue);
        }
        
        // Show card only if both filters match
        cards[i].style.display = (nameMatch && categoryMatch) ? "" : "none";
    }
}

// Keep the old bar() function name for compatibility with onkeyup in HTML
function bar() {
    filterFiles();
}

document.addEventListener("DOMContentLoaded", loadDownloads);