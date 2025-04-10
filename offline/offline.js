document.addEventListener("DOMContentLoaded", () => {
    const Allfavs = document.querySelectorAll(".favs-songs .fav");
    const CACHE_NAME = "allegrovastum-v1";

    let currentPlaying = {
        audio: null,
        isPlaying: false,
        src: null,
        icon: null,
    };

    if ("caches" in window) {
        Allfavs.forEach(fav => {
            const playBtn = fav.querySelector('.btn');
            const bar = fav.querySelector('.favs-songs .fav .progress-truck .bar')
            const dataSrc = fav.getAttribute('data-src');
            const cacheKey = "/" + encodeURI(dataSrc); // Ensures spaces become %20

            caches.open(CACHE_NAME).then(cache => {
                cache.match(cacheKey).then(response => {
                    if (response) {
                        playBtn.addEventListener('click', () => {

                            Allfavs.forEach(fav => { 
                                const playBtn = fav.querySelector('.btn');
                                const bar = fav.querySelector('.favs-songs .fav .progress-truck .bar')
                                playBtn.innerHTML =' &#9654;';
                                playBtn.classList.toggle("playing", false);
                                bar.style.width = 0;
                            });

                            if(currentPlaying && currentPlaying.audio && currentPlaying.icon === playBtn){
                                if (currentPlaying.isPlaying) {
                                    currentPlaying.audio.pause();
                                    currentPlaying.isPlaying = false;
                                    playBtn.innerHTML = '&#9654;';
                                } else {
                                    currentPlaying.audio.play();
                                    currentPlaying.isPlaying = true;
                                    playBtn.innerHTML = '&#10074;&#10074;';
                                }


                                currentPlaying.audio.addEventListener('timeupdate', () => {
                                    const  percent = (currentPlaying.audio.currentTime / currentPlaying.audio.duration) * 100;
                        
                                    bar.style.width = `${percent}%`;
                                });

                            }

                            else{
                                response.blob().then(blob => {
                                    playAscurrentSong(blob, dataSrc, playBtn, bar);
                                }).catch(error => {
                                    console.error('Error reading the blob:', error);
                                    Allfavs.forEach(fav => { 
                                        const playBtn = fav.querySelector('.btn');
                                        const bar = fav.querySelector('.favs-songs .fav .progress-truck .bar')
                                        playBtn.innerHTML =' &#9654;';
                                        playBtn.classList.toggle("playing", false);
                                        bar.style.width = 0;
                                    });
                                });
                            }

                            if(currentPlaying && currentPlaying.audio){
                                playBtn.classList.toggle("playing",currentPlaying.isPlaying);
                            }

                        });
                    } else {
                        console.warn(`No matching cache entry found for ${dataSrc}`);
                    }
                }).catch(error => {
                    console.error(`Error matching cache for ${dataSrc}:`, error);
                });
            }).catch(error => {
                console.error("Error opening cache:", error);
            });
        });
    }

    function playAscurrentSong(blob, src, btn , bar) {
        
        if (currentPlaying.audio) {
            currentPlaying.audio.pause();
            currentPlaying.isPlaying = false;
            currentPlaying.icon.innerHTML = '&#9654;'; // Reset to play icon for the previous song
        }

        // Create a new audio URL for the selected song
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);

        // When the song ends, reset play button to pause
        audio.addEventListener('ended', () => {
            btn.innerHTML = '&#9654;';
            btn.classList.remove("playing");
            currentPlaying.isPlaying = false;
        });

        // Assign the audio and icon for the current song
        currentPlaying.audio = audio;
        currentPlaying.src = src;
        currentPlaying.isPlaying = true;
        currentPlaying.icon = btn;
        currentPlaying.icon.innerHTML = '&#10074;&#10074;'; // Play icon
        audio.play().catch(error => {
            console.error("Error playing audio:", error);
            currentPlaying.icon.innerHTML = '&#9654;';
        });


        if(currentPlaying && currentPlaying.audio){
            btn.classList.toggle("playing", currentPlaying.isPlaying);
        }


        currentPlaying.audio.addEventListener('timeupdate', () => {
            const  percent = (currentPlaying.audio.currentTime / currentPlaying.audio.duration) * 100;

            bar.style.width = `${percent}%`;
        });
    }

});
