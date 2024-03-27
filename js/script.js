var modals = document.getElementsByClassName("card_modal");
var cards = document.getElementsByClassName("card");
var spans = document.getElementsByClassName("closeDiv");
const musicContainers = document.querySelectorAll('.music-container')
const playBtns = document.querySelectorAll('#play')
const audios = document.querySelectorAll('#audio')
const progressBars = document.querySelectorAll('.progress')
const prevBtns = document.querySelectorAll('#prev')

function playSong(container, btn, aud) {
  container.classList.add('play')
  btn.querySelector('i.fas').classList.remove('fa-play')
  btn.querySelector('i.fas').classList.add('fa-pause')
  aud.play()
}

function pauseSong(container, btn, aud) {
  container.classList.remove('play')
  btn.querySelector('i.fas').classList.add('fa-play')
  btn.querySelector('i.fas').classList.remove('fa-pause')
  aud.pause()
}

musicContainers.forEach(container => {
  let prevBtn = container.querySelector("#prev")
  let playBtn = container.querySelector('#play')
  let audio = container.querySelector('#audio')

  playBtn.addEventListener('click', () => {
    const isPlaying = container.classList.contains('play')
    if (isPlaying) {
      pauseSong(container, playBtn, audio)
    }
    else {
      playSong(container, playBtn, audio)
    }
  })

  prevBtn.addEventListener('click', () =>{
      audio.currentTime = 0
    })
});



// prevBtn.addEventListener('click', () =>{
//   audio.currentTime = 0
// })
// playBtn.addEventListener('click', () => {
//   const isPlaying = musicContainer.classList.contains('play')

//   if(isPlaying)
//     pauseSong()
//   else
//     playSong()
// })

for (let i = 0; i < spans.length; i++) {
  spans[i].onclick = function(e) {
    e.stopPropagation();
    for (let i = 0; i < modals.length; i++) {
      modals[i].style.display = "none";
    }
    audios.forEach(audio => {
      audio.pause()
      audio.currentTime = 0
    });
    playBtns.forEach(btn => {
      btn.querySelector('i.fas').classList.add('fa-play')
      btn.querySelector('i.fas').classList.remove('fa-pause')
    })
    musicContainers.forEach(cont => {
      cont.classList.remove('play')
    })
  }
}

for (let i = 0; i < cards.length; i++) {
  cards[i].onclick = function() {
    modals[i].style.display = "block";
  }
}

window.onclick = function(event) {
  for (let i = 0; i < modals.length; i++) {
    if (event.target == modals[i]) {
      modals[i].style.display = "none";
      audios.forEach(audio => {
        audio.pause()
        audio.currentTime = 0
      });
      playBtns.forEach(btn => {
        btn.querySelector('i.fas').classList.add('fa-play')
        btn.querySelector('i.fas').classList.remove('fa-pause')
      })
      musicContainers.forEach(cont => {
        cont.classList.remove('play')
      })
    }
  }
}

function updateProgress(e) {
  console.log()
  const { duration, currentTime } = e.srcElement
  const progressPerc = currentTime / duration * 100
  e.target.parentNode.querySelector('.progress').style.width = `${progressPerc}%`

}
audios.forEach(a => {
  a.addEventListener('timeupdate', updateProgress)
});
