const tracks = [
    { title: "Track 1", src: "track1.mp3" },
    { title: "Track 2", src: "track2.mp3" },
    { title: "Track 3", src: "track3.mp3" }
];

let currentTrackIndex = 0;
const audioPlayer = document.getElementById('audio-player');
const progressBar = document.getElementById('progress-bar');
const trackList = document.getElementById('track-list');

// Populate playlist dynamically
tracks.forEach((track, index) => {
    const li = document.createElement('li');
    li.textContent = track.title;
    li.onclick = () => playTrack(index);
    trackList.appendChild(li);
});

function playTrack(index) {
    currentTrackIndex = index;
    audioPlayer.src = tracks[index].src;
    audioPlayer.play();
    updateTrackHighlight();
}

function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
}

function previousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(currentTrackIndex);
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(currentTrackIndex);
}

function setVolume(value) {
    audioPlayer.volume = value;
}

audioPlayer.ontimeupdate = () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress || 0;
};

progressBar.oninput = () => {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
};

function updateTrackHighlight() {
    const items = trackList.querySelectorAll('li');
    items.forEach((item, index) => {
        if (index === currentTrackIndex) {
            item.style.backgroundColor = '#444';
        } else {
            item.style.backgroundColor = '#222';
        }
    });
}
