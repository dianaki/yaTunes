export const radioPlayerInit = () => {
  const radio = document.querySelector('.radio');
  const radioCoverImg = document.querySelector('.radio-cover__img');
  const radioHeader = document.querySelector('.radio-header__big');
  const radioNavigation = document.querySelector('.radio-navigation');
  const radioItem = document.querySelectorAll('.radio-item');
  const radioStop = document.querySelector('.radio-stop');

  const audio = new Audio();
  audio.type = 'audio/aac';

  radioStop.disabled = true; // неактивная кнока play

  const changeIconPlay = () => {
    if(audio.paused) {
      radio.classList.remove('play');
      radioStop.classList.add('fa-play');
      radioStop.classList.remove('fa-stop');
    } else {
      radio.classList.add('play');
      radioStop.classList.add('fa-stop');
      radioStop.classList.remove('fa-play');
    }
  }; // изменение иконки play при паузе радио

  const selectItem = elem => {
    radioItem.forEach(item => item.classList.remove('select'));
    elem.classList.add('select');
  }; // добавление серой обводки у активной радиостанции и удаление у других

  radioNavigation.addEventListener('change', event => {
    const target = event.target;
    const parent = target.closest('.radio-item');
    selectItem(parent);

    const title = parent.querySelector('.radio-name').textContent;
    radioHeader.textContent = title;

    const urlImg = parent.querySelector('.radio-img').src;
    radioCoverImg.src = urlImg;
    
    radioStop.disabled = false;
    audio.src = target.dataset.radioStantion;
    audio.play();
    changeIconPlay();
  }); // переключение радиостанции

  radioStop.addEventListener('click', () => {
    if(audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }

    changeIconPlay();
  }); // воспроизведение и пауза радио
}