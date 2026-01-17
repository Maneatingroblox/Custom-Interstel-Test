async function loadDownloads() {
    const style = document.createElement('style');
    style.textContent = `
        .apps {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 20px;
            padding: 20px;
        }
        .column {
            width: 100%;
        }
        .container-card {
            background: #2a2a2a;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .container-card:hover {
            transform: scale(1.05);
        }
        .wrapper {
            width: 120px;
            height: 120px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 10px;
            background: white;
            border-radius: 6px;
        }
        .wrapper img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
        .container-info p {
            margin: 0;
            color: white;
            font-size: 14px;
            word-wrap: break-word;
        }
    `;
    document.head.appendChild(style);

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
            card.innerHTML = `
                <div class="container-card">
                    <div class="wrapper">
                        <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect fill=%22%23ccc%22 width=%22120%22 height=%22120%22/%3E%3C/svg%3E'">
                    </div>
                    <div class="container-info">
                        <p>${item.name}</p>
                    </div>
                </div>
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
            container.innerHTML = '<p style="color: white; padding: 20px;">Failed to load downloads. Please try again later.</p>';
        }
    }
}

function bar() {
    const input = document.getElementById('search');
    if (!input) {
        console.error('Search input not found');
        return;
    }
    
    const searchValue = input.value.toLowerCase();
    const cards = document.getElementsByClassName('column');

    for (let i = 0; i < cards.length; i++) {
        const nameElement = cards[i].querySelector('.container-info p');
        if (nameElement) {
            const name = nameElement.innerText.toLowerCase();
            cards[i].style.display = name.includes(searchValue) ? "" : "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", loadDownloads);