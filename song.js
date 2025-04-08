// File: script.js
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const allSections = document.querySelectorAll('main section');
    const Hmenu = document.querySelector(".humburger-menu");
    const navigations = document.querySelector('.navigations');
    const  navLinks = document.querySelectorAll('.navigations ul li');
    const headerTitle = document.querySelector(".logo-n-title-header");
    const musicHeadines = document.querySelector('.music-headlines h2 span');
    const  miniProgressbar = document.querySelector('#Home .mini-song-menu .progress-menu-truck .progress-menu-bar');
    const queuedContainer = document.querySelector('.queued-songs-list');
    const queuedSongTitle = document.querySelector('#QueuedSongs h2');
    const queuedSongInfo = document.querySelector('#QueuedSongs p');
    const defaultdiv = document.querySelector('#QueuedSongs .fallback-message');
    const fallCpBtn = defaultdiv.querySelectorAll('.fallback-message .fallback-actions button')[0];
    const fallHomeBtn = defaultdiv.querySelectorAll('.fallback-message .fallback-actions button')[1];
    const aBoutPlayBtn = document.querySelector('#About .playbtn-control');
    const playlistProBar = document.querySelector('#Playlist .playlist-progress-truck .playlist-progres-bar');
    const loadingoverlay = document.querySelector('.loading-overlay');
    const installButton = document.querySelector('footer button')


    const songsContainer =  document.querySelectorAll('#Home .music-container ul')[0];
    const playListContainer = document.querySelectorAll('#Home .music-container ul')[1];
    const filterMusicBtn = document.querySelector('#Home .music-headlines .filter-button');
    const createPlaylistBtn = document.querySelector('#Home .music-container .playlist-titles button');


    const hihghLighcontainer = document.querySelector('#Playlist .play-song-field');
    const quoteContainer = document.querySelector('#Playlist .quote-div');
    const playIcon = document.querySelectorAll('#Playlist .actions-icons')[0];
    const prevIcon  = document.querySelectorAll('#Playlist .actions-icons')[1];
    const nextIcon  = document.querySelectorAll('#Playlist .actions-icons')[2];
    const loopIcon  = document.querySelectorAll('#Playlist .actions-icons')[3];
    const likeIcon  = document.querySelectorAll('#Playlist .actions-icons')[4];
    const muteIcon  = document.querySelectorAll('#Playlist .actions-icons')[5];

    const miniMenu = document.querySelector('#Home  .mini-song-menu');
    const miniPrevBtn = miniMenu.querySelectorAll('.min-controls button')[0];
    const miniplayBtn = miniMenu.querySelectorAll('.min-controls button')[1];
    const miniNextBtn = miniMenu.querySelectorAll('.min-controls button')[2];
    const miniLoopBtn = miniMenu.querySelectorAll('.min-controls button')[3];
    const minisongTitle = miniMenu.querySelector('.song-title');

    const confirmationOverlay = document.querySelector('.confirmation-play-overlay');
    const confirmationText = confirmationOverlay.querySelector('.confirmation-content .confirmation-text');
    const confirmationAcceptButtons = confirmationOverlay.querySelectorAll('.confirmation-content .confirmations-button button')[0];
    const confirmationDeclineButtons = confirmationOverlay.querySelectorAll('.confirmation-content .confirmations-button button')[1];

    const  playlistOverlay = document.querySelector('.user-playlistform');
    const  playlistInput = playlistOverlay.querySelector('.userp-header input');
    const songfolders = playlistOverlay.querySelector('.userp-content .list-of-floders ul');
    const songField = playlistOverlay.querySelector('.user-playlistform .userp-content .songs-field ul');
    const donePBtn = playlistOverlay.querySelectorAll('.user-playlistform .userp-content .userp-actions button')[0];
    const exitUserpBtn =  playlistOverlay.querySelectorAll('.user-playlistform .userp-content .userp-actions button')[1];

    const refreshOverlay = document.querySelector('.filter-options');
    const refreshBtn = refreshOverlay.querySelector('.refresh-options-content .filter-options-header button');
    const refreshDivContainer = refreshOverlay.querySelector('.refresh-options-content .refresh-content-lists ul')
   
    const  playlistPlatformOverlay = document.querySelector('.playlist-platform');
    const playlistPlatDone = playlistPlatformOverlay.querySelectorAll('.playlist-platform-header .playlist-platform-actions button')[0];
    const playlistPlatExit = playlistPlatformOverlay.querySelectorAll('.playlist-platform-header .playlist-platform-actions button')[1];
    const playlistPatContainer = playlistPlatformOverlay.querySelector('.playlist-platform-content .platforms-list ul');

    const  authOverlay = document.querySelector('.auth-input');
    const authInput = authOverlay.querySelector('.auth-input .auth-content input');
    const authDone = authOverlay.querySelectorAll('.auth-input .auth-actions button')[0];
    const authExit = authOverlay.querySelectorAll('.auth-input .auth-actions button')[1];

    const shareOverlay = document.querySelector(".sharing-overlay");
    const shareExit = document.querySelector(".share-exit");
    const  sharingDiv = document.querySelector(".sharing-overlay .sharing-content .sharing-icons");

    const pageLoadElement = document.querySelector('.page-load');


    let mysongs = [];
    let songFromUrl = {
        sid: null,
        index: null,
    }

    let playlistFromUrl = {
        pid: null,
        number: null,
    }

    let togglePlaylist = false;

    let storedLoopState = JSON.parse(sessionStorage.getItem("audioLoop")) || { lpid: null, looped: "false" };

    let currentAudioPlaying = {
        audio: null,
        sid: null,
        isPlaying: false,
        ct: JSON.parse(sessionStorage.getItem("currentTime")) || { ctid: null, cttime: 0 },
        isLooping: storedLoopState
    };


    let timeStopped = JSON.parse(sessionStorage.getItem("pcurrentTime")) || { pctid: null, ptime: 0 };

    let currentSongPlaying = {
        audio:null,
        sid: null,
        isPlaying: false,
        pttime: timeStopped
    }

    let chosenPlaylist = {
        name: null,
        songsIds: [],
        pid: null,
    }

    let wasAudioPlaying = false;

    let songBatches = JSON.parse(sessionStorage.getItem('songBatches') || '[]');
    let playlistBatches = JSON.parse(sessionStorage.getItem('playlistBatches') || '[]');
    let likedSongs = JSON.parse(localStorage.getItem("LikedSongs") || "[]");
    let listenedSongs = JSON.parse(localStorage.getItem("ListenedSongs") || "[]");
    let userplayList = JSON.parse(localStorage.getItem('UserPlaylist') || '[]');



    let currentSection = null;
    let isMenuShown = false;
    let allPlayLists =  [];
    let reverseMode = false;
    
  

    const myMoods = [
        { mood: "Upbeat", description: "Energetic and lively songs, often with a fast tempo and positive energy.", reader:"cantabile/reader1.mp3",img:'images/emoji2.jpg' },
        { mood: "Happy", description: "Cheerful and light-hearted songs, designed to boost your spirits.", reader:"cantabile/reader2.mp3",img:'images/emoji1.jpg' },
        { mood: "Sad", description: "Songs that evoke sadness or melancholy feelings.", reader:"cantabile/reader3.mp3",img:'images/emoji3.jpg' },
        { mood: "Romantic", description: "Songs that convey love, affection, and romantic emotions.", reader:"cantabile/reader4.mp3",img:'images/emoji4.jpg' },
        { mood: "Motivational", description: "Songs that inspire and encourage action, often used for workouts or personal growth.", reader:"cantabile/reader5.mp3",img:'images/emoji5.jpg' },
        { mood: "Relaxing", description: "Calm, soothing songs that help with relaxation or stress relief.",reader:"cantabile/reader6.mp3",img:'images/emoji6.jpg' },
        { mood: "Angry", description: "Songs that express frustration, rage, or strong emotions.",reader:"cantabile/reader7.mp3",img:'images/emoji7.jpg' },
        { mood: "Mellow", description: "Smooth and gentle songs that create a laid-back atmosphere.",reader:"cantabile/reader8.mp3",img:'images/emoji8.jpg' },
        { mood: "Dreamy", description: "Songs with a soft, ethereal, or otherworldly vibe.",reader:"cantabile/reader9.mp3",img:'images/emoji9.jpg' },
        { mood: "Nostalgic", description: "Songs that evoke memories of the past, often bittersweet.",reader:"cantabile/reader10.mp3",img:'images/emoji10.jpg' },
        { mood: "Epic", description: "Grand, powerful songs often used in movie soundtracks or anthems.",reader:"cantabile/reader11.mp3",img:'images/emoji11.jpg' },
        { mood: "Chill", description: "Laid-back, easy-going songs, often associated with relaxing moments.",reader:"cantabile/reader12.mp3",img:'images/emoji12.jpg' },
        { mood: "Party", description: "High-energy songs for social gatherings, clubs, or celebrations.",reader:"cantabile/reader13.mp3",img:'images/emoji13.jpg' },
        { mood: "Melancholic", description: "Songs that reflect deep sadness or a reflective, sorrowful mood.",reader:"cantabile/reader14.mp3",img:'images/emoji14.jpg' },
        { mood: "Hopeful", description: "Songs that convey optimism, anticipation, or positive aspirations.",reader:"cantabile/reader15.mp3",img:'images/emoji15.jpg' },
        { mood: "Sentimental", description: "Songs that evoke deep emotions and affection, often tied to memories.",reader:"cantabile/reader16.mp3",img:'images/emoji16.jpg' },
        { mood: "Peaceful", description: "Calm and serene songs, perfect for unwinding and inner peace.",reader:"cantabile/reader17.mp3",img:'images/emoji17.jpg' },
        { mood: "Intense", description: "Songs that are dramatic and full of energy, creating a sense of urgency.",reader:"cantabile/reader18.mp3",img:'images/emoji18.jpg' },
        { mood: "Fun", description: "Light-hearted and playful songs, often associated with good times and laughter.",reader:"cantabile/reader19.mp3",img:'images/emoji19.jpg' },
        { mood: "Euphoric", description: "Songs that evoke intense joy or bliss, often with a dance or trance feel.",reader:"cantabile/reader20.mp3",img:'images/emoji20.jpg' }
    ];


    const vivaldiQuotes = [
        "Music is the rhythm of life, a melody that weaves through our souls, and a harmony that unites our hearts.",
        "Every note is a heartbeat, every melody a story waiting to be heard.",
        "Through music, we find not just sound, but the essence of life itself.",
        "Life's beauty unfolds in the symphonies we create and the harmonies we share.",
        "A single note can stir emotions that words could never express.",
        "Music is the bridge that connects moments, memories, and dreams.",
        "In every melody lies a whisper of the universe, reminding us of our shared humanity.",
        "Life without music is like a canvas without color—silent and incomplete.",
        "Music is not just sound; it’s a language of the soul that everyone understands.",
        "The rhythm of life finds its pulse in the beats of a timeless melody.",
        "In the silence between notes, we discover the beauty of the unknown.",
        "Music is the timeless dance of emotion, weaving through the tapestry of life.",
        "Through music, the past and present converse in perfect harmony.",
        "A crescendo that transcends the bounds of eternity.",
        "Melodies are the footprints of the heart, marking the journey of life."
    ];
    
    const ldir = "Left";
    const rdir = "Right";

    

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

    fetchSongs();

    function fetchSongs(){
        fetch("audio.json").then((response) => {
            if(!response.ok) throw new Error;
            return response.json();
        }).then((data) => {
            mysongs.unshift(...data);
            createSessionSongBatches();
            createPlaylistBatches();
            scanUrl();
            setTimeout(() => {toggleClassList(pageLoadElement, "loaded" ,true)}, 6000)
        }).catch((err) => {
            console.error(err);
        })
    }

    function scanUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const sectId = urlParams.get("note");
        const sid = urlParams.get("sid");
        const index = urlParams.get("index");
        const pid = urlParams.get('pid');
        const number = urlParams.get("number");

        songFromUrl.sid = sid;
        songFromUrl.index = parseInt(index);

        playlistFromUrl.pid = pid;
        playlistFromUrl.number = parseInt(number);

        const indexOfSection = Array.from(allSections).findIndex(sect => sect.getAttribute('data-url') === sectId);

        if(indexOfSection !== -1) {
            ShowCurrentSection(indexOfSection);
        }
        else{
            ShowCurrentSection(0);
        }

    }

    

    function ShowCurrentSection(index) {

        allSections.forEach(sect => toggleClassList(sect, "active", false));
        toggleClassList(allSections[index], "active", true);

        currentSection = allSections[index];
        navLinks.forEach(nav => toggleClassList(nav, "active", false));

        const sectionId = currentSection.id;

        document.title = "AllegroVastum - Curated Music Collection | Personal Music Sanctuary";

        navLinks.forEach(nav => {
            const navId = nav.getAttribute('data-match');
            if(navId && navId === sectionId){
                toggleClassList(nav, "active", true);
            }
        });

        let count = 0;
        let intId;
        intId = setInterval(() => {
            if(currentSection.id === "About" && currentAudioPlaying && currentAudioPlaying.audio){
                
                toggleClassList(aBoutPlayBtn, "active", currentAudioPlaying.isPlaying);

                aBoutPlayBtn.innerHTML = currentAudioPlaying.isPlaying ? "&#10074;&#10074;" : "&#9654;"
                count++;
                if(count > 10){
                    clearInterval(intId);
                }
            }
       }, 500)

       

        if (currentSection.id !== "QueuedSongs") {
            if (currentSongPlaying && currentSongPlaying.audio) { // Corrected to check currentSongPlaying.audio
                currentSongPlaying.audio.pause();
                currentSongPlaying.isPlaying = false;
            }
            
            togglePlaylist = false;
            reverseMode = false;
        }
        
       
        if(togglePlaylist || currentSection.id === "QueuedSongs"){
            handlePlaylistDetails(playlistFromUrl.pid, playlistFromUrl.number);
            
        }
        else{
            handleSongDetails(songFromUrl.sid, songFromUrl.index);
        }

        updateAddressbar();


        aBoutPlayBtn.onclick = () => {
            if(currentAudioPlaying && currentAudioPlaying.audio){
                if(currentAudioPlaying.isPlaying){
                    currentAudioPlaying.audio.pause();
                    currentAudioPlaying.isPlaying = false
                }
                else{
                    currentAudioPlaying.audio.play();
                    currentAudioPlaying.isPlaying = true;
                }
            }

            aBoutPlayBtn.innerHTML = currentAudioPlaying.isPlaying ? "&#10074;&#10074;" : "&#9654;"
            updatePlaybuttons(currentAudioPlaying.isPlaying);
        }
 
    }

    

    function updateAddressbar() {
        const sectId = currentSection.getAttribute('data-url');
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('note', sectId);
        urlParams.set('sid', songFromUrl.sid);
        urlParams.set('index', songFromUrl.index);
        urlParams.set('pid', playlistFromUrl.pid);
        urlParams.set('number', playlistFromUrl.number);


        const newAddressbar = `${window.location.pathname}?${urlParams.toString()}`;
    
        // Use replaceState instead of pushState
        window.history.replaceState(
            {
                section: sectId,
                songDetails: { sid: songFromUrl.sid, index: songFromUrl.index },
                playlistDetails: {pid: playlistFromUrl.pid, number: playlistFromUrl.number}
            },
            "",
            newAddressbar
        );
    }
    
   
  

    window.addEventListener('popstate', (event) => {
        if (event.state) {
            // Retrieve section details
            const sectionUrlId = event.state.section;
            const indexOfSect = Array.from(allSections).findIndex(
                sect => sect.getAttribute('data-url') === sectionUrlId
            );
    
            // Retrieve song details
            const songDetails = event.state.songDetails || {}; // Ensure it's defined
            const songSid = songDetails.sid || "";  // Default value if missing
            const songIndex = parseInt(songDetails.index) || 0;  // Default value if missing
    
            songFromUrl.sid = songSid;
            songFromUrl.index = parseInt(songIndex);
    
            // Show the correct section
            if (indexOfSect !== -1) {
                ShowCurrentSection(indexOfSect);
            } else {
                ShowCurrentSection(0);
            }
    

        }
    });

    function toggleClassList(el, className, state){
        el.classList.toggle(className, state);
    }

    function saveToSessionStorage(arr, arrname) {
        sessionStorage.setItem(arrname, JSON.stringify(arr));
    }

    function saveToLocalStorage(arr, arrname) {
        
        localStorage.setItem(arrname, JSON.stringify(arr));
    }
    

    const getRandomFigure = (ln) => {
        return Math.floor(Math.random() * ln);
    }

    

    // Create tooltip once
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip-text");
    tooltip.style.position = 'fixed';
    tooltip.style.display = 'none'; // hide initially
    document.body.appendChild(tooltip);

    // Reusable function
    const tooltipDiv = (text, event, state) => {
        if (state) {
            tooltip.innerHTML = `<p>${text}</p>`;
            tooltip.style.left = `${event.clientX + 15}px`;
            tooltip.style.top = `${event.clientY - 25}px`;
            tooltip.style.display = 'block';
        } else {
            tooltip.style.display = 'none';
        }
    };

    

    const formatTime = (audio) => {
        const hours = Math.floor(audio / 3600); // Get hours from total seconds
        const min = Math.floor((audio % 3600) / 60); // Get remaining minutes after hours
        const sec = Math.floor(audio % 60); // Get remaining seconds
    
        const fmin = min < 10 ? `0${min}` : min;
        const fsec = sec < 10 ? `0${sec}` : sec;
    
        // If hours is greater than 0, format it as "hours : minutes : seconds"
        if (hours > 0) {
            const fhours = hours < 10 ? `0${hours}` : hours;
            return `${fhours}hrs : ${fmin} min : ${fsec} sec`;
        }
    
        // Otherwise, return in "minutes : seconds" format
        return `${fmin} : ${fsec}`;
    }
    

    function movableMenu(...args) {
    
        const movableMenuDiv = document.querySelector(".movable-menu");
        
        toggleClassList(movableMenuDiv , "active", true);

        movableMenuDiv.innerHTML = ""; // Clear previous items


        args.forEach(arg => {
            const menuItem = document.createElement("div"); 
            menuItem.classList.add("menu-items");
            menuItem.innerHTML = `<p><span>${arg.icon}</span>${arg.text}</p>`;
            movableMenuDiv .appendChild(menuItem);

            menuItem.onclick = () => {
                if(arg.callback && typeof arg.callback === "function") {
                    arg.callback();
                }
                toggleClassList(movableMenuDiv, "active", false);
            }
        });
    
        // Close menu when clicking outside
        document.addEventListener("click", () => toggleClassList(movableMenuDiv , "active", false), { once: true });
    }

    // Check if the user is offline and handle it
    function handleOffline() {
        // If currentAudio is playing, pause it and save the state
        if (currentAudioPlaying && currentAudioPlaying.audio && currentAudioPlaying.isPlaying) {
            currentAudioPlaying.audio.pause();
            wasAudioPlaying = true;  // Save the fact that it was playing
            currentAudio.isPlaying = false;
        }

        // Redirect to offline page
        window.location.href = 'offline/';
    }

    // Check when the user goes back online
    function handleOnline() {
        // If we were playing audio before going offline, resume it
        if (wasAudioPlaying && currentAudioPlaying && currentAudioPlaying.audio) {
            currentAudioPlaying.audio.pause();
            currentAudioPlaying.isPlaying = true;
            wasAudioPlaying = false;  // Reset the state
        }

        window.location.href = "index.html";
    }

    // Listen for the online/offline events
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('./service-worker.js')  // Ensure the correct path
            .then(registration => {
              console.log('Service Worker registered:', registration);
            })
            .catch(error => {
              console.error('Service Worker registration failed:', error);
            });
        });
      }
      
      
    
    const getAlbumImage = (song) => {
        const songGenre = song.songGenre;
        const fImg = myAlbums.find(albm => albm.albumName === songGenre);

        if(fImg){
            return fImg.albumImage;
        }

        return null;
    }

    const inquireAction = (message, callback) => {
        confirmationText.innerHTML = `<p>${message}</p>`;
        toggleClassList(confirmationOverlay, "active", true);

        confirmationAcceptButtons.onclick = () => {
            callback();
            toggleClassList(confirmationOverlay, "active", false,);
        };

        confirmationDeclineButtons.onclick = () => {
            toggleClassList(confirmationOverlay, "active", false);

            if(currentSection && currentSection.id === "Playlist") {
                ShowCurrentSection(0);
            }
        };
        
    }

    function getCurrentSong(sid,index){
        songFromUrl.sid = sid;
        songFromUrl.index = index;

        togglePlaylist = true;
        updateAddressbar();

        markElement(index);
        const song = mysongs.find(s => s.songId === songFromUrl.sid)
        if(song) {
            playSongAsCurrent(song, index);
            
        }

        const sids = songFromUrl.sid;
        const songIdExist = likedSongs.find(id => id === sids);

        toggleClassList(likeIcon, "Love", !!songIdExist);

    }

    

    const shuffleArray = (arr) => {
        let shuffledArr = [...arr];

        for(let i = shuffledArr.length - 1; i > 0; i--){
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [shuffledArr[i], shuffledArr[randomIndex]] = [shuffledArr[randomIndex], shuffledArr[i]];  
        }

        return shuffledArr;
    }

    Hmenu.onclick = (event) => {
        event.stopPropagation();
        isMenuShown = !isMenuShown;

        toggleClassList(navigations, "active", isMenuShown);

        document.addEventListener('click', (e) => {
            if(!e.target.classList.contains(".navigations")){
                isMenuShown = false;
                toggleClassList(navigations, "active", isMenuShown);
                toggleClassList(Hmenu, "active", isMenuShown);

            }
        }, {once:true});

        toggleClassList(Hmenu, "active", isMenuShown);
    }

    navLinks.forEach(nav => {
        nav.onclick = () => {
            const navAttr = nav.getAttribute('data-match');
            
            const indexOfSect  = Array.from(allSections).findIndex(sect => sect.id === navAttr);
            if(indexOfSect !== -1){
                ShowCurrentSection(indexOfSect);
            }
            else{
                ShowCurrentSection(0);
            }
            

           toggleClassList(navigations, "active", false);
            isMenuShown = false;
        }
    });

    function handleSongDetails(songSid, songIndex){
        const songSids = songSid === "null" ? null : songSid;
        const newSongIndex = songIndex === "NaN" ? NaN : songIndex;

        renderPlaylist();

        if(!songSids && isNaN(newSongIndex)) {
           if(songBatches.length > 0){
                sessionStorage.removeItem("currentTime");
                renderSongs();
                return;
           }
        }


        if(currentAudioPlaying?.audio && currentAudioPlaying?.isPlaying) return;

        const songIdExist = songBatches.find(id => id === songSid);
        
         // Case when the song is in songBatches
         if(songIdExist){
            
            const song = mysongs.find(s => s.songId === songFromUrl.sid);
            const actualIndex = songBatches.indexOf(songSids) + 1;
            if(song){
                songFromUrl.index = actualIndex;
                markElement(actualIndex);
                renderSongs();
                let ct;
                if(currentAudioPlaying){
                    ct = currentAudioPlaying.ct.cttime;
                }

                getCurrentSong(songIdExist, actualIndex);
            
            }
            
        }
        else{
            const songIsInList = mysongs.find(s => s.songId === songSid);

            if(songIsInList){
                
                const sid = songIsInList.songId;
                
                const  idExist = songBatches.find(id => id === sid);
                if (!idExist) {
                    if (songIndex > songBatches.length) {
                        songBatches.push(sid); // Add at the end
                        songIndex = songBatches.length; // ✅ Update to match the last position
                    } else {
                        songBatches.splice(songIndex - 1, 0, sid); // Add at the correct index
                    }
                
                    // ✅ Update songFromUrl object
                    songFromUrl.sid = sid;
                    songFromUrl.index = songIndex;
                
                    // ✅ Update the address bar
                    updateAddressbar();
                    renderSongs();
                    markElement(songIndex);
                    getCurrentSong(sid, songIndex);
                }
                
 
                const idInBatch = songBatches.some(id => id === sid);
                if(idInBatch){
                    saveToSessionStorage(songBatches,"songBatches");
                    renderSongs();
                    markElement(songIndex);
                    let ct;
                    if(currentAudioPlaying){
                        ct = currentAudioPlaying.ct.cttime;
                    }
    
                    getCurrentSong(sid, songIndex);
                }
            }
            else{
                renderSongs();

            }
        }


    }

    function  handlePlaylistDetails(pid, number) {
        const playlistId = (pid === "null" || pid === "undefined") ? null : pid;
        const playlistNumber = (number === "NaN" || number === "null") ? NaN : Number(number);

        renderPlaylist();

        if(!playlistId || isNaN(playlistNumber)) {
            toggleClassList(defaultdiv, "active", true);
            return;
        };

        updateAddressbar();
        const p = allPlayLists.find(pl => pl.pid === playlistId);

        if(p) {
            const allSongs = mysongs.filter(s => p.songIds.includes(s.songId));
            playlistFromUrl.number = playlistNumber > p.songIds.length ? 1 : playlistNumber;
            getCurrentplaylist(p, allSongs,playlistFromUrl.number);
             
        }
        else{
            ShowCurrentSection(0);
        }       
    }

    const xlrs = ["#5bc589","#7ea10a", "#1f95cc", "#f9f9f9", "#2eeb80", "#e4b43d", "#3dda9b", "#cca34d"];
    const darkColors = [
        "#0b0a30", // deep midnight blue
        "#1a1e3f", // dark indigo
        "#1b2a41", // rich navy
        "#241c1c", // dark brownish red
        "#1e2d24", // deep forest green
        "#2d1e40", // royal deep purple
        "#0f2c2c", // dark teal
        "#2a0d1f", // wine / burgundy tone
        "#171a21", // steam dark theme kind of color
        "#0d0c1d", // night sky purple
        "#1a1b2f", // dark sapphire
        "#2c1f33", // muted eggplant
        "#13232f", // slate blue
        "#101820", // charcoal navy
        "#2e1a47", // muted violet
      ];
      
    
    const menu = document.querySelector('.mini-song-menu');

    let isDragging = false;
    let initialX = 0;
    let offsetX = 0;

    menu.addEventListener('mousedown', (e) => {
        isDragging = true;
        initialX = e.clientX - offsetX; // Store the initial mouse position
        menu.style.transition = 'none'; // Disable smooth transition while dragging
        menu.style.cursor = 'grabbing'; // Change cursor while dragging
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const currentX = e.clientX;
            offsetX = currentX - initialX; // Calculate the new position
            const maxX = window.innerWidth - menu.offsetWidth; // Prevent menu from going off-screen
            if (offsetX < 0) {
                offsetX = 0; // Prevent going past the left side
            } else if (offsetX > maxX) {
                offsetX = maxX; // Prevent going past the right side
            }

            menu.style.left = `${offsetX}px`; // Set the new horizontal position
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        menu.style.transition = 'left 0.3s ease'; // Re-enable smooth transition after dragging
        menu.style.cursor = 'grab'; // Revert to grab cursor
    });


    
    function createSessionSongBatches() {
        const quantity = [];
        const allSongarray = shuffleArray(mysongs);

        for (let i = 20; i <= 81; i++) {
            if (i % 4 === 0 && i % 3 === 0) {
                quantity.push(i);
            }
        }

        const selectedQuantity = quantity[getRandomFigure(quantity.length)];

        let newArr = [];

        const methods = [
            { fname: "20randomSelector", action: () => {
                for (let i = 0; i < 20; i++) {
                    const randomIndex = getRandomFigure(mysongs.length);
                    newArr.push(allSongarray[randomIndex]);
                }
            }},
        
            { fname: "topN", action: () => {
                newArr.push(...allSongarray.slice(0, 20)); // Takes top `selectedQuantity` items
            }},
        
            { fname: "bottomN", action: () => {
                newArr.push(...allSongarray.slice(-20)); // Takes last `selectedQuantity` items
            }},
        
            { fname: "evenItems", action: () => {
                newArr.push(...allSongarray.filter((_, i) => i % 2 === 0).slice(0, 20));
            }},
        
            { fname: "oddItems", action: () => {
                newArr.push(...allSongarray.filter((_, i) => i % 2 !== 0).slice(0, 20));
            }},
        
            { fname: "shuffleN", action: () => {
                let shuffled = shuffleArray([...allSongarray]);
                newArr.push(...shuffled.slice(0, 10)); // Random N songs
            }},
        
            { fname: "genreBased", action: () => {
                let genre = allSongarray[getRandomFigure(allSongarray.length)]?.songGenre || "Unknown"; // Pick the first song's genre (or fallback)
                let genreSongs = allSongarray.filter(song => song.songGenre === genre);
                newArr.push(...genreSongs.slice(0, 10));
            }},
            { fname: "moodBased", action: () => {
                let mood = allSongarray[getRandomFigure(allSongarray.length)]?.songMood || "Unknown"; // Pick the first song's genre (or fallback)
                let moodSongs = allSongarray.filter(song => Array.isArray(song.songMood) && song.songMood.includes(mood));
                newArr.push(...moodSongs.slice(0, 10));
            }},
            { fname: "Epic", action: () => {
                let randomGenre = myMoods[10].mood;
                let genreSongs = allSongarray.filter(song => song.songMood === randomGenre);
                newArr.push(...genreSongs.slice(0, genreSongs.length > 20 ? 20 : genreSongs.length));
            }},
            { fname: "randomAlbum", action: () => {
                let randomAlbum = myAlbums[getRandomFigure(myAlbums.length)].albumName;
                let albumSongs = allSongarray.filter(song => song.songGenre === randomAlbum);
                newArr.push(...albumSongs.slice(0, 20));
            }},
            { fname: "randomArtist", action: () => {
                let randomArtist = "Thomas Bergersen"
                let artistSongs = allSongarray.filter(song => song.songArtist1 === randomArtist || song.songArtist2 === randomArtist);
                newArr.push(...artistSongs.slice(0, artistSongs.length > 10 ? 10 : artistSongs.length));
            }},
            { fname: "Tsfh", action: () => {
                let genre = "Two Steps From Hell";
                let tsfhSongs = allSongarray.filter(song => song.songGenre === genre);
                newArr.push(...tsfhSongs.slice(0, tsfhSongs.length > 20 ? 20 : tsfhSongs.length));
            }},
            { fname: "Rnbs", action: () => {
                let genre = "RnB";
                let tsfhSongs = allSongarray.filter(song => song.songGenre === genre);
                newArr.push(...tsfhSongs.slice(0, tsfhSongs.length > 20 ? 20 : tsfhSongs.length));
            }},

        ];

        
        if(songBatches.length === 0) {
            methods.forEach(m => {
                if(typeof m.action === "function"){
                    m.action();
                }
            });

            
    
             // Remove duplicates efficiently using a Set
            newArr = [...new Map(newArr.map(song => [song.songId, song])).values()];

            // Shuffle the final song list
            const shuffled = shuffleArray(newArr);

            // Convert listenedSongs to a Set for fast lookup
            const listenedSet = new Set(listenedSongs);

            // Only include songs not in listenedSongs
            const unlistenedSongs = shuffled.filter(song => !listenedSet.has(song.songId));

            // Then map and slice
            const allsongIds = unlistenedSongs.map(s => s.songId).slice(0, selectedQuantity);


            songBatches.unshift(...allsongIds);
    
            saveToSessionStorage(songBatches,"songBatches");
        }
    }

   function refreshSongBatches() {
        const  message = "Do you really want to refresh your recommendation ?";
        const callback = () => {

            renderSongs();

            if(currentAudioPlaying && currentAudioPlaying.audio){
                currentAudioPlaying.audio.pause();
                currentAudioPlaying.isPlaying = false;
                updatePlaybuttons(false);
            }
            togglePlaylist = false;
            songFromUrl.sid = songBatches[0]
            songFromUrl.index = 1;
            ShowCurrentSection(0);
            handleSongDetails(songFromUrl.sid, songFromUrl.index);
        }

        inquireAction(message, callback);
   }
    
    
    function createPlaylistBatches() {

        if(playlistBatches.length > 0) return;

        let newlists = [];
    
        myMoods.forEach(moodObj => {
            
            let filteredSongs = mysongs.filter(song => 
                Array.isArray(song.songMood) && song.songMood.includes(moodObj.mood)
            );

            if (filteredSongs.length > 0) {
                let shuffledSongs = shuffleArray(filteredSongs);
                let playlistSongs = shuffledSongs.length > 10 ? shuffledSongs.slice(0, shuffledSongs.length / 2) : shuffledSongs;
    
                let newPlaylist = {
                    name: moodObj.mood,
                    songIds: playlistSongs.map(s => s.songId),
                    pid: crypto.randomUUID(),
                    pImg: moodObj.img,
                    system: true,
                    tooltip: moodObj.description
                };
                
                
                newlists.unshift(newPlaylist);
            }
        });
    
        playlistBatches = [...newlists];
        saveToSessionStorage(playlistBatches, 'playlistBatches');
    }
    
    function renderSongs() {
        songsContainer.innerHTML = '';
    
        songBatches.forEach((sng, i) => {
            const song = mysongs.find(s => s.songId === sng);
            if (song) {
                displaySongs(song, i);
            }
        });
    
       
        musicHeadines.textContent = `${songBatches.length} songs`;
    
    }
    

    filterMusicBtn.onclick = (e) => {
        e.stopPropagation();
        showFiltersOptions()
    };

    function renderPlaylist() {
        playListContainer.innerHTML = '';
    
        // Create an array to store playlists
        allPlayLists = [...playlistBatches]; // Start with playlistBatches
        
        // ✅ Remove null values from likedSongs array
        likedSongs = likedSongs.filter(songId => songId !== null); // Remove null values

    
        // ✅ Add LikedSongsPlaylist ONLY if there are liked songs
        if (Array.isArray(likedSongs) && likedSongs.length > 0) {
            let LikedSongsPlaylist = {
                name: "Liked Songs",
                songIds: likedSongs,
                pid: localStorage.getItem('likedSongsPid') || crypto.randomUUID(),
                pImg: "logo.png",
                system: true,
                tooltip: "Songs you love belong on your shelf"
            };

            // Save the LikedSongs pid to localStorage
            localStorage.setItem('likedSongsPid', LikedSongsPlaylist.pid);

            if (!Array.isArray(allPlayLists)) allPlayLists = []; // Ensure it's an array

            allPlayLists.unshift(LikedSongsPlaylist); // Add at the beginning

            
        }
        
    
        // ✅ Add user-created playlists ONLY if there are any
        if (userplayList.length > 0) {
            userplayList = shuffleArray(userplayList);
            allPlayLists = [...userplayList, ...allPlayLists]; // Add user playlists before batches
        }
    
        // If no playlists exist, show a message instead
        if (allPlayLists.length === 0) {
            console.warn("No playlists available to render.");
            playListContainer.innerHTML = "<p>No playlists found</p>";
            toggleClassList(defaultdiv, "active", true);
            return;
        }
    
        allPlayLists.forEach(p => {
            displayPlaylists(p);
        });

    }
    
    function showBottomTooltip(message) {
        const bottomTooltip = document.createElement("div");
        bottomTooltip.className = "bottom-tooltip";
        bottomTooltip.innerHTML = `<span>${message}</span>`;
    
        document.body.appendChild(bottomTooltip);
    
        // Trigger animation and auto-remove
        setTimeout(() => {
            bottomTooltip.classList.add("visible");
        }, 10);
    
        setTimeout(() => {
            bottomTooltip.classList.remove("visible");
            setTimeout(() => {
                bottomTooltip.remove();
            }, 300); // Allow fade-out animation to finish
        }, 3000);
    }
    

    function displaySongs(song,i) {
        
       if (!song) return; // ✅ Handle null or invalid song data
    
        const newLi = document.createElement('li');
            
        newLi.setAttribute("data-song-label", song.songId);
        const img =  getAlbumImage(song);

        newLi.title = `${song.songName} - ${song.songArtist1} & ${song.songArtist2 ? song.songArtist2 : ""}`;
        const userPreferColor = getComputedStyle(document.documentElement).getPropertyValue('--user-prefer-color').trim();
        const selectedColor = userPreferColor === "dark" ? darkColors : xlrs;
        newLi.style.background = selectedColor[getRandomFigure(selectedColor.length)];
    
        newLi.innerHTML = `
            <div class="song-name">
            <span><strong>${i + 1}</strong>. ${song.songKeyWord}</span>
            </div>
            <div class="song-image">
            <img src="${img}" alt="${song.songId}">
            </div>
            <div class="song-detail">
            <span>&hellip;</span>  
            </div>`;
    
        songsContainer.appendChild(newLi);

        const moreBtn = newLi.querySelector('.song-detail');

        

        const args = [
            {text: "Play", callback: () => {

                if(currentAudioPlaying && currentAudioPlaying.audio){
                    currentAudioPlaying.audio.pause();
                    currentAudioPlaying.isPlaying = false;
                }

                const index = Array.from(songsContainer.querySelectorAll('li')).findIndex(li => li.getAttribute('data-song-label') === songId);
                if(index !== -1) {
                    getCurrentSong(songId, index + 1);
                }
            }, icon: "&#9654;",
            },
            {text: "Add to Playlist",  callback: () => {showplaylistMenu()}, icon:"&#10010;"},
            {text: "Like", icon:"&#10084;", callback: () => {
                const songIdExist = likedSongs.find(id => id === songId);
                if(songIdExist){
                    likedSongs = likedSongs.filter(id => id !== songId);
                    
                }
                else{
                    likedSongs.push(songId);
                    
                }
                toggleClassList(likeIcon, "Love", !songIdExist);
                saveToSessionStorage(likedSongs, "LikedSongs");
                renderPlaylist();
            }},

            {text:"Download", callback: () => {showDownloadMenu(song)}, icon:"&#8681;"},
            {text: "Share", callback: () => {showShareMenu(song)}, icon:"&#128206;"},
        ]

        moreBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            movableMenu(...args);

        }
    
        const songId = song.songId;
        
        newLi.onclick = () => {
            const index = Array.from(songsContainer.querySelectorAll('li')).findIndex(li => li.getAttribute('data-song-label') === songId);
            if(index !== -1) {
                getCurrentSong(songId, index + 1);
            }
        };

        newLi.onmouseover = (e) => {
            const text = `${song.songName} - ${song.songArtist1} ${song.songArtist2 ? " & " + song.songArtist2 : ""}`;
            tooltipDiv(text, e , true);
        }
        newLi.onmouseleave = (e) => {
            tooltipDiv("", e , false);
        }
        newLi.onmousemove = (e) => {
            const text = `${song.songName} - ${song.songArtist1}  ${song.songArtist2 ? " & " + song.songArtist2 : ""}`;
            tooltipDiv(text, e , true);
        }
        newLi.onmouseout = (e) => {
            tooltipDiv("", e , false);
        }

        newLi.oncontextmenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
            movableMenu(...args);
        }


        function showplaylistMenu() {
            playlistPatContainer.innerHTML = '';
        
            const nonSystemPlaylists = userplayList.filter(p => !p.system);

                if (nonSystemPlaylists.length === 0) {
                    toggleClassList(playlistPlatformOverlay, "active", false);
        
                   const  message = "Your playlist shelf is empty for now. Shall we create your first one together?";
                   const callback = () => createUserPlaylist();

                   inquireAction(message, callback);
                    return;
                }

                
            userplayList.forEach(p => {
                if(p.system) return;
                
                

                const newLi = document.createElement('li');
                newLi.setAttribute("data-playlist-label", p.pid);
        
                // Create checkbox and check if song already exists in the playlist
                const isSongInPlaylist = p.songIds.includes(song.songId);
                newLi.innerHTML = `<span>${p.name}</span> <input type="checkbox" id="${p.pid}" ${isSongInPlaylist ? 'checked' : ''} />`;
        
                playlistPatContainer.appendChild(newLi);
        
                const checkbox = newLi.querySelector('input[type="checkbox"]');
        
                newLi.onclick = (e) => {
                    e.stopPropagation();
                    checkbox.checked = !checkbox.checked;
                    updateDoneButtonState();
                };
        
                checkbox.onclick = (e) => {
                    e.stopPropagation();
                    const checked = checkbox.checked;
        
                    if (checked) {
                        // Add song to playlist
                        p.songIds.push(song.songId);
                    } else {
                        // Remove song from playlist
                        p.songIds = p.songIds.filter(id => id !== song.songId);
                    }
        
                    p.songIds = [...new Set(p.songIds)]; // Remove duplicates
                    toggleClassList(newLi, "checked", checked);
                    updateDoneButtonState();
                };
            });
        
            toggleClassList(playlistPlatformOverlay, "active", true);
        
            // Enable/disable the "Done" button based on checkbox selection
            updateDoneButtonState();
        
            function updateDoneButtonState() {
                const anyChecked = Array.from(playlistPatContainer.querySelectorAll('input[type="checkbox"]')).some(cb => cb.checked);
                playlistPlatDone.disabled = !anyChecked;
            }
        
            // Handle the "Done" button click
            playlistPlatDone.onclick = () => {
                // Save updated playlists to local storage
                saveToLocalStorage(userplayList, "UserPlaylist");
                toggleClassList(playlistPlatformOverlay, "active", false);
                renderPlaylist();
            };
        
            // Handle the "Exit" button click
            playlistPlatExit.onclick = () => {
                toggleClassList(playlistPlatformOverlay, "active", false);
            };
        }
        

        function showDownloadMenu(song) {
            const  password = "Lorem_Ipsum_Dolor_100"; 

            toggleClassList(authOverlay, "active", true);

            authInput.oninput = () => {
                const value = authInput.value.trim();
                authDone.disabled = value.length === 0;
            };
            

            authExit.onclick = () => {
                authInput.value = "";
                authDone.disabled = true;
                toggleClassList(authOverlay, "active", false);

            };

            authDone.onclick = () => {
                if(authInput.value.trim() === password){
                    const downloadLink = document.createElement('a');
                    downloadLink.href = song.songUrl;
                    downloadLink.download = `${song.songKeyWord} - ${song.songArtist1}.mp3`;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    authInput.value = "";
                    document.body.removeChild(downloadLink);
                    authDone.disabled = true;
                    toggleClassList(authOverlay, "active", false);
                }
                else{
                    authInput.value = "";
                    authDone.disabled = true;
                    toggleClassList(authOverlay, "active", false);
                    authInput.placeholder = "Wrong Password";
                    setTimeout(() => {
                        authInput.placeholder = "Enter Password";
                    }, 2000);
                    authInput.focus();
                }
            }
        }

        function showShareMenu(song) {
            toggleClassList(shareOverlay, "active", true);
        
            shareExit.onclick = () => {
                toggleClassList(shareOverlay, "active", false); 
            }
            
            const songName = song.songName;
            const songArtist = song.songArtist1;
            const songArtist2 = song.songArtist2 ? ", " + song.songArtist2 : "";
            const songImg = getAlbumImage(song);
            const songId = song.songId;
        
        
            const currentPath = window.location.pathname;

            // Create the shareable link by appending the sid parameter, ensuring only one slash between path segments
            const shareLink = `${window.location.origin}${currentPath.replace(/\/$/, '')}/share/?sid=${encodeURIComponent(songId)}`;

          


        
            sharingDiv.innerHTML = ''; // Clear previous content
        
            const shareableLink = document.createElement("div");
            shareableLink.classList.add("share-preview");
        
            shareableLink.innerHTML = `
                <div class="share-box">
                    <div" class="share-link">
                        <img src="${songImg}" alt="Album Art">
                        <div class="share-text">
                            <span>${songArtist}${songArtist2}</span>
                            <strong>${songName}</strong>
                        </div>
                    </div>
                    <div class="copy-link-section">
                        <input type="text" value="${shareLink}" id="copySongLinkInput" readonly />
                        <button id="copySongLinkBtn">Copy Link</button>
                    </div>
                </div>
            `;
        
            sharingDiv.appendChild(shareableLink);
        
            // Add event listener for copy button
            setTimeout(() => {
                const copyBtn = document.getElementById("copySongLinkBtn");
                const inputField = document.getElementById("copySongLinkInput");
        
                inputField.readOnly = true; // not inputField.readonly

                copyBtn.onclick = async () => {
                    try {
                        await navigator.clipboard.writeText(inputField.value);
                        copyBtn.innerText = "Copied!";
                        setTimeout(() => copyBtn.innerText = "Copy Link", 2000);
                    } catch (err) {
                        console.error("Failed to copy: ", err);
                        copyBtn.innerText = "Failed";
                        setTimeout(() => copyBtn.innerText = "Copy Link", 2000);
                    }
                };
                
            }, 100);
        }
        
        
        let observer;

        function setupObserver() {
            if (observer) observer.disconnect(); // cleanup existing observer
        
            observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const text = entry.target.dataset.songName;
                        showBottomTooltip(text);
                    }
                });
            }, { root: null, threshold: 0.8 });
        
            const allSongEl = songsContainer.querySelectorAll('li');
        
            allSongEl.forEach(li => {
                const liSongId = li.getAttribute('data-song-label');
                const lisong = mysongs.find(s => s.songId === liSongId);
                if (lisong) {
                    li.dataset.songName = `${lisong.songName} - ${lisong.songArtist1} ${lisong.songArtist2 ? " & " + lisong.songArtist2 : ""}`;
                }
                observer.observe(li);
            });
        }
        
        function handleResize() {
            if (window.innerWidth < 768) {
                setupObserver();
            } else if (observer) {
                observer.disconnect(); // remove observer on wider screens
            }
        }
        
        // Initial run
        if (window.innerWidth < 768) {
            setupObserver();
        }
        
        // Listen to window resize
        window.addEventListener('resize', handleResize);
            
    }

    function displayPlaylists(p) {
        
        if (!p) return; // ✅ Handle null or invalid playlist data
     
         const newLi = document.createElement('li');
             
         newLi.setAttribute("data-playlist-label", p.pid);

         

         
         const playlistImg = p.pImg || 'logo.png';


     
         newLi.innerHTML = `
             <div class="song-name">
                 <span>${p.name}</span>
             </div>
             <div class="song-image">
                <img src="${playlistImg}" alt="Playlist Image" onError="this.onerror=null;this.src='logo.png';">

             </div>
             <div class="song-detail">
              <span>Playlist ( ${p.songIds.length} songs )</span>
             </div>`;
     
         playListContainer.appendChild(newLi);

         if(p.tooltip){
            newLi.onmouseenter = (e) => {
                tooltipDiv(p.tooltip, e, true)
            }

            newLi.onmouseover = (e) => {
                tooltipDiv(p.tooltip, e, true)
            }
            newLi.onmouseleave = (e) => {
                tooltipDiv("", e , false);
            }
            newLi.onmousemove = (e) => {
                tooltipDiv(p.tooltip, e, true)
            }
            newLi.onmouseout = (e) => {
                tooltipDiv("", e , false);
            }
         }
             
         newLi.onclick = () => {

           
            if (!p) {
                console.error('Playlist object is undefined!');
                return;  // Exit early if 'p' is undefined
            }
            
        
            ShowCurrentSection(3);
            const allSongs = mysongs.filter(s => p.songIds.includes(s.songId)); // ✅ Use songId 
                getCurrentplaylist(p, allSongs, 1);
        };
        
             
    }

    function markElement(index) {
        const newIndex = index - 1;

        const allSongEl = songsContainer.querySelectorAll('li');
        const assumedLi = allSongEl[newIndex];

        allSongEl.forEach(li => toggleClassList(li, "Playing", false));

        allSongEl.forEach( li =>  {
            const moreBtn = li.querySelector(".song-detail");
            if (moreBtn) moreBtn.classList.remove("disabled");
        })

        const foundIndex = Array.from(allSongEl).findIndex(li => li.getAttribute('data-song-label') === assumedLi.getAttribute('data-song-label'));

        if(foundIndex !== -1){
            toggleClassList(allSongEl[foundIndex], "Playing", true);

            const moreBtn = allSongEl[foundIndex].querySelector(".song-detail");
            if (moreBtn) moreBtn.classList.add("disabled");

            allSongEl[foundIndex].oncontextmenu = (e) => {
                e.preventDefault();
                // Do nothing — no movableMenu, no event bubbling
            };
            


            allSongEl[foundIndex].scrollIntoView({behavior:"smooth", block:"center"});
        }

        toggleFullMusicMode();
    }

    function playSongAsCurrent(song, index) {
        const newIndex = index - 1;

        minisongTitle.innerHTML = `<p>${index}.${song.songKeyWord}</p>`;
        toggleClassList(miniMenu, "active", true);

        document.title = index + ".  " + song.songName;

        const audio = new Audio(song.songUrl);

        toggleplay(audio);

        updateprevNnextBtns(newIndex);
    }

    function toggleplay(audio) {
        if(currentAudioPlaying &&currentAudioPlaying.audio && currentAudioPlaying.audio !== audio){
            currentAudioPlaying.audio.pause();
            currentAudioPlaying.isPlaying = false;
            currentAudioPlaying.ct = { ctid: null, cttime: 0 };
            currentAudioPlaying.audio.muted = false;
            currentAudioPlaying.audio.loop = false;
            toggleClassList(loopIcon, "active", false);
            toggleClassList(muteIcon, "active",false);
        }

        currentAudioPlaying.audio = audio;
        currentAudioPlaying.sid = songFromUrl.sid;
        const savedCt = currentAudioPlaying.ct;

        const song = mysongs.find(s => s.songId === currentAudioPlaying.sid)
        
        
        if (currentAudioPlaying.isLooping.lpid === currentAudioPlaying.sid) {
            let isLooping = currentAudioPlaying.isLooping.looped === "true";
            currentAudioPlaying.audio.loop = isLooping;
            toggleClassList(loopIcon, "active", isLooping);
            toggleClassList(miniLoopBtn, "active", isLooping);
            if(isLooping){
                miniLoopBtn.click();
                miniLoopBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i>';
                loopIcon.innerHTML = '<i class="fa-solid fa-rotate-left"></i>';
            }
            else{
                miniLoopBtn.innerHTML = '<i class="fa-solid fa-repeat"></i>';
                loopIcon.innerHTML = '<i class="fa-solid fa-repeat"></i>';
            }

        } else {
            currentAudioPlaying.audio.loop = false;
            toggleClassList(loopIcon, "active", false);
            toggleClassList(miniLoopBtn, "active", false);
            updateFnBButtons(false);
        }

        // Check if there's a saved time for the current song
        if(savedCt.ctid === currentAudioPlaying.sid) {
            currentAudioPlaying.audio.currentTime = savedCt.cttime; // Set the saved currentTime
        }

        currentAudioPlaying.audio.play().catch((err)=> {
            const message = `Do you want to ${savedCt.cttime > 0 ? "Resume" : "Play"} ${song ? song.songName : ""}`;
            const callback = () => {
                currentAudioPlaying.audio.play();
            }

            inquireAction(message, callback);
        });
        
        

        currentAudioPlaying.audio.addEventListener('playing', () => {
            currentAudioPlaying.isPlaying = true;
            updatePlaybuttons(true);
            toggleClassList(confirmationOverlay, "active", false);
            toggleClassList(loadingoverlay, "active", false);

            document.title = songFromUrl.index + ".  " + song.songName;
        });

        currentAudioPlaying.audio.addEventListener('timeupdate', () => {
            updateSongProgress();
        });

        currentAudioPlaying.audio.addEventListener('error', () => {
            currentAudioPlaying.isPlaying = false;
            updatePlaybuttons(false);
            toggleClassList(loadingoverlay, "active", true);

            document.title = "Error Playing Song";

            const  message = `The song ${song ? song.songName : ""} isn't available. Can we Play next`;
            const callback = () => {
                const allSongEl = songsContainer.querySelectorAll('li');
                if(songFromUrl && songFromUrl.index){
                    const ind = songFromUrl.index;

                    if(ind === 0){
                        toggleNextorPrev (ldir);
                    }

                    if(ind < allSongEl.length) {
                        toggleNextorPrev(rdir);
                    }
                }
            }

            inquireAction(message, callback);
        });

        currentAudioPlaying.audio.addEventListener('waiting', () => {
            currentAudioPlaying.isPlaying = false;
            updatePlaybuttons(false);
            toggleClassList(loadingoverlay, "active", true);
            document.title = "Just a moment...";
        });

        currentAudioPlaying.audio.addEventListener('stalled', () => {
            currentAudioPlaying.isPlaying = false;
            updatePlaybuttons(false);
            toggleClassList(loadingoverlay, "active", true);
            document.title = "Just a moment...";
        });

        currentAudioPlaying.audio.addEventListener('ended', () => {
            currentAudioPlaying.isPlaying = false;
            miniProgressbar.style.width = 0;
            updatePlaybuttons(false);
            toggleClassList(loadingoverlay, "active", false);
            const isLooping = currentAudioPlaying.audio.loop;
            document.title = "AllegroVastum - Curated Music Collection | Personal Music Sanctuary";

            if(!isLooping){
                const allSongEl = songsContainer.querySelectorAll('li');
                if(songFromUrl && songFromUrl.index){
                    const ind = songFromUrl.index;
                    if(ind < allSongEl.length) {
                        toggleNextorPrev(rdir);
                    }
                }
                
                
            }

            // Use Set to ensure no duplicate song IDs are added to the listenedSongs
            const listenedSongsSet = new Set(listenedSongs);
            
            listenedSongsSet.add(currentAudioPlaying.sid);
            
            // Limit to 100 max songs
            if (listenedSongsSet.size > 200) {
                listenedSongsSet.clear();
            }
            
            listenedSongs = [...listenedSongsSet];            

        });

        window.addEventListener('beforeunload', () => {
            const newCts = {
                ctid: currentAudioPlaying.sid,
                cttime: currentAudioPlaying.audio.currentTime
            }
            saveToSessionStorage(newCts, "currentTime");
        });
        

        playlistProBar.parentElement.onclick = (e) => {
            const dist = playlistProBar.parentElement.clientWidth;
            const clickedX = e.offsetX;
            const dur = currentAudioPlaying.audio.duration;

            currentAudioPlaying.audio.currentTime = (clickedX / dist) * dur;
        }
    }

    function updatePlaybuttons(state) {
        miniplayBtn.innerHTML = state ? "&#10074;&#10074;" : "&#9654;"
        playIcon.innerHTML = state ? "&#10074;&#10074;" : "&#9654;"

        toggleClassList(playIcon, "active", state);
        toggleClassList(miniplayBtn, "active", state);
    }

   

    function updateSongProgress() {
        if(currentAudioPlaying && currentAudioPlaying.audio){
            const duration = currentAudioPlaying.audio.duration;
            const cTime  = currentAudioPlaying.audio.currentTime;

            const percent = (cTime / duration) * 100;


            miniProgressbar.style.width = `${percent}%`;
            playlistProBar.style.width = `${percent}%`;

            hihghLighcontainer.innerHTML = `<span>${formatTime(cTime)}</span> / <span>${formatTime(duration) ?? "00:00" }</span>`

        }
     }

    function updateprevNnextBtns(index) {
        const allSongEl = songsContainer.querySelectorAll('li');

        miniNextBtn.disabled = index === allSongEl.length - 1;
        miniPrevBtn.disabled = index === 0;
    }

    function updateFnBButtons(state){
        miniNextBtn.disabled = state;
        miniPrevBtn.disabled = state;
    }

    miniplayBtn.onclick = () => toggleAudio();
    playIcon.onclick = () => toggleAudio();

    miniNextBtn.onclick = () => toggleNextorPrev(rdir);
    miniPrevBtn.onclick = () => toggleNextorPrev(ldir);
    minisongTitle.onclick = () => {
        ShowCurrentSection(1);
        toggleFullMusicMode()
    };



    miniLoopBtn.onclick = () => {
        if (currentAudioPlaying.audio) {
            let loopState = !currentAudioPlaying.audio.loop; // Toggle loop
            currentAudioPlaying.audio.loop = loopState;
    
            const newLoopObj = {
                lpid: currentAudioPlaying.sid,
                looped: loopState ? "true" : "false"
            };
    
            sessionStorage.setItem("audioLoop", JSON.stringify(newLoopObj));
            currentAudioPlaying.isLooping = newLoopObj; // Update object
    
            toggleClassList(loopIcon, "active", loopState);
            toggleClassList(miniLoopBtn, "active", loopState);
            updateFnBButtons(loopState);
    
            miniNextBtn.disabled = loopState;
            miniPrevBtn.disabled = loopState;
        }
    };
    

    nextIcon.onclick = () => toggleNextorPrev(rdir);
    prevIcon.onclick = () => toggleNextorPrev(ldir);

    loopIcon.onclick = () => {
        if (currentAudioPlaying.audio) {
            let loopState = !currentAudioPlaying.audio.loop; // Toggle loop
            currentAudioPlaying.audio.loop = loopState;
    
            const newLoopObj = {
                lpid: currentAudioPlaying.sid,
                looped: loopState ? "true" : "false"
            };
    
            sessionStorage.setItem("audioLoop", JSON.stringify(newLoopObj));
            currentAudioPlaying.isLooping = newLoopObj; // Update object
    
            toggleClassList(loopIcon, "active", loopState);
            toggleClassList(miniLoopBtn, "active", loopState);
            updateFnBButtons(loopState);
    
            miniNextBtn.disabled = loopState;
            miniPrevBtn.disabled = loopState;
        }
    }

    muteIcon.onclick = () => {
        if(currentAudioPlaying && currentAudioPlaying.audio){
            if(currentAudioPlaying.audio.muted){
                currentAudioPlaying.audio.muted = false;
                toggleClassList(muteIcon, "active", false);
            }
            else{
                currentAudioPlaying.audio.muted = true;
                toggleClassList(muteIcon, "active", true);
            }

            muteIcon.innerHTML = currentAudioPlaying.audio.muted ? "&#128264;" : "&#128266;";
        }
    }

    likeIcon.onclick = () => {
        if (currentAudioPlaying && currentAudioPlaying.sid) {
            const sid = currentAudioPlaying.sid;
            const songIdExist = likedSongs.find(id => id === sid);
    
            if (songIdExist) {
                likedSongs = likedSongs.filter(ls => ls !== sid);
            } else {
                likedSongs.unshift(sid); // this should be sid, not songIdExist
            }
    
            toggleClassList(likeIcon, "Love", !songIdExist);
            saveToLocalStorage(likedSongs, "LikedSongs");
            renderPlaylist();
        }
    };
    
    
    

    fallHomeBtn.onclick = function () {
        toggleClassList(defaultdiv, "active", false);
        ShowCurrentSection(0);

    }

    fallCpBtn.onclick = () =>  {
        createUserPlaylist();
        toggleClassList(defaultdiv, "active", false);
    };

    createPlaylistBtn.onclick = () =>  createUserPlaylist();

    function createUserPlaylist() {
        songfolders.innerHTML = '';
        songField.innerHTML = '';

        myAlbums.forEach(alb => {
            const  albumel = document.createElement('li');
            albumel.textContent = alb.albumName;
            songfolders.appendChild(albumel);
        });

        toggleClassList(playlistOverlay, "active", true);

        const allsongFolders = songfolders.querySelectorAll('li');

        allsongFolders.forEach(sf => {
            sf.addEventListener('click', () => {
                allsongFolders.forEach(sf => toggleClassList(sf, "active", false));

                toggleClassList(sf, "active", true);

                const album = sf.textContent.trim();
                const songsWithSameAlbum = mysongs.filter(s => s.songGenre === album);
                

                if(songsWithSameAlbum.length > 0) {
                    songField.innerHTML = '';
                    songsWithSameAlbum.forEach((s,i) => {renderPlaylistps(s ,i + 1)});
                }
            })
        })

        exitUserpBtn.onclick = () =>  toggleClassList(playlistOverlay, "active", false);

        playlistInput.oninput = () => checkInputAndSongs();
    }

    function renderPlaylistps(song, index){
        const newLi = document.createElement('li');

        newLi.title = song.songName;
        newLi.innerHTML = `<span>${index}. ${song.songKeyWord}</span><input type="checkbox"title="${song.songName}">`;

        songField.appendChild(newLi);
        const checkInput  =  newLi.querySelector('input');

        checkInput.onchange = () => {
            if(checkInput.checked){
                chosenPlaylist.songsIds.unshift(song.songId);
            }
            else{
                chosenPlaylist.songsIds = chosenPlaylist.songsIds.filter(sid => sid !== song.songId);

            }

            checkInputAndSongs();
        };
    }

    function checkInputAndSongs() {
        donePBtn.disabled = playlistInput.value.trim() === '' || chosenPlaylist.songsIds.length === 0;
    }

    donePBtn.onclick = () => {
        chosenPlaylist.name = playlistInput.value.trim(); // Assign the name before using it
    
        const newUserPlaylist = {
            name: chosenPlaylist.name, // Now this has a value
            songIds: [...chosenPlaylist.songsIds],
            pid: crypto.randomUUID(),
            pImg: "logo.png",
        };
    
        if (!Array.isArray(userplayList)) userplayList = [];
        userplayList.push(newUserPlaylist);
    
        saveToLocalStorage(userplayList, "UserPlaylist");
        toggleClassList(playlistOverlay, "active", false);
        renderPlaylist();
    };
    

    function toggleAudio() {
        if(currentAudioPlaying && currentAudioPlaying.audio){
            if(!currentAudioPlaying.audio) return;

            currentAudioPlaying.audio.addEventListener('error', () => {return});
            currentAudioPlaying.audio.addEventListener('stalled', () => {return});

            if(currentAudioPlaying.isPlaying){
                currentAudioPlaying.audio.pause();
                updatePlaybuttons(false);
                currentAudioPlaying.isPlaying = false;
            }
            else{
                currentAudioPlaying.audio.play();
                updatePlaybuttons(true);
                currentAudioPlaying.isPlaying = true;
            }
        }
    }

    function toggleNextorPrev (dir) {
        
        const allSongEl = songsContainer.querySelectorAll('li');

        let currentIndex = null;

        if(songFromUrl && songFromUrl.index){
            currentIndex = songFromUrl.index - 1;
        }
        else{
            
            const assumedIndex = Array.from(allSongEl).findIndex(li => li.classList.contains("Playing"));

            if(assumedIndex !== -1){
                currentIndex = assumedIndex;
            }
        }


        if(dir === rdir) {
            currentIndex = currentIndex + 1;

            if(currentIndex < allSongEl.length) {
                const sid = allSongEl[currentIndex].getAttribute("data-song-label");
                const index = currentIndex + 1;
                getCurrentSong(sid,index)
            }
        }

        if(dir === ldir) {
            currentIndex = currentIndex - 1;

            
            if(currentIndex >= 0 ) {
                const sid = allSongEl[currentIndex].getAttribute("data-song-label");
                const index = currentIndex + 1;
                getCurrentSong(sid,index)
            }
        }
        
    }

    function toggleFullMusicMode() {
        
        if(songFromUrl && songFromUrl.sid) {
            const song = mysongs.find(s => s.songId === songFromUrl.sid);

            if(song) {
                const  img = getAlbumImage(song);
                hihghLighcontainer.parentElement.style.backgroundImage =  `url('${img}')`;
                quoteContainer.innerHTML= `<h2>${song.songName}</h2><span>${vivaldiQuotes[getRandomFigure(vivaldiQuotes.length)]}</span>`;
                
            }

            toggleClassList(likeIcon, "Love", false);

            const sid = songFromUrl.sid
            const songIdExist = likedSongs.find(id => id === sid);

             // Apply the correct like status
            toggleClassList(likeIcon, "Love", !!songIdExist);
            
        }   
    }

    function getCurrentplaylist(p, allSongs , num) {

        togglePlaylist = true;

        playlistFromUrl.pid = p.pid;
        playlistFromUrl.number = num;

        if(isNaN(playlistFromUrl.number)){
            playlistFromUrl.number = 1
        }
        
         // ✅ Clear existing playlist UI before adding new songs
        queuedContainer.innerHTML = ""; 
        
        if (currentAudioPlaying && currentAudioPlaying.audio) {
            currentAudioPlaying.audio.pause();
            currentAudioPlaying.isPlaying = false;
            updatePlaybuttons(false);  // Ensure play buttons are updated
            currentAudioPlaying.audio = null;  // Clear the reference to the old audio
        }

        

        if(allSongs.length > 0) {
            toggleClassList(defaultdiv, "active", false);
        }


        allSongs.forEach((s, i)=> renderPlaylistSongs(s, i));

       
        playCurrentPlaylistSong(allSongs[playlistFromUrl.number - 1],playlistFromUrl.number)

        queuedSongTitle.textContent = p.name;
        const desc  = myMoods.find(m => m.mood === p.name);
        if(desc){
            queuedSongInfo.textContent = desc.description;
        }
        else{
            queuedSongInfo.textContent = "From your playlist.Enjoy!";
        }
        
    }

    function renderPlaylistSongs(song, i) {
        const p  = playlistFromUrl.pid;
        
        const newPDiv = document.createElement('div');
        newPDiv.classList.add('queued-songs-list-item');

        

        newPDiv.setAttribute("data-code", song.songId);

        const img = allPlayLists.find(pl => pl.pid === p.pid)?.pImg || 'logo.png';


       


        newPDiv.innerHTML = `
           <div class="left-item">
                <h3><strong>${i + 1}</strong>. ${song.songName}</h3>
                <span></span>
                <div class="progress-truck">
                <div class="progress-bar"></div>
            </div>
            </div>
            <div class="right-item">
                <div class='play-btn'>
                <span> &#9654;</span>
                </div>
            </div>`;

        queuedContainer.appendChild(newPDiv);
        
       
        const playlistPlayBtn = newPDiv.querySelector('.right-item .play-btn');
       
        
        playlistPlayBtn.style.backgroundImage = `url('${img}')`;
        const songId = song.songId;
        const songExist = mysongs.find(s => s.songId === songId);

        playlistPlayBtn.onclick = () => {
            if(currentSongPlaying && currentSongPlaying.sid && currentSongPlaying.sid === newPDiv.getAttribute('data-code')){
                if(currentSongPlaying.isPlaying){
                    currentSongPlaying.audio.pause();
                    currentSongPlaying.isPlaying = false;
                    upadatePlaylistPlayBtn(playlistPlayBtn.querySelector('span'), false);
                }
                else{
                    currentSongPlaying.audio.play();
                    currentSongPlaying.isPlaying = true;
                    upadatePlaylistPlayBtn(playlistPlayBtn.querySelector('span'), true);
                }
            }
            else{

                if(songExist){
                    const  number = Array.from(queuedContainer.querySelectorAll('.queued-songs-list-item')).findIndex(div => div.getAttribute('data-code') === song.songId);
                    if(number !== -1){
                        playCurrentPlaylistSong(songExist, number + 1,);
                    }
                }
            }

        }


    }
    
    function playCurrentPlaylistSong(song, num) {
        const newIndex = num - 1;
        playlistFromUrl.number = num;

        markPlaying(newIndex);
        const audio = new Audio(song.songUrl);

        const allSongEl = queuedContainer.querySelectorAll('.queued-songs-list-item');

        if (currentSongPlaying && currentSongPlaying.audio) { // Corrected to check currentSongPlaying.audio
            currentSongPlaying.audio.pause();
            currentSongPlaying.isPlaying = false;
        }

        toggleplaylistPlay(audio, song.songId, allSongEl[newIndex]);
        
    
        updateAddressbar();
        const userPreferColor = getComputedStyle(document.documentElement).getPropertyValue('--user-prefer-color').trim();
        const selectedColor = userPreferColor === "dark" ? darkColors : xlrs;
        updateBg(num % selectedColor.length, song);
    }

    function markPlaying(index){
        const allSongEl = queuedContainer.querySelectorAll('.queued-songs-list-item');

        allSongEl.forEach(el => toggleClassList(el, "active", false));

        toggleClassList(allSongEl[index], "active", true);

        allSongEl[index].scrollIntoView({behavior:"smooth", block:"center"});

        allSongEl.forEach(el => {
            const playBtn = el.querySelector('.right-item .play-btn span');
            upadatePlaylistPlayBtn(playBtn,  false);
            const timesPan = el.querySelector('.left-item span');
            timesPan.innerHTML = '';
            const rangeInput = el.querySelector('.left-item .progress-truck .progress-bar');
            rangeInput.style.width = 0;

        })
    }


 

    function  toggleplaylistPlay(audio, sid, markedEl) {
        const playBtn = markedEl.querySelector('.right-item .play-btn span');
        const timesPan = markedEl.querySelector('.left-item span');
        const rangeInput = markedEl.querySelector('.left-item .progress-truck .progress-bar');
        const truck =  markedEl.querySelector('.left-item .progress-truck');



        if(currentSongPlaying && currentSongPlaying.audio && currentSongPlaying.sid && currentSongPlaying.sid !== sid){
            currentSongPlaying.audio.pause();
            currentSongPlaying.isPlaying = false;
            upadatePlaylistPlayBtn(playBtn,  currentSongPlaying.isPlaying);
            currentSongPlaying.pttime.ptime = 0;
        }

        
        currentSongPlaying.audio = audio;
        currentSongPlaying.sid = sid;

        if(currentSongPlaying && currentSongPlaying.pttime.pctid === sid){
            currentSongPlaying.audio.currentTime = currentSongPlaying.pttime.ptime;
        }
        else{
            currentSongPlaying.pttime.ptime = 0;
            currentSongPlaying.audio.currentTime = currentSongPlaying.pttime.ptime;
        }


        currentSongPlaying.audio.play().catch((err) => {
            const song = mysongs.find(s => s.songId === sid)
            const message = `do you want to Play the song: ${song ? song.songName : ""}`;
            const action = () => {
                if(currentSongPlaying && currentSongPlaying.audio){
                    currentSongPlaying.audio.play();
                    currentSongPlaying.isPlaying = true;
                }
            }

            inquireAction(message, action);
        });
       

        
        upadatePlaylistPlayBtn(playBtn,  currentSongPlaying.isPlaying);

        currentSongPlaying.audio.addEventListener("waiting", () => {
            currentSongPlaying.isPlaying = false;
            upadatePlaylistPlayBtn(playBtn, currentSongPlaying.isPlaying);
            toggleClassList(loadingoverlay, "active", true);
        });

        currentSongPlaying.audio.addEventListener("timeupdate", () => {
            const dur = currentSongPlaying.audio.duration ? currentSongPlaying.audio.duration : 0
            timesPan.innerHTML = `<strong>${formatTime(currentSongPlaying.audio.currentTime)}</strong> / <b>${formatTime(dur) ?? "00:00" }</b>`;
            rangeInput.style.width = `${(currentSongPlaying.audio.currentTime / currentSongPlaying.audio.duration) * 100}%`;
        });

        currentSongPlaying.audio.addEventListener("playing", () => {
            currentSongPlaying.isPlaying = true;
            upadatePlaylistPlayBtn(playBtn, currentSongPlaying.isPlaying);
                if(confirmationOverlay){
                    toggleClassList(confirmationOverlay, "active", false)
                }

                toggleClassList(loadingoverlay, "active", false);
        });

        currentSongPlaying.audio.addEventListener("stalled", () => {
            currentSongPlaying.isPlaying = false;
            currentSongPlaying.pttime.ptime = currentSongPlaying.audio.currentTime;
            currentSongPlaying.audio.pause();
            currentSongPlaying.audio.currentTime = currentSongPlaying.pttime.ptime;
            currentSongPlaying.audio.muted = false;
            
            upadatePlaylistPlayBtn(playBtn,  currentSongPlaying.isPlaying);
            toggleClassList(loadingoverlay, "active", true);
        });


        currentSongPlaying.audio.addEventListener('ended', () => {
            timesPan.textContent = '';
            rangeInput.style.width = 0;
            currentSongPlaying.isPlaying = false;
            currentSongPlaying.pttime.ptime = 0;
            currentSongPlaying.audio.muted = false;
            upadatePlaylistPlayBtn(playBtn, false);
            currentSongPlaying.audio.currentTime = 0;

            let currentIndex = playlistFromUrl.number;
            const allsongs = queuedContainer.querySelectorAll('.queued-songs-list-item');
            
            // If we are at the last song, set reverseMode to true
            if (currentIndex === allsongs.length) {
                reverseMode = true; // Start playing backward from the last song
            }

            // If reverseMode is true, go backward through the songs
            if (reverseMode) {
                if (currentIndex > 0) {
                    currentIndex -= 1; // Move to the previous song
                    const songId = allsongs[currentIndex - 1].getAttribute('data-code');
                    const playlist = allPlayLists.find(pl => pl.pid === playlistFromUrl.pid);
                    if (playlist) {
                        const nextSong = mysongs.find(s => s.songId === songId);
                        playCurrentPlaylistSong(nextSong, currentIndex);
                    }
                } else {
                    // Once we reach the first song, stop reverse playback
                    reverseMode = false;
                    currentIndex = 1;
                    playlistFromUrl.number = currentIndex;
                    goNextSong("forward"); // Optionally start moving forward
                }
            } else {
                // Regular forward playback
                if (currentIndex < allsongs.length) {
                    goNextSong("forward");
                }
            }

            // Reset buttons and overlays
            toggleClassList(playBtn, "active", false);
            toggleClassList(loadingoverlay, "active", false);
            toggleClassList(confirmationOverlay, "active", false);
        });

        
        truck.onclick = (e) => {
            const dist = truck.clientWidth;
            const clickedX = e.offsetX;
            const dur = currentSongPlaying.audio.duration;

            currentSongPlaying.audio.currentTime = (clickedX / dist) * dur;
        }

        document.addEventListener('keydown',(e) => {
            e.preventDefault();
            if(e.code === "ArrowUp"){
                goNextSong("backward");
            }

            if(e.code === "ArrowDown"){
                goNextSong("forward");
            }
        },{once:true})

        window.addEventListener('beforeunload', () => {
            const newTimeObj = { 
                pctid: currentSongPlaying.sid, 
                ptime: currentSongPlaying.audio.currentTime
            };

            saveToSessionStorage(newTimeObj, "pcurrentTime");
        })
    }

    function goNextSong(dir){
        

        let currentIndex = playlistFromUrl.number;
        const allsongs =  queuedContainer.querySelectorAll('.queued-songs-list-item');

       

        if(dir === "forward"){
            if(currentIndex < allsongs.length){
                currentIndex = currentIndex + 1;

                const songId = allsongs[currentIndex - 1].getAttribute('data-code');
                const playlist = allPlayLists.find(pl => pl.pid === playlistFromUrl.pid);
                if(playlist){
                    console.log("playlist", playlist);
                    const nextSong = mysongs.find(s =>s.songId === songId);
                    playCurrentPlaylistSong(nextSong, currentIndex)
                }
            }
        }

        if(dir === "backward"){
            if(currentIndex > 0){
                currentIndex = currentIndex - 1;
                const songId = allsongs[currentIndex - 1].getAttribute('data-code');
                const playlist = allPlayLists.find(pl => pl.pid === playlistFromUrl.pid);
                if(playlist){
                    const nextSong = mysongs.find(s =>s.songId === songId);
                    playCurrentPlaylistSong(nextSong, currentIndex)
                }
            }
        }

        
    }

    function upadatePlaylistPlayBtn(playBtn, state) {
        playBtn.innerHTML = state ? "&#10074;&#10074;" : "&#9654;";
    }

    function updateBg(index, song) {
        const img = getAlbumImage(song);
        const sect = document.querySelector("#QueuedSongs");
        const userPreferColor = getComputedStyle(document.documentElement).getPropertyValue('--user-prefer-color').trim();
        const selectedColor = userPreferColor === "dark" ? darkColors : xlrs;
        
        // Set the background color as a fallback
        sect.style.backgroundColor = selectedColor[index];
        
        // Set the background image and apply the fallback color in case image fails to load
        const imgFallback = new Image();
        imgFallback.src = img;
        
        imgFallback.onload = () => {
            // If the image loads successfully, set it as the background image
            sect.style.backgroundImage = `url(${img})`;
        };
    
        imgFallback.onerror = () => {
            // If image fails to load, remove the background-image (it will show the background color)
            sect.style.backgroundImage = "";

            sect.style.backgroundColor = selectedColor[index];
        };
    }
    

    function showFiltersOptions() {
        refreshDivContainer.innerHTML = '';

        myAlbums.forEach((alb, i) => {
            const albSpan = document.createElement('li');
            albSpan.innerHTML = `<span>${i + 1}. ${alb.albumName}</span> <img src="${alb.albumImage}" alt="${alb.description}" title="${alb.description}">`;
            refreshDivContainer.appendChild(albSpan);

            albSpan.onclick = () => {
                const songsWithSameAlbum = mysongs.filter(s => s.songGenre === alb.albumName);
                
                const shuffledSongAlbum = shuffleArray(songsWithSameAlbum);

                songBatches = [...shuffledSongAlbum.map(s => s.songId)];
                saveToSessionStorage(songBatches,"songBatches");
                refreshSongBatches();
            }
        })
        toggleClassList(refreshOverlay, "active", true)
        

        refreshBtn.onclick = () => {
            toggleClassList(refreshOverlay, "active", false);
            sessionStorage.removeItem("songBatches");
            createSessionSongBatches();
            const firstSongId = songBatches[0];
            const song = mysongs.find(s => s.songId === firstSongId);

            if(song){
                songFromUrl.sid = song.songId;
                songFromUrl.index = 1;
                handleSongDetails(songFromUrl.sid, songFromUrl.index);
            }

            window.location.reload();
        }


        document.addEventListener('click', (e) => {
            if(!e.target.classList.contains('.filter-options .refresh-options-content')){
                toggleClassList(refreshOverlay, "active", false);
            }
        })
    }

    
    let deferredPrompt;

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (event) => {
        // Prevent the default behavior of the prompt
        event.preventDefault();
        
        // Save the event to trigger it later
        deferredPrompt = event;
        
    
    
        // Add event listener to the install button
        installButton.onclick = function () {
            // Show the installation prompt
            deferredPrompt.prompt();
            
            // Wait for the user's response to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
            
                // Reset the deferred prompt variable
                deferredPrompt = null;
            
                
                
            });
        };

    });

})
