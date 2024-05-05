// const playBtnFooter = document.getElementById("playBtnFooter");
// let isPlaying = false;
// let progressInterval;
// let timerInterval;
// let seconds = 0;

// playBtnFooter.addEventListener("click", () => {
//   isPlaying = !isPlaying;
//   if (isPlaying) {
//     startPlayback();
//   } else {
//     pausePlayback();
//   }
// });

// const startPlayback = () => {
//   progressInterval = setInterval(updateProgressBar, 1000);
//   startTimer();
// };

// const pausePlayback = () => {
//   clearInterval(progressInterval);
//   clearInterval(timerInterval);
// };

// const updateProgressBar = () => {
//   const progressBar = document.getElementsByClassName("progress-bar")[0];
//   const computedStyle = getComputedStyle(progressBar);
//   let width = parseFloat(computedStyle.getPropertyValue("--width")) || 0;
//   progressBar.style.setProperty("--width", width + 3.4);
//   if (width >= 30) {
//     clearInterval(progressInterval);
//   }
// };

// const startTimer = () => {
//   timerInterval = setInterval(() => {
//     seconds++;
//     document.getElementById("songTimer").textContent = formatTime(seconds);
//     if (seconds >= 30) {
//       clearInterval(timerInterval);
//     }
//   }, 1000);
// };

// const formatTime = (seconds) => {
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = seconds % 60;
//   const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
//   return `${minutes}:${formattedSeconds}`;
// };

// const slideValue = document.querySelector("span");
// const inputSlider = document.querySelector("input");

// inputSlider.addEventListener("input", () => {
//   let value = inputSlider.value;
//   slideValue.textContent = value;
//   slideValue.style.left = value / 2 + "%";
//   slideValue.classList.add("show");
// });

// inputSlider.addEventListener("blur", () => {
//   slideValue.classList.remove("show");
// });

const playBtnFooter = document.getElementById("playBtnFooter");
let isPlaying = false;
let progressInterval;
let timerInterval;
let seconds = 0;

// playBtnFooter.addEventListener("click", () => {
//   isPlaying = !isPlaying;
//   if (isPlaying) {
//     startPlayback();
//   } else {
//     pausePlayback();
//   }
// });

const startPlayback = () => {
  progressInterval = setInterval(updateProgressBar, 1000);
  startTimer();
};

const pausePlayback = () => {
  clearInterval(progressInterval);
  clearInterval(timerInterval);
};

const updateProgressBar = () => {
  const progressBar = document.getElementsByClassName("progress-bar")[0];
  const computedStyle = getComputedStyle(progressBar);
  let width = parseFloat(computedStyle.getPropertyValue("--width")) || 0;
  progressBar.style.setProperty("--width", width + 3.4);
  if (width >= 30) {
    clearInterval(progressInterval);
  }
};

const startTimer = () => {
  timerInterval = setInterval(() => {
    seconds++;
    document.getElementById("songTimer").textContent = formatTime(seconds);
    if (seconds >= 30) {
      clearInterval(timerInterval);
    }
  }, 1000);
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${minutes}:${formattedSeconds}`;
};

const slideValue = document.querySelector("span");
const inputSlider = document.querySelector("input");

inputSlider.addEventListener("input", () => {
  let value = inputSlider.value;
  slideValue.textContent = value;
  slideValue.style.left = value / 2 + "%";
  slideValue.classList.add("show");
});

inputSlider.addEventListener("blur", () => {
  slideValue.classList.remove("show");
});
