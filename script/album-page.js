const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let currentAudio = null;
const getAlbumData = async () => {
  const url = "https://striveschool-api.herokuapp.com/api/deezer/album/" + id;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0704e3122cmshbb05f15ef4f0571p1d5d41jsn006966e6ebea",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    createSongs(result);
    createAlbumHeader(result);

    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

/* const createHeader = async (obj) =>{
  const artistHeader = document.getElementById("artist-header");

  const title = obj.title
  const image = obj.artist.picture_medium
  const artistName = obj.artist.name


  artistHeader.innerHTML = ``
} */

const createAlbumHeader = async (obj) => {
  // Creazione immagine album

  const header = document.getElementById("album-header");

  const image = obj.cover_medium;

  header.innerHTML = `<div class="cover-image-track-container"> <img src="${image}" class="img-fluid " alt="cover image" /> </div>`;

  //Creazione Testo Album + Artista

  const artistHeader = document.getElementById("artist-header");
  const title = obj.title;
  const artistImage = obj.artist.picture_medium;
  const artistName = obj.artist.name;
  const releaseDate = obj.release_date;

  const releaseYear = releaseDate.split("-")[0];
  console.log(releaseYear);

  const tracks = obj.nb_tracks;
  const duration = obj.duration;

  const durationInMins = Math.floor(parseInt(duration) / 60);
  console.log(durationInMins);

  artistHeader.innerHTML = `<div class="text-right">
                            <p class="album">ALBUM</p>
                            <h1 class="album-h1 fw-bolder">${title}</h1>
                            <img src="${artistImage}" alt="" width="20" height="20" class="me-3" />
                            <p class="d-inline">
                              <span class="fw-bold">${artistName} </span
                              ><span class="fw-light">• ${releaseYear} • ${tracks} brani, </span
                              ><span class="fw-light">${durationInMins} min</span>
                            </p>
                          </div>`;

  console.log();
};

//Creazione Lista Canzoni

const createSongs = async (obj) => {
  const row = document.getElementById("row");

  const tracks_array = obj.tracks.data;

  for (let i = 0; i < tracks_array.length; i++) {
    const div = document.createElement("div");
    div.classList.add("song-info", "track-container");

    const artist = obj.artist.name;
    const song_name = obj.tracks.data[i].title;
    const rank = obj.tracks.data[i].rank;
    const track_num = i + 1;
    const duration = obj.tracks.data[i].duration;
    const durationInMins = Math.floor(parseInt(duration) / 60);
    const remainingSeconds = parseInt(duration) % 60;

    const preview = obj.tracks.data[i].preview;

    div.innerHTML = `
    <div id="song-text" class="col d-flex justify-content-between text-white-50 text-end fw-light p-3">
      <div class="col text-start">${track_num}</div>
      <div class="col d-flex"> 
      <div class="artistName me-1" >${artist} </div>
       - 
     <div class="titleTrack ms-1"> ${song_name}</div>
      </div>
      <div class="col">${rank}</div>
      <div class="col">${durationInMins}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}</div>
    </div>`;
    // const track = div.querySelector(".track-container");
    div.addEventListener("click", () => {
      playSong(div, preview);
    });
    // Cambia tracknum in button on hover

    div.addEventListener("mouseenter", () => {
      const trackNumDiv = div.querySelector(".col.text-start");
      trackNumDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="14" fill="white" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/></svg>`;
    });

    div.addEventListener("mouseleave", () => {
      const trackNumDiv = div.querySelector(".col.text-start");
      trackNumDiv.textContent = track_num;
    });

    row.appendChild(div);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  getAlbumData();
  playlistLeft();
});

const homeButton = document.getElementById("home-button");

homeButton.addEventListener("click", () => {
  window.location.href = "./index.html";
  console.log("ciao");
});

const backButton = document.getElementById("back");

backButton.addEventListener("click", () => {
  history.back();
});

const forwardButton = document.getElementById("forward");

forwardButton.addEventListener("click", () => {
  history.forward();
});

const updatePlayPauseIcon = () => {
  if (currentAudio && !currentAudio.paused) {
    playPauseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
  </svg>`;
  } else {
    playPauseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"></path>
  </svg>`;
  }
};
//funzione footer
const playSong = async function (clickedTrack, preview) {
  // in caso volessimo far funzionare la navbar, questi solo i valori da inserire
  if (currentAudio) {
    currentAudio.pause();
  }

  const trackData = clickedTrack.querySelector(".titleTrack").innerText;
  const artistName = document.querySelector(".artistName").innerText;

  const albumImg = document.querySelector(".cover-image-track-container").innerHTML;
  console.log(albumImg);

  //elementi del dom
  const titleSectionPlayer = document.getElementById("song-title");
  const artistSectionPlayer = document.getElementById("artist-name");
  const coverSectionPlayer = document.getElementById("cover-image-container");
  console.log(coverSectionPlayer);

  const previewUrl = preview;

  if (previewUrl) {
    const audio = new Audio(previewUrl);

    artistSectionPlayer.innerText = artistName;
    titleSectionPlayer.innerText = trackData;
    coverSectionPlayer.innerHTML = albumImg;

    currentAudio = audio;
    console.log(currentAudio);

    if (!audio.paused) {
      audio.pause();
      pausePlayback();
    } else {
      audio.play();
      startPlayback();
    }

    playPauseBtn.addEventListener("click", () => {
      if (!currentAudio.paused) {
        currentAudio.pause();
        pausePlayback();

        playPauseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"></path>
    </svg>`;
        console.log("ciaone");
      } else {
        currentAudio.play();
        startPlayback();
        playPauseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
    </svg>`;
      }
    });

    if (!audio.paused) {
      playPauseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
    </svg>`;
    } else {
      playPauseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"></path>
    </svg>`;
    }
  } else {
    console.log("sono stanco capo...");
  }
};

const playPauseBtn = document.getElementById("playBtnFooter");
