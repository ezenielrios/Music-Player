const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const audio = document.getElementById('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

// songs
const songs = [
    {
        name: 'easy-morning-1',
        displayName: 'Easy Morning',
        artist: 'Vens Adams',
    },
    {
        name: 'Adrenaline-Buzz-2',
        displayName: 'Adrenaline Buzz',
        artist: 'Pecan Pie',
    },
    {
        name: 'Menace-3',
        displayName: 'Menace',
        artist: 'All Good Folks',
    },
    {
        name: 'Adventure-4',
        displayName: 'Adventure Is Calling',
        artist: 'Vens Adams',
    },
]

// check if playing
let isPlaying = false

// current song
let songIndex = 0

// play
function playSong() {
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    audio.play()
}

// pause
function pauseSong() {
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    audio.pause()
}

// update DOM
function loadSong(song) {
    title.textContent = song.displayName
    artist.textContent = song.artist
    audio.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

// previous song
function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}

// next song
function nextSong() {
    songIndex++
    if (songIndex >= songs.length) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

// calculate minutes & seconds from given value
function calculateTime(value) {
    const minutes = Math.floor(value / 60)
    let seconds = Math.floor(value % 60)
    seconds = seconds < 10 ? `0${seconds}` : seconds
    if (seconds) return `${minutes}:${seconds}`
    return null
}

// update progress bar & time
function updateProgressBar(evt) {
    if (isPlaying) {
        const { duration, currentTime } = evt.srcElement
        // update progress bar width
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`
        // calculate display for duration
        const durationText = calculateTime(duration)
        if (durationText) durationEl.textContent = durationText
        // calculate display for current time
        const currentTimeText = calculateTime(currentTime)
        if (currentTimeText) currentTimeEl.textContent = currentTimeText
    }
}

// set progress bar & time
function setProgressBar(evt) {
    const width = this.clientWidth
    const clientX = evt.offsetX
    const { duration } = audio
    audio.currentTime = (clientX / width) * duration
}

// event listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)
audio.addEventListener('ended', nextSong)

// on load
loadSong(songs[songIndex])