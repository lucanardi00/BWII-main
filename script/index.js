// VASCO JS

const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};
const getPlaylist = async () => {
  const workingPlaylists = [
    "13",
    "12",
    "14",
    "5",
    "25",
    "24",
    "28",
    "37",
    "46",
    "13",
    "76",
    "465",
    "271",
    "483",
    "45",
    "335",
    "68",
    "58",
    "36",
    "326",
    "310",
    "241",
    "430",
  ];

  const id = getRandomElement(workingPlaylists);

  console.log(id);
  // const id = 76;

  const url = "https://deezerdevs-deezer.p.rapidapi.com/playlist/" + id;

  const options = {
    method: "GET",
    body: JSON.stringify(),

    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "0704e3122cmshbb05f15ef4f0571p1d5d41jsn006966e6ebea",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.debug(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

console.log(getPlaylist());

const createNewCard = async (playlist) => {
  // if (!playlist || !playlist.title || !playlist.picture_medium || !playlist.creator || !playlist.creator.name) {
  //   console.log("Error: Invalid playlist data");
  //   return;
  // }

  // const sequence = "https://e-cdns-images.dzcdn.net/images/cover//250x250-000000-80-0-0.jpg";
  // const regex = new RegExp(sequence);

  // if (regex.test(playlist.picture_medium)) {
  //   console.log(playlist);

  //   console.log("NO PICTURE");
  //   return;
  // }

  console.log(playlist);
  const playlistName = playlist.title;
  const playlistPicture = playlist.picture_medium;
  const playlistCreator = playlist.creator.name;
  const playlistEmptyValue = playlist.message;
  const numberTracks = playlist.nb_tracks;

  if (playlistEmptyValue != "no data") {
    const row = document.getElementById("row");

    const div = document.createElement("div");
    div.classList.add("col-12", "col-sm-4", "col-md-3", "col-xxl-2");
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.innerHTML = `
      <div class="d-none d-sm-block card card-container playlist-card-container">
      <div class='d-flex flex-column align-items-center'>
      <img src="${playlistPicture}" class="card-img-top m-2 " alt="playlist cover" />
      </div>
      <div class="card-body ms-2 me-2 mb-2 d-block flex-column align-items-start">
        <h5 class="card-title text-white">${playlistName}</h5>
        <p class="card-text color-text">${playlistCreator}</p>
      </div>
    </div>

    <div class="d-sm-none card mb-3 mx-1 my-5 bg-gradient">
                <div class="row g-0">
                  <div class="col-1 d-flex">
                    <img src="${playlistPicture}" class="p-2" width="150" alt="..." />
                    <div class="m-2 d-flex flex-column flex-wrap">
                      <h5 class="card-title">${playlistName}</h5>
                      <p style="width: 250px" class="card-text d-flex flex-wrap">
                      ${playlistCreator}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <div class="d-flex justify-content-between p-2">
                        <div>
                          <button class="border-0 bg-transparent">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="#1ed760"
                              class="bi bi-heart-fill"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                              />
                            </svg>
                          </button>
                          <button class="border-0 bg-transparent">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              class="bi bi-three-dots"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"
                              />
                            </svg>
                          </button>
                        </div>
                        <div class="d-flex">
                          <p class="mb-0">${numberTracks} tracks</p>
                          <button class="border-0 bg-transparent">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="currentColor"
                              class="bi bi-play-circle"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                              <path
                                d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
      `;

    row.appendChild(div);
    // } else {
    //   getPlaylist();
    //   createNewCard();
    // }
  }
};

const generateHomepagePlaylistCards = async () => {
  let cardElementsOnPage = document.querySelectorAll(".playlist-card-container");

  for (; cardElementsOnPage.length < 12; ) {
    const playlist = await getPlaylist();
    if (playlist) {
      createNewCard(playlist);
      cardElementsOnPage = document.querySelectorAll(".playlist-card-container");
    } else {
      console.log("Failed to fetch playlist data.");
      break;
    }
  }
};

const init = async () => {
  generateHomepagePlaylistCards();
  playlistLeft();
  getArtists();
  getRandomAlbum();
  getAlbumZone();
};

window.addEventListener("DOMContentLoaded", () => {
  init();
});

const getArtists = async function () {
  const artistIds2 = ["13", "4937383", "1288678", "1155242"];
  for (let i = 0; i < artistIds2.length; i++) {
    const url = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistIds2[i];

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

      const artistsZone = document.querySelector("#artistsZone");

      const div = document.createElement("div");
      div.classList.add("artistCard", "col-6", "col-md-3");
      div.addEventListener("click", function () {
        window.location.href = "artist-page.html?artistId=" + result.id;
      });

      const circleImg = document.createElement("img");
      circleImg.classList.add("artistCircle");
      circleImg.src = result.picture_medium;

      const artistName = document.createElement("p");
      artistName.classList.add("artistName");
      artistName.innerText = result.name;

      const artistType = document.createElement("p");
      artistType.classList.add("artistType");
      artistType.innerText = result.type;

      div.appendChild(circleImg);
      div.appendChild(artistName);
      div.appendChild(artistType);
      artistsZone.appendChild(div);
    } catch (error) {
      console.error(error);
    }
  }
};

const getRandomAlbum = async () => {
  const albumIds = ["309377597", "262561252", "211834212", "173334792", "647112112", "74115062", "104188", "86773062"];

  let randomNumber = Math.floor(Math.random() * 3) + 1;

  const url = "https://striveschool-api.herokuapp.com/api/deezer/album/" + albumIds[randomNumber];

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

    const albumName = document.querySelector("#albumName");
    albumName.innerText = result.title;
    const albumArtistName = document.querySelector("#albumArtistName");
    albumArtistName.innerText = result.artist.name;
    const albumImg = document.querySelector("#albumImg");
    albumImg.src = result.cover_medium;

    let vaiAllAlbum = document.querySelector("#albumBtnGreen");
    vaiAllAlbum.addEventListener("click", function () {
      window.location.href = "album-page.html?id=" + result.id;
    });
  } catch (error) {
    console.error(error);
  }
};

const getAlbumZone = async () => {
  const albumForAlbumZone = ["211834212", "173334792", "309377597", "74115062", "104188", "86773062"];
  for (let i = 0; i < albumForAlbumZone.length; i++) {
    const url = "https://striveschool-api.herokuapp.com/api/deezer/album/" + albumForAlbumZone[i];
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
      console.log(result);

      const containerAlbumZone = document.querySelector("#containerAlbumZone");

      let cardDiv = document.createElement("div");
      cardDiv.classList.add("mb-3", "col-6", "col-md-4", "p-1");

      let card = document.createElement("div");
      card.classList.add("card");
      card.style.backgroundColor = "#9e9d9d54";
      card.style.cursor = "pointer";
      card.addEventListener("click", function () {
        window.location.href = "album-page.html?id=" + result.id;
      });

      let row = document.createElement("div");
      row.classList.add("row", "g-0");

      let colImg = document.createElement("div");
      colImg.classList.add("col-2");

      let img = document.createElement("img");
      img.classList.add("img-fluid", "rounded-start");
      img.src = result.cover_medium;

      let colText = document.createElement("div");
      colText.classList.add("col-10", "d-flex", "align-items-center");

      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      let cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title", "text-white", "mb-0");
      cardTitle.style.marginLeft = "8px";
      cardTitle.innerText = result.title;

      colImg.appendChild(img);
      row.appendChild(colImg);
      cardBody.appendChild(cardTitle);
      colText.appendChild(cardBody);
      row.appendChild(colText);
      card.appendChild(row);
      cardDiv.appendChild(card);
      containerAlbumZone.appendChild(cardDiv);
    } catch (error) {
      console.error(error);
    }
  }
};

let searchIcon = document.querySelector("#searchIcon");
searchIcon.addEventListener("click", function () {
  window.location.href = "search.html";
});

const homeButton = document.getElementById("home-button");

homeButton.addEventListener("click", () => {
  window.location.href = "./index.html";
  console.log("ciao");
});
