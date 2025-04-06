 // Function to fetch the cached audio data (from audio.json)
 function fetchAudioData() {
    if ('caches' in window) {
        caches.match('/audio.json').then(function(response) {
            if (!response) {
                console.log("No cached audio data available.");
                return;
            }
            response.json().then(function(data) {
                displayAudioFiles(data); // Display cached audio files
            });
        }).catch(function(error) {
            console.error("Error fetching audio data:", error);
        });
    }
}

// Function to display the audio files and create a player for each
function displayAudioFiles(audioData) {
    const audioListContainer = document.getElementById('audio-list');
    
    // Loop through each audio data entry and create a player
    audioData.forEach(function(audio) {
        const audioElement = document.createElement('div');
        audioElement.classList.add('audio-item');

        // Create audio player
        const audioPlayer = document.createElement('audio');
        audioPlayer.setAttribute('controls', 'true');
        const audioSource = document.createElement('source');
        
        // Use songUrl directly since it already includes the path
        audioSource.setAttribute('src', audio.songUrl);
        audioSource.setAttribute('type', 'audio/mp3'); // Ensure the type matches your audio format
        audioPlayer.appendChild(audioSource);

        // Add metadata like song name, artist, genre, etc.
        const songDetails = document.createElement('div');
        songDetails.classList.add('song-details');
        songDetails.innerHTML = `
            <strong>${audio.songName}</strong><br>
            Artist: ${audio.songArtist1} ${audio.songArtist2 ? audio.songArtist2 : ""}<br>
            Genre: ${audio.songGenre}<br>
            Mood: ${audio.songMood.join(", ")}
        `;

        // Append the audio player and details to the container
        audioElement.appendChild(audioPlayer);
        audioElement.appendChild(songDetails);
        audioListContainer.appendChild(audioElement);
    });
}

// Fetch and display audio files when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchAudioData();
});