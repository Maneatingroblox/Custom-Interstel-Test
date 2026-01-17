async function loadDownloads() {
    // Add styles programmatically
    const style = document.createElement('style');
    style.textContent = `
        .wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .wrapper {
            aspect-ratio: 1 / 1;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Rest of your code...
    const response = await fetch('/assets/json/f.json');
    const data = await response.json();
    const container = document.querySelector(".apps");
    
    if (!container) return;
    container.innerHTML = "";

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "column"; 
        card.innerHTML = `
            <div class="container-card">
                <div class="wrapper">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="container-info">
                    <p>${item.name}</p>
                </div>
            </div>
        `;

        // The Download Trigger
        card.onclick = () => {
            const link = document.createElement("a");
            link.href = item.file;
            link.download = item.file;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        container.appendChild(card);
    });
}

// Search Filter Logic
function bar() {
    let input = document.getElementById('search').value.toLowerCase();
    let cards = document.getElementsByClassName('column');

    for (let i = 0; i < cards.length; i++) {
        let name = cards[i].querySelector('.container-info p').innerText.toLowerCase();
        if (name.includes(input)) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", loadDownloads);