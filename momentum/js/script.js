import playList from "./playList.js";


/* --------------! GREETING section !----------------- */

const getTimeOfDay = () => {
  const date = new Date();
  const hours = date.getHours();

  if (hours < 6) {
    return "night";
  } else if (hours >= 6 && hours < 12) {
    return "morning";
  } else if (hours >= 12 && hours < 18) {
    return "afternoon";
  } else if (hours >= 18 && hours < 24) {
    return "evening";
  } else {
    console.log(`Ночь: ${hours <= 6}`);
    console.log(`Утро: ${hours >= 6 && hours <= 12}`);
    console.log(`День: ${hours >= 12 && hours <= 18}`);
    console.log(`Вечер: ${hours >= 18 && hours <= 24}`);
    return "вневременной парадокс";
  }
};

const greeting = () => {
  const greetingText = document.querySelector(".greeting");
  greetingText.textContent = `Good ${getTimeOfDay()},`;
};

greeting();

const setLocalStorage = () => {
  const name = document.querySelector(".name");
  localStorage.setItem("name", name.value);

  const city = document.querySelector(".city");
  localStorage.setItem("city", city.value);

};

window.addEventListener("beforeunload", setLocalStorage);

const getLocalStorage = () => {
  let nameElement = document.querySelector(".name");
  if (localStorage.getItem("name")) {
    nameElement.value = localStorage.getItem("name");
  }

  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
};
window.addEventListener("load", getLocalStorage);



/* --------------! BACKGROUND IMAGE section !----------------- */

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let result = Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  return result;
};

const body = document.querySelector("body");
let randomNumber = getRandomNumber(1, 20);

const setBackground = () => {
  const timeOfDay = getTimeOfDay();
  const img = new Image();
  if (randomNumber < 10) {
    img.src = `https://raw.githubusercontent.com/DragonRomeo/momentum-backgrounds/main/${timeOfDay}/0${randomNumber}.webp`;
    img.onload = () => {
      body.style.backgroundImage = `url(${img.src})`;
    };
  } else {
    img.src = `https://raw.githubusercontent.com/DragonRomeo/momentum-backgrounds/main/${timeOfDay}/${randomNumber}.webp`;
    img.onload = () => {
      body.style.backgroundImage = `url(${img.src})`;
    };
  }
};
setBackground();

const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");

const getSlideNext = () => {
  if (randomNumber >= 20) {
    randomNumber = 1;
  } else {
    ++randomNumber;
  }
  setBackground();
};
slideNext.addEventListener("click", getSlideNext);

const getSlidePrev = () => {
  if (randomNumber <= 1) {
    randomNumber = 20;
  } else {
    --randomNumber;
  }
  setBackground();
};
slidePrev.addEventListener("click", getSlidePrev);

/*  -----------------! WEATHER WIDGET section !----------------- */

const city = document.querySelector(".city");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const weatherError = document.querySelector(".weather-error");

const getWeather = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=034a64f026427fc7336beceed37afd9a&units=metric`;
  const response = await fetch(url);
  const data = await response.json();

  

  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  weatherError.textContent = "";
  console.log(`я убрал!`)
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  console.log(`wtfWeather`)
};

const interceptError = () => {
  try {
    getWeather();
    if (!response.ok) {
      throw new Error("City input not corrected");
    }
  } catch (error) {
    weatherError.textContent = `Error! city not found for ${city.value}`;
    temperature.textContent = "";
    weatherDescription.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
    weatherIcon.className = "";
    console.log(`wtfInterceptError`)
  }
};
city.addEventListener("change", interceptError);

const setMinskDefault = () => {
  city.value = "Minsk";

  getWeather();
};
setMinskDefault();

/*  -----------------! QUOTE OF THE DAY WIDGET section !----------------- */

const BTN_CHANGE_QUOTE = document.querySelector(".change-quote");

const getQuotes = async () => {
  const quotes = '../momentum/assets/quotes/quotes.json'
  const response = await fetch(quotes);
  const data = await response.json();

  const quoteElement = document.querySelector(".quote");
  const author = document.querySelector(".author");
  let randomNumber = getRandomNumber(0, data.length);

  quoteElement.textContent = data[randomNumber].text;
  author.textContent = data[randomNumber].author;
};
getQuotes();

BTN_CHANGE_QUOTE.addEventListener("click", getQuotes);

const getConsoleMsg = () => {
  console.log(
    `Примечание: у некоторых цитат в jsone НЕТ автора и если автор не отображается, это не ошибка, обновите страницу или кликните на btn.`
  );
};
getConsoleMsg();

/*  -----------------! AUDIO-PLAYER section !----------------- */

const createSoundtrack = (playNum) => {
  const playListElement = document.querySelector(".play-list");
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.textContent = playList[playNum].title;
  playListElement.append(li);

};

const createPlayList = () => {
  for (let i = 0; i < playList.length; i++) {
    createSoundtrack(i);
  }

};
createPlayList();

const playItem = document.querySelectorAll(".play-item");


let playNum = 0;
let lastSoundtrack = playItem[playNum];


const highlightSoundtrack = () => {
  if (lastSoundtrack.classList.contains("item-active")) {
    lastSoundtrack.classList.remove("item-active");
  }
  lastSoundtrack = playItem[playNum];
  playItem[playNum].classList.add("item-active");
}


const BTN_PLAY = document.querySelector(".play");
const BTN_PLAY_NEXT = document.querySelector(".play-next");
const BTN_PLAY_PREV = document.querySelector(".play-prev");
const audio = new Audio();
let isPlay = false;


//Audio-player - main function
const playAudio = () => {
  if (!isPlay) {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.load();
    audio.play();
    isPlay = true;
    toggleAudioBtn();
    highlightSoundtrack();
    updateVolume();
    setNameSound();
    setDurationSound();
  } else {
    audio.pause();
    isPlay = false;
    toggleAudioBtn();
  }
};
BTN_PLAY.addEventListener("click", playAudio);

const toggleAudioBtn = () => {
  BTN_PLAY.classList.toggle("pause");
};

const togglePause = () => {
  if (isPlay) {
    BTN_PLAY.classList.remove("play");
    BTN_PLAY.classList.add("pause");
  } else {
    BTN_PLAY.classList.remove("pause");
    BTN_PLAY.classList.add("play");
  }
};

const playNext = () => {
  if (playNum < 3) {
    ++playNum;
  } else {
    playNum = 0;
  }
  isPlay = false;
  togglePause();
  playAudio();
};
BTN_PLAY_NEXT.addEventListener("click", playNext);

const playPrev = () => {
  if (playNum > 0) {
    --playNum;
  } else {
    playNum = 3;
  }
  isPlay = false;
  togglePause();
  playAudio();
};
BTN_PLAY_PREV.addEventListener("click", playPrev);

const autoPlay = () => {
  if (audio.currentTime >= audio.duration) {
    playNext();
  }
}

const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const volumeContainer = document.querySelector('.volume-container');
const volumeBar = document.querySelector('.volume');

// Progress bar
const updateProgress = (event) => {
  const { duration, currentTime } = event.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  setCurrentTimeSound();

}
audio.addEventListener('timeupdate', updateProgress);


// Set progress
function setProgress(event) {
  const width = this.clientWidth
  const clickX = event.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener('click', setProgress);

//Volume bar
function updateVolume() {
  const volume = audio.volume;
  const progressVolume = (volume) * 100;
  volumeBar.style.width = `${progressVolume}%`;
}


//set Volume
function setVolume(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const volume = (audio.volume);
  const volumeProgress = (volume) * 100;
  audio.volume = (clickX * 2) / 100;
  updateVolume();
}
volumeContainer.addEventListener('click', setVolume);


const BTN_VOLUME = document.querySelector('.volume-icon');
let isMute = false;


// Mute
const setMute = () => {
  let volumeProgressSave;
  let volume;
  if (!isMute) {
    volumeProgressSave = audio.volume;
    volume = 0;
    isMute = true;
  } else {
    volume = 0.8;
    isMute = false;
  }
  audio.volume = volume;
  updateVolume();
  BTN_VOLUME.classList.toggle('disabled')
}
BTN_VOLUME.addEventListener('click', setMute);


const soundName = document.querySelector('.sound-name');
const soundCurrentTime = document.querySelector('.sound-current-time');
const soundDuration = document.querySelector('.sound-duration');

const sliceName = (text) => {
  let sliced = text.slice(0, 20);
  console.log(`slice = ${text.slice(0, 10)}`);
  if (sliced.length < text.length) {
    sliced += '...';
  }
  return sliced;
}
// console.log(sliceName(`memories broken my cat in unspoken im really forgotton my naaame`))


const setNameSound = () => {
  soundName.textContent = '';
  soundName.textContent = sliceName(playList[playNum].title);
}

const setCurrentTimeSound = () => {
  soundCurrentTime.textContent = '';
  if (Math.ceil(audio.currentTime) < 10) {
    soundCurrentTime.textContent = `0:0${Math.ceil(audio.currentTime)} /`;
  } else if (Math.ceil(audio.currentTime) < 60 && Math.ceil(audio.currentTime) >= 10) {
    soundCurrentTime.textContent = `0:${Math.ceil(audio.currentTime)} /`;
  } else if (Math.ceil(audio.currentTime <= 69) && Math.ceil(audio.currentTime) > 59) {
    soundCurrentTime.textContent = `1:0${Math.ceil(audio.currentTime) - 60} /`;
  } else if (Math.ceil(audio.currentTime) > 69) {
    soundCurrentTime.textContent = `1:${Math.ceil(audio.currentTime) - 60} /`;
  }

  console.log(audio.currentTime);
}

const setDurationSound = () => {
  soundDuration.textContent = '';
  soundDuration.textContent = playList[playNum].duration;
}

/* --------------! TIME & DATE section !----------------- */

const showDate = () => {
  const dateElement = document.querySelector(".date");
  const date = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const currentDate = date.toLocaleDateString("en-US", options);

  dateElement.textContent = currentDate;
};

const time = document.querySelector(".time");

const showTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();

  time.textContent = currentTime;
  showDate();
  getTimeOfDay();
  autoPlay()
  setTimeout(showTime, 1000);
};
showTime();


