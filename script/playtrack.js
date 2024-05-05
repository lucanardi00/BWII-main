// const playSong = async function (clickedTrack, preview) {
//     // in caso volessimo far funzionare la navbar, questi solo i valori da inserire
//     const trackData = clickedTrack.querySelector(".titleTrack").innerText;
//     const artistData = document.querySelector(".artistName").innerText;

//     const previewUrl = preview;

//     if (previewUrl) {
//       const audio = new Audio(previewUrl);

//       audio.play();
//       playPauseBtn.addEventListener("click", () => {
//         console.log("porcoddio");
//         if(!audio.paused){
//           audio.pause();
//           playPauseBtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
//         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"></path>
//       </svg>`
//         }else{
//         audio.play();
//         playPauseBtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
//         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
//       </svg>`
//         }
//       });

//       if(!audio.paused){
//         playPauseBtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
//         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
//       </svg>`
//       }else{
//         playPauseBtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
//         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"></path>
//       </svg>`
//       }

//     } else {
//       console.log("sono stanco capo...");
//     }
//   };

//   const playPauseBtn = document.getElementById("playBtnFooter");
