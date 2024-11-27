function navigate(section) {
  const content = document.getElementById("content");
  switch (section) {
    case "home":
      content.innerHTML = "<h2>Inicio</h2><p>Bienvenido a nuestra página principal.</p>";
      break;
    case "about":
      content.innerHTML = "<h2>About Us</h2><p>Somos una empresa dedicada a brindar el mejor servicio.</p>";
      break;
    case "login":
      content.innerHTML = `
        <h2>Iniciar Sesión</h2>
        <button onclick="loginWithGoogle()">Iniciar sesión con Google</button>
        <button onclick="loginWithSpotify()">Iniciar sesión con Spotify</button>
      `;
      break;
    case "try":
      content.innerHTML = "<h2>Probar Ahora</h2><p>Explora nuestras funcionalidades únicas.</p><br><button onclick='drawPlaylist()'>Ver Playlists</button>";

      break;
    default:
      content.innerHTML = "<p>Selecciona una opción para navegar.</p>";
  }
}

function loginWithGoogle() {
  window.location.href = "/api/auth/google";
}
function loginWithSpotify() {
  window.location.href = "/api/auth/spotify";
}

const playlists = document.getElementById("playlists");


function loadPlaylist(playlistId){
  const spotifyAccessToken = document.cookie;
  fetch(`/api/spotify/playlist/${playlistId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: spotifyAccessToken,
    },
  }).then((response) => {
    return response.json();
  }).then((data) => {
    fetch(`/api/spotify/playlist/${playlistId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: spotifyAccessToken,
      }
    })
  });
}



function drawPlaylist(){
  const spotifyAccessToken = document.cookie;
  fetch(`/api/spotify/playlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: spotifyAccessToken,
    },
  }).then((response) => {
    return response.json();
  }).then((data) => {
    playlists.className = "row";
    let cardDeck = document.createElement("div");
    cardDeck.className = "card-deck";

    data.items.forEach((playlist) => {
      let playlistElement = document.createElement("div");
      playlistElement.className = "card mb-4 shadow-sm";
      playlistElement.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${playlist.name}</h5>
        <p class="card-text">${playlist.description}</p>
        <button class="btn btn-primary" onclick=loadPlaylist('${playlist.id}');>Cargar playlist</button>
      </div>
      `;
      cardDeck.appendChild(playlistElement);
    });

    playlists.appendChild(cardDeck);
    
    
  });
}




