//funzione creazione pagina artista dinamica
let currentAudio = null;

const getArtist = async function (idArtist) {
  let url = "https://deezerdevs-deezer.p.rapidapi.com/artist/" + idArtist;
  const options = {
    method: "GET",
    body: JSON.stringify(),

    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "4042446f72msh40e75764792e694p1172cejsn347ee411ee71",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    let imgBg = document.querySelector(".backgroundArtistImage");
    imgBg.style.backgroundImage = `url(${result.picture_xl})`;
    let h1 = document.querySelector(".artistName");
    h1.innerText = result.name;
    let monthlyListners = document.querySelector(".monthlyListners");
    monthlyListners.innerText = result.nb_fan + " ascoltatori mensili";
  } catch (error) {
    console.error(error);
  }
};

const getTracks = async function (artistId) {
  let url = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistId + "/top?limit=10";
  const options = {
    method: "GET",
    body: JSON.stringify(),

    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "4042446f72msh40e75764792e694p1172cejsn347ee411ee71",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.data);
    let popularTracksContainer = document.querySelector(".popularTracks");
    for (let i = 0; i < result.data.length; i++) {
      console.log(result.data[i]);
      let track = document.createElement("div");
      track.classList.add("track", "row");

      let div = document.createElement("div");
      div.classList.add("col-6", "d-flex", "align-items-center");

      let trackNumber = document.createElement("p");
      trackNumber.classList.add("trackNumber");
      trackNumber.innerText = i + 1;

      let coverImgContainer = document.createElement("div");
      coverImgContainer.classList.add("cover-image-track-container");

      let img = document.createElement("img");
      img.classList.add("imgTrack");
      img.src = result.data[i].album.cover_small;

      let titleTrack = document.createElement("h5");
      titleTrack.classList.add("titleTrack", "m-0");
      titleTrack.innerText = result.data[i].title;

      let div2 = document.createElement("div");
      div2.classList.add("col-6", "d-flex", "justify-content-between");

      let rankTrack = document.createElement("p");
      rankTrack.classList.add("rankTrack");
      rankTrack.innerText = result.data[i].rank;

      let timeTrack = document.createElement("p");
      timeTrack.classList.add("timeTrack");

      const duration = result.data[i].duration;
      const min = Math.floor(duration / 60);
      const remainingSeconds = duration - min * 60;
      const formattedTime = min.toString().padStart(2, "0") + ":" + remainingSeconds.toString().padStart(2, "0");
      const previewUrl = result.data[i].preview;

      timeTrack.innerText = formattedTime;

      track.appendChild(div);
      div.appendChild(trackNumber);
      div.appendChild(coverImgContainer);
      coverImgContainer.appendChild(img);
      div.appendChild(titleTrack);
      div2.appendChild(rankTrack);
      div2.appendChild(timeTrack);
      track.appendChild(div2);

      track.addEventListener("click", function () {
        // Code to play the song will go here
        playSong(track, previewUrl); // Call the playSong function with the clicked track element
      });

      popularTracksContainer.appendChild(track);
    }
  } catch (error) {
    console.error(error);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  playlistLeft();
  let params = new URLSearchParams(document.location.search);
  let artistId = params.get("artistId");
  console.log(artistId);
  getArtist(artistId);
  getTracks(artistId);
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

const homeButton = document.getElementById("home-button");

homeButton.addEventListener("click", () => {
  window.location.href = "./index.html";
});
