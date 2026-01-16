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
    "name": "1 Hour of clean tiktoks Number 1",
    "link": "https://www.youtube.com/embed/BQ9iEbKmhbg?si=URxyBmVPwIlaRSxV", 
    "image": "/assets/media/videos/thumbnail/tiktok1hour.png",
    "categories": ["all", "leaks"]
  },
  {
    "name": "1 Hour of clean tiktoks Number 2",
    "link": "https://www.youtube.com/embed/zesmT3C_qN4?si=z4OEdAomRI8keNCU", 
    "image": "/assets/media/videos/thumbnail/tiktok1hour.png",
    "categories": ["all", "leaks"]
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
  container.innerHTML = ""; 

  videoList.forEach(video => {
    const matchesFilter = filter === "all" || video.categories.includes(filter);
    const matchesQuery = video.name.toLowerCase().includes(query.toLowerCase());

    if (matchesFilter && matchesQuery) {
      const card = document.createElement("div");
      card.className = "container-card"; 
      
      // Create a unique ID for the wrapper to target it on click
      const videoId = `wrapper-${video.name.replace(/\s+/g, '')}`;

      card.innerHTML = `
        <div class="wrapper" id="${videoId}">
            <div class="play-icon-overlay"><i class="fas fa-play"></i></div>
            <img src="${video.image}" alt="${video.name}">
        </div>
        <div class="video-info">
            <div class="video-title">${video.name}</div>
            <div class="video-category">${video.categories[1] || 'SYSTEM_FILE'}</div>
        </div>
      `;

      card.onclick = () => {
        const wrapper = document.getElementById(videoId);
        
        // STOP: If the video or iframe is already inside, don't load it again
        if (wrapper.querySelector('iframe') || wrapper.querySelector('video')) {
            return; 
        }

        // Clear the thumbnail and play icon
        wrapper.innerHTML = ""; 

        // Load the actual media
        if (video.link.includes("youtube.com") || video.link.includes("embed")) {
          // YouTube Embed
          wrapper.innerHTML = `<iframe src="${video.link}${video.link.includes('?') ? '&' : '?'}autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        } else {
          // Local MP4
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