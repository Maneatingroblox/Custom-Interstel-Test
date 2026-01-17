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

function bar() {
    let input = document.getElementById('search').value.toLowerCase();
    let cards = document.getElementsByClassName('column');

    for (let i = 0; i < cards.length; i++) {
        let nameElement = cards[i].querySelector('.container-info p');
        if (nameElement) {
            let name = nameElement.innerText.toLowerCase();
            if (name.includes(input)) {
                cards[i].style.display = "";
            } else {
                cards[i].style.display = "none";
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", loadDownloads);