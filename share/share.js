// share.js
'use strict';



document.addEventListener('DOMContentLoaded', function() {
    const  playerContainer = document.getElementById('playerContainer');
    const  playerImage = playerContainer.querySelector('.player .player-image img');
    const playerTitle = playerContainer.querySelector('.player .player-info #player-title');
    const playerArtist = playerContainer.querySelector('.player .player-info #player-artist');
    const playerAlbum = playerContainer.querySelector('.player .player-info #player-album');
    const playerGenre = playerContainer.querySelector('.player .player-info #player-genre');
    const  playerDuration = playerContainer.querySelector('.player .player-info #player-duration');

    const  playerProgressBar = playerContainer.querySelector('.player .player-progress-truck .player-progress-bar');

    const playerPlayBtn = playerContainer.querySelectorAll('.player .player-controls button')[0];
    const  playerMuteBtn = playerContainer.querySelectorAll('.player .player-controls button')[1];
    const playerLoopBtn = playerContainer.querySelectorAll('.player .player-controls button')[2];

    const homeInPlainBtn = document.querySelectorAll('.home-buttons button')[0];
    const homeWithIDBtn = document.querySelectorAll('.home-buttons button')[1];

    const  fallbackDiv = document.querySelector('.fallback-actions');
    const fallBackBtn = fallbackDiv.querySelector('button');

    let allAvailableSongs = [];

    let songFound = {
        id: null,
        song: null,
        audio: null,
        isPlaying: false,
        isLooping: false,
    }

    const myAlbums = [
        {
            albumName: "RnB",
            albumImage: "images/rnb.jpg",
            description: "Smooth, soulful tunes to set the mood right."
        },
        {
            albumName: "Airwave Music",
            albumImage: "images/airwave.jpg",
            description: "Feel the breeze of uplifting beats and serene melodies."
        },
        {
            albumName: "Chills",
            albumImage: "images/chills.jpg",
            description: "Relax and unwind with soothing and calming sounds."
        },
        {
            albumName: "Twilight",
            albumImage: "images/twilight.jpg",
            description: "Melodies as magical as the twilight hour."
        },
        {
            albumName: "Two Steps From Hell",
            albumImage: "images/hell.jpg",
            description: "Epic and inspiring orchestral masterpieces."
        },
        {
            albumName: "Classical",
            albumImage: "images/waltz.jpg",
            description: "Graceful rhythms for dreamy dances under the stars."
        },
        {
            albumName: "Disney",
            albumImage: "images/disney.jpg",
            description: "Magical tunes that spark joy and nostalgia."
        },
        {
            albumName: "Ncs",
            albumImage: "images/ncs.jpg",
            description: "Non-stop energy with no copyright beats."
        },
        {
            albumName: "Celine Dion",
            albumImage: "images/celine.jpg",
            description: "Iconic ballads and heartfelt anthems from the queen of vocals."
        },
        {
            albumName: "Bongo",
            albumImage: "images/bongo.jpg",
            description: "Vibrant African rhythms to get you moving."
        },
        {
            albumName: "Bollywood",
            albumImage: "images/bollywood.jpg",
            description: "Bollywood beats that bring drama and romance to life."
        },
        {
            albumName: "Others",
            albumImage: "images/others.jpg",
            description: "A mix of unique sounds for every curious ear."
        },
        {
            albumName: "Cool",
            albumImage: "images/cool.jpg",
            description: "Refreshing vibes to keep you chill."
        }
    ];

    const fetchAllSongs =  () => {
        fetch('../audio.json') // Replace with your API endpoint
            .then((response) =>{
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then((data) => {
                allAvailableSongs.push(...data);
        
                getSongFromUrl();
                setTimeout(() => {displaySong()}, 1000); // Wait for 1 second before executing the next line
            }).catch((error) => {
                console.error('Error fetching songs:', error);
            });
    }

    fetchAllSongs();

    function getSongFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const sid = urlParams.get("sid");

        if (sid) {

            
            const song = allAvailableSongs.find((song) => song.songId === sid);
            if (song) {
                songFound.id = sid;
                songFound.song = song;
                
            } else {
                fallbackDiv.classList.add("active");
                console.error('Song not found');
                
            }
        }
    }


    function displaySong() {
        if (songFound.song) {
            console.log('Song found:', songFound.song);
            const albumTextAndImage = getAlbumImageAndText(songFound.song);
            console.log(albumTextAndImage);
            playerImage.src = `../${albumTextAndImage.image}`;
            playerTitle.innerText = songFound.song.songName;
            playerArtist.innerText =`${ songFound.song.songArtist1} ${songFound.song.songArtist2 ? `& ${songFound.song.songArtist2}` : ''}`;
            playerAlbum.innerText = albumTextAndImage.name;
            playerGenre.innerText = albumTextAndImage.text;
            playerImage.alt = songFound.song.songName;
            playerProgressBar.style.width = "0%";

            songFound.audio = new Audio(`../${songFound.song.songUrl}`);
            songFound.audio.loop = songFound.isLooping;
            songFound.audio.addEventListener('ended', function() {
                songFound.isPlaying = false;
                playerPlayBtn.innerHTML = '&#9654;'; // Unicode for play symbol
                songFound.audio.currentTime = 0; // Reset to start
                songFound.audio.pause(); // Pause the audio
                songFound.audio.mute = false; // Unmute the audio
                playerMuteBtn.innerHTML = '<i class="fa-solid fa-volume-up"></i>'; // Unicode for volume up symbol
                playerProgressBar.style.width = "0%";
            });

            songFound.audio.addEventListener('error', function() {
                console.error('Error loading audio:', songFound.audio.error);
                playerPlayBtn.innerHTML = '&#9654;'; // Unicode for play symbol
                songFound.isPlaying = false;
            });
            songFound.audio.addEventListener('loadedmetadata', function() {
                const duration = songFound.audio.duration;
                const minutes = Math.floor(duration / 60);
                const seconds = Math.floor(duration % 60);
                playerDuration.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            });

            songFound.audio.addEventListener('timeupdate', function() {
                const progress = (songFound.audio.currentTime / songFound.audio.duration) * 100;
                playerProgressBar.style.width = `${progress}%`;

                const duration = songFound.audio.duration;
                const cTime = songFound.audio.currentTime;

                const minutes = Math.floor(duration / 60);
                const seconds = Math.floor(duration % 60);

                const cminutes = Math.floor(cTime / 60);
                const cseconds = Math.floor(cTime % 60);

                playerDuration.innerHTML = `
                <span>${cminutes}:${cseconds < 10 ? '0' : ''}${cseconds}</span> /
                <span>${minutes}:${seconds < 10 ? '0' : ''}${seconds}</span>
              `;
              

            });

            songFound.audio.addEventListener('play', function() {
                playerPlayBtn.innerHTML = '&#10074;&#10074;'; // Unicode for pause symbol
                songFound.isPlaying = true;
            });

        } else {
            console.error('No song found to display');
        }
    }

    function getAlbumImageAndText(song) {
        const  songAlbum = song.songGenre;
        const album = myAlbums.find(album => album.albumName === songAlbum);
        if(album) {
            const alTextNImg = {
                text: album.description,
                image: album.albumImage,
                name: album.albumName,
            }
            return alTextNImg;
        }
        return "./logo.png"; // Default image if no album found
    }

    playerPlayBtn.onclick = function() {
        if(songFound && songFound.audio){
            if(!songFound.isPlaying) {
                songFound.audio.play();
                playerPlayBtn.innerHTML = '&#10074;&#10074;'; // Unicode for pause symbol
                songFound.isPlaying = true;
                songFound.audio.addEventListener('timeupdate', function() {
                    const progress = (songFound.audio.currentTime / songFound.audio.duration) * 100;
                    playerProgressBar.style.width = `${progress}%`;
                });
            }
            else {
                songFound.audio.pause();
                playerPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
                songFound.isPlaying = false;
            }
        }
    }

    playerMuteBtn.onclick = function() {
        if(songFound && songFound.audio){
            if(songFound.audio.muted) {
                songFound.audio.muted = false;
                playerMuteBtn.innerHTML = '<i class="fa-solid fa-volume-up"></i>'; // Unicode for volume up symbol
            } else {
                songFound.audio.muted = true;
                playerMuteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>'; // Unicode for volume off symbol
            }
        }
    }

    playerLoopBtn.onclick = function() {
        if(songFound && songFound.audio){
            if(!songFound.isLooping) {
                songFound.audio.loop = true;
                playerLoopBtn.innerHTML = '<i class="fa-solid fa-repeat"></i>'; // Unicode for repeat symbol
                songFound.isLooping = true;
            } else {
                songFound.audio.loop = false;
                playerLoopBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i>'; // Unicode for repeat symbol
                songFound.isLooping = false;
            }
        }
    }

    playerProgressBar.parentElement.onclick = function(event) {
        const rect = playerProgressBar.parentElement.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const totalWidth = rect.width;
        const percentage = offsetX / totalWidth;
        songFound.audio.currentTime = percentage * songFound.audio.duration;
    }

    homeInPlainBtn.onclick = function() {
        window.location.href = "../";  // This will take you to the parent directory
    }
    
    homeWithIDBtn.onclick = function() {
        const songId = encodeURIComponent(songFound.id);
        window.location.href = `../?sid=${songId}&index=1`;  // Passing the sid in the query string
    }

    fallBackBtn.onclick =  function() {
        window.location.href = "../";  // This will take you to the parent directory
        fallbackDiv.classList.remove("active");
    }
    
    
})