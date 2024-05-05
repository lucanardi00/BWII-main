const form = document.querySelector("form");
const inputField = document.getElementById("search-value");
const top5SongsContainer = document.getElementById("top-5-songs");
const artistCardContainer = document.querySelector(".artist-container");
const topResultsAlbums = document.getElementById("top-results-albums");

const handleSubmit = async (event) => {
  event.preventDefault();
  top5SongsContainer.innerHTML = "";
  artistCardContainer.innerHTML = "";
  topResultsAlbums.innerHTML = "";

  const searchValue = inputField.value;

  if (!searchValue) {
    alert("Please enter a search term");
    return;
  }

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0704e3122cmshbb05f15ef4f0571p1d5d41jsn006966e6ebea",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(newUrl(searchValue), options);
    const result = await response.json();
    createTop5SongsResult(result);
    createArtistCard(result);
    createSearchAlbum(result);
    // redirectToAlbumPage(createSearchAlbum);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

const newUrl = (searchValue) => {
  const endpoint = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
  return `${endpoint}${searchValue}`;
};

form.addEventListener("submit", handleSubmit);

const createTop5SongsResult = async (obj) => {
  const ul = document.createElement("ul");
  ul.classList.add("list-group");
  top5SongsContainer.appendChild(ul);

  for (let i = 0; i < 5; i++) {
    const artist = obj.data[i].artist.name;
    const song_name = obj.data[i].title;
    const img = obj.data[i].album.cover_medium;
    const duration = obj.data[i].duration;
    const minutes = Math.floor(duration / 60);
    const remainingSeconds = duration - minutes * 60;
    const formattedTime = `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;

    console.log(artist, song_name, img, duration);

    const li = document.createElement("li");
    li.classList.add("list-group-item", "text-white");
    ul.appendChild(li);

    const div = document.createElement("div");
    div.classList.add("d-flex", "align-items-center", "justify-content-between");
    li.appendChild(div);

    const innerFlexDiv = document.createElement("div");
    innerFlexDiv.classList.add("d-flex");
    div.appendChild(innerFlexDiv);

    const image = document.createElement("img");
    image.classList.add("imgPlaylistLeft");
    image.src = `${img}`;
    innerFlexDiv.appendChild(image);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("d-flex", "flex-column");
    innerFlexDiv.appendChild(infoDiv);

    const songNameParagraph = document.createElement("p");
    songNameParagraph.classList.add("mb-0");
    songNameParagraph.textContent = `${song_name}`;
    infoDiv.appendChild(songNameParagraph);

    const artistParagraph = document.createElement("p");
    artistParagraph.classList.add("mb-0");
    artistParagraph.textContent = `${artist}`;
    infoDiv.appendChild(artistParagraph);

    const durationParagraph = document.createElement("p");
    durationParagraph.classList.add("mb-0");
    durationParagraph.textContent = `${formattedTime}`;
    div.appendChild(durationParagraph);
  }
};

const createSearchAlbum = async (obj) => {
  for (let i = 0; i < 12; i++) {
    const albumTitle = obj.data[i].album.title;
    const albumCover = obj.data[i].album.cover_medium;
    const artistName = obj.data[i].artist.name;
    const id = obj.data[i].album.id;
    console.log(id);

    const div = document.createElement("div");
    div.classList.add("col-6", "col-sm-4", "col-md-3", "col-xxl-2");
    topResultsAlbums.appendChild(div);

    div.innerHTML = `
      <div class="card card-container playlist-card-container">
      <div class='d-flex flex-column align-items-center'>
      <img src="${albumCover}" class="card-img-top m-2 " alt="playlist cover" />
      </div>
      <div class="card-body ms-2 me-2 mb-2 d-block flex-column align-items-start">
        <h5 class="card-title text-white">${albumTitle}</h5>
        <p class="card-text color-text">${artistName}</p>
      </div>
    </div>
      `;

    const albumCard = div.querySelector(".playlist-card-container");

    albumCard.addEventListener("click", () => {
      window.location.href = "./album-page.html?id=" + id;
    });
  }
};

const createArtistCard = async (obj) => {
  const name = obj.data[1].artist.name;
  const picture = obj.data[1].artist.picture_medium;
  const type = obj.data[1].artist.type;
  const id = obj.data[1].artist.id;

  artistCardContainer.innerHTML = `<div class="d-flex justify-content-center mt-2 mb-2 artist-album-card-search-page">
    <img src="${picture}" class="card-img-top" alt="${name}'s picture" />
  </div>
  <div class="card-body text-white p-2 d-flex flex-column justify-content-center">
    <h5 class="card-title">${name}</h5>
    <p class="card-text">
    ${type}
    </p>
  </div>`;

  const artistPicCard = document.querySelector(".artist-album-card-search-page");

  artistPicCard.addEventListener("click", () => {
    window.location.href = "artist-page.html?id=" + id;
  });
};

window.addEventListener("DOMContentLoaded", () => {
  playlistLeft();
});

const homeButton = document.getElementById("home-button");

homeButton.addEventListener("click", () => {
  window.location.href = "./index.html";
  console.log("ciao");
});
