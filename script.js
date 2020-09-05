const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

// display song info
const info = document.getElementById('info');

// audio 
const music = document.querySelector('audio');

// Progress bar
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

// song time current and total
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// media control buttons
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('main-button');
const nextBtn = document.getElementById('next');

// Song array
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto'
    },
    {
        name: 'jacinto-3',
        displayName: 'GoodNight, Disco Queen',
        artist: 'Jacinto'
    },
    {
        name: 'jacinto-4',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto'
    }
]


// Check if playing
let isPlaying = false;


// Play
function playSong() {
    isPlaying = true;
    isScrolling = true;
    music.play();

    // start info scroll
    if ((info.className === "info") && (image.className === 'image')) {
        info.className += " info-scroll";
        image.className += " image-flicker";
    } else {
        info.className = "info";
        image.className = "image";
    }
}

// Pause
function pauseSong() {
    isPlaying = false;
    isScrolling = false;
    // stop info scroll
    info.className = "info";
    image.className = "image";
    music.pause();




}



// update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Prev Song
function prevSong() {

    songIndex--;

    // if prev on first song go to last song
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);

    if (isPlaying) {
        // if scrolling keep scrolling
        if (isScrolling) {
            info.className = "info";
            image.className = "image";
        }
        playSong();
    }
}

// Next Song
function nextSong() {
    songIndex++;

    // if next on last song go to first song
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }


    loadSong(songs[songIndex]);
    if (isPlaying) {
        // if scrolling keep scrolling
        if (isScrolling) {
            info.className = "info";
            image.className = "image";
        }
        playSong();
    }
}

// On Load - Select first song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {

    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // console.log(duration, currentTime);

        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        // console.log(progressPercent);
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration
        // minutes
        const durationMinutes = Math.floor(duration / 60);
        // console.log('minutes: ' + durationMinutes);
        // seconds
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // console.log('seconds: ' + durationSeconds);

        // Delat switching duration Element to avoid showing 'NaN'
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate display for currentTime
        // minutes
        const currentMinutes = Math.floor(currentTime / 60);
        // console.log('minutes: ' + currentMinutes);
        // seconds
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        // console.log('seconds: ' + currentSeconds);
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    }
}

// Set Song Progress Bar
function setProgressBar(e) {

    // console.log(e);
    const width = this.clientWidth;
    console.log('width: ', width);

    const clickX = e.offsetX - 45; /* 45 is from css .duration-wrapper { left: -45px; } */
    console.log('clickX', clickX);

    const { duration } = music;
    console.log('percent of song completed at click location: ' + ((clickX / width) * 100));
    console.log('number of seconds into song at click location: ' + ((clickX / width) * duration));

    music.currentTime = (clickX / width) * duration;
}

// Event Listeners

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

prevBtn.addEventListener('click', prevSong);

nextBtn.addEventListener('click', nextSong);

// if song ends play next song in array ('ended' is property of 'audio' element doc)
music.addEventListener('ended', nextSong);


music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);