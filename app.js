const searchMusic = async () => {
    const searchText = document.getElementById("search-engine").value;
    const url = `https://api.lyrics.ovh/suggest/:${searchText}`

    const res = await fetch(url);
    const data = await res.json();
    displaySongs(data.data);
}

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3'
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
        </div>
        <audio controls>
            <source src="${song.preview}" type="audio/mpeg">
        </audio>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="displayLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv);
    });
}

// const displayLyric = (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     fetch(url)
//         .then(res => res.json())
//         .then(data => displayLyrics(data.lyrics))
//         .catch(error => displayError(error))
// }

const displayLyric = async (artist, title) => {
    try {
        const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch(error) {
        displayError(sorry)
    }
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = error;
}