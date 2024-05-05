//CHIARA = playlist left section
const playlistLeft = async function () {
  let arrayPlaylistIds = ["13", "12", "14", "5", "25", "24", "28", "37", "46", "13"];
  const containerPlaylistLeft = document.querySelector(".playlist-container");
  for (let i = 0; i < arrayPlaylistIds.length; i++) {
    let url = "https://deezerdevs-deezer.p.rapidapi.com/playlist/" + arrayPlaylistIds[i];
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
      let div = document.createElement("div");
      div.classList.add("d-flex", "align-items-center", "mb-3");

      let img = document.createElement("img");
      img.classList.add("imgPlaylistLeft");
      img.src = result.picture_small;

      let p = document.createElement("p");
      p.classList.add("mb-0");
      p.innerText = result.title;

      div.appendChild(img);
      div.appendChild(p);
      containerPlaylistLeft.appendChild(div);
    } catch (error) {
      console.error(error);
    }
  }
};

const closeRightBtn = document.querySelector("#closeRightSection");
closeRightBtn.addEventListener("click", function () {
  const rightSection = document.querySelector(".right-section");
  rightSection.classList.add("d-lg-none");
  rightSection.classList.remove("d-lg-block");

  const mainSection = document.querySelector(".main-section");
  const leftSection = document.querySelector(".left-section");

  if (leftSection.classList.contains("col-1") && mainSection.classList.contains("col-md-9")) {
    mainSection.classList.remove("col-md-9");
    mainSection.classList.add("col-md-11");
  } else {
    mainSection.classList.remove("col-lg-7");
    mainSection.classList.add("col-lg-9");
  }
});

const closeLeftBtn = document.querySelector("#closeLeftSection");
closeLeftBtn.addEventListener("click", function () {
  const leftSection = document.querySelector(".left-section");
  const mainSection = document.querySelector(".main-section");
  const rightSection = document.querySelector(".right-section");

  if (!rightSection.classList.contains("d-lg-block")) {
    if (leftSection.classList.contains("col-3") && mainSection.classList.contains("col-md-9")) {
      leftSection.classList.remove("col-3");
      leftSection.classList.add("col-1");
      mainSection.classList.remove("col-md-9");
      mainSection.classList.add("col-lg-11");

      const allParagraphs = document.querySelectorAll(".left-section p");
      console.debug("cavallo");
      for (let i = 0; i < allParagraphs.length; i++) {
        allParagraphs[i].classList.add("d-none");
      }
      leftSection.classList.add("align-items-center");
    } else {
      console.log("capra");
      leftSection.classList.add("col-3");
      leftSection.classList.remove("col-1");
      mainSection.classList.add("col-md-9");
      mainSection.classList.remove("col-md-11");

      mainSection.classList.remove("col-lg-11");
      const allParagraphs = document.querySelectorAll(".left-section p");
      for (let i = 0; i < allParagraphs.length; i++) {
        allParagraphs[i].classList.remove("d-none");
      }
      leftSection.classList.remove("align-items-center");
    }
  } else {
    if (leftSection.classList.contains("col-3") && mainSection.classList.contains("col-lg-7")) {
      leftSection.classList.remove("col-3");
      leftSection.classList.add("col-1");
      mainSection.classList.remove("col-lg-7");
      mainSection.classList.add("col-lg-9");
      const allParagraphs = document.querySelectorAll(".left-section p");
      for (let i = 0; i < allParagraphs.length; i++) {
        allParagraphs[i].classList.add("d-none");
      }
      leftSection.classList.add("align-items-center");
      console.log(rightSection.classList);
    } else {
      leftSection.classList.add("col-3");
      leftSection.classList.remove("col-1");
      mainSection.classList.add("col-lg-7");
      mainSection.classList.remove("col-lg-9");
      const allParagraphs = document.querySelectorAll(".left-section p");
      for (let i = 0; i < allParagraphs.length; i++) {
        allParagraphs[i].classList.remove("d-none");
      }
      leftSection.classList.remove("align-items-center");
    }
  }
});

// const homeButton = document.getElementById('home-button')

// const redirectHome = ()=>{

//   homeButton.addEventListener("click", ()=>{
//   window.location.href = "./index.html"
//   console.log("ciao")
//   })

// }
