export const videoPlayerInit = () => {

  const videoPlayer = document.querySelector('.video-player');
  const videoButtonPlay = document.querySelector('.video-button__play');
  const videoButtonStop = document.querySelector('.video-button__stop');
  const videoProgress = document.querySelector('.video-progress');
  const videoTimePassed = document.querySelector('.video-time__passed');
  const videoTimeTotal = document.querySelector('.video-time__total');
  const videoVolume = document.querySelector('.video-volume');
  const videoFullscreen = document.querySelector('.video-fullscreen');

  const volumeDown = document.querySelector('.volume-down');
  const volumeUp = document.querySelector('.volume-up');

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-play');
    } else {
      videoButtonPlay.classList.add('fa-pause');
      videoButtonPlay.classList.remove('fa-play');
    }
  } // изменение иконки кнопки play на pause и наоборот

  const togglePlay = event => {
    event.preventDefault();
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  }; // изменение состояния видео 

  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  } // остановка проигрывания видео и сброс его времени

  const addZero = n => n < 10 ? '0' + n : n; // добавление нуля для корректного отображения проигранного времени видео

  const changeValue = () => {
    const valueVolume = videoVolume.value;
    videoPlayer.volume = valueVolume / 100;
  }; // изменение громкости

  videoPlayer.addEventListener('click', togglePlay);
  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);
  videoButtonPlay.addEventListener('click', togglePlay);
  videoButtonStop.addEventListener('click', stopPlay);

  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100; // определение положения бегунка 

    let minutePassed = Math.floor(currentTime / 60); // определение проигранных минут
    let secondsPassed = Math.floor(currentTime % 60); // определеник проигранных секунд

    let minuteTotal = Math.floor(duration / 60); // определение минут общей продолжительности видео 
    let secondsTotal = Math.floor(duration % 60); // определение секунд общей продолжительности видео

    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`; // отображение проигранного времени видео
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`; // отображение общей продолжительности видео
  });

  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;
    videoPlayer.currentTime = (value * duration) / 100;
  }) // переключение видео при изменении положения бегунка

  videoVolume.addEventListener('input', changeValue);

  videoPlayer.addEventListener('volumechange', () => {
    videoVolume.value = Math.round(videoPlayer.volume * 100);
  })

  videoFullscreen.addEventListener('click', () => {
    videoPlayer.requestFullscreen();
  }); // открытие видео на весь экран

  changeValue(); // вызов для установки изначального volume=50
}