async function loadDownloads() {
    // We remove the injected <style> block because you should link your style.css in the HTML <head> instead.
    
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
            // Create the main card container
            const card = document.createElement("div");
            card.className = "column"; 
            
            // This structure now matches your CSS selectors (.column img and .column p)
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

function bar() {
    const input = document.getElementById('search');
    if (!input) return;
    
    const searchValue = input.value.toLowerCase();
    const cards = document.getElementsByClassName('column');

    for (let i = 0; i < cards.length; i++) {
        // Updated search to look inside the <p> tag within .column
        const nameElement = cards[i].querySelector('p');
        if (nameElement) {
            const name = nameElement.innerText.toLowerCase();
            cards[i].style.display = name.includes(searchValue) ? "" : "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", loadDownloads);