// THE VIDEO DATABASE
const videoList = [
  {
    "name": "Half-Life Rap",
    "link": "https://www.youtube.com/embed/37cZaQne8IM?si=xEVAqA2XBAVy0m6G", 
    "image": "/assets/media/videos/thumbnail/halfliferap.jpg",
    "categories": ["all", "leaks"]
  },
  {
    "name": "ctOS_Intro",
    "link": "/assets/media/videos/ctosintro.mp4",
    "image": "/assets/media/videos/thumbnail/ctosintro.jpg",
    "categories": ["all", "cinematic"]
  },
  {
    "name": "Watch Dogs 2 Rap",
    "link": "https://www.youtube.com/embed/o_hvTGcbbpM?si=imtB43OvzWSiiLiG",
    "image": "/assets/media/videos/thumbnail/videowatchdograp.webp",
    "categories": ["all", "cinematic"]
  }
];

function renderVideos(filter = "all", query = "") {
  const container = document.getElementById("video-container");
  if (!container) return;
  container.innerHTML = ""; // Clear grid for filtering/searching

  videoList.forEach(video => {
    const matchesFilter = filter === "all" || video.categories.includes(filter);
    const matchesQuery = video.name.toLowerCase().includes(query.toLowerCase());

    if (matchesFilter && matchesQuery) {
      const card = document.createElement("div");
      // Using 'column' and 'container-card' to match your existing CSS
      card.className = "column"; 
      card.innerHTML = `
        <div class="container-card">
          <div class="wrapper" id="wrapper-${video.name.replace(/\s+/g, '')}">
            <img src="${video.image}" alt="${video.name}" loading="lazy" />
            <div class="play-icon-overlay"><i class="fa-solid fa-play"></i></div>
          </div>
          <div class="container-info">
            <p>${video.name}</p>
          </div>
        </div>
      `;

      // ONLY LOAD THE VIDEO ON CLICK
      card.onclick = () => {
        const wrapper = document.getElementById(`wrapper-${video.name.replace(/\s+/g, '')}`);
        if (video.link.includes("youtube.com") || video.link.includes("embed")) {
          wrapper.innerHTML = `<iframe src="${video.link}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        } else {
          wrapper.innerHTML = `<video controls autoplay><source src="${video.link}" type="video/mp4">Your browser does not support the video tag.</video>`;
        }
      };
      container.appendChild(card);
    }
  });
}

// SEARCH AND CATEGORY FILTERING
function filterVideos() {
  const query = document.getElementById("search").value;
  const cat = document.getElementById("category").value;
  renderVideos(cat, query);
}

// Initial Load
document.addEventListener("DOMContentLoaded", () => renderVideos());