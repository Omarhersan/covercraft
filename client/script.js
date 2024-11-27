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
function drawPlaylist(){
  fetch("localhost:3000/api/spotify/playlists")
    .then(response => response.json())
    .then(data => {
      playlists.innerHTML = "";
      data.forEach(playlist => {
        const element = document.createElement("div");
        element.innerHTML = `
          <h3 id="specificPlaylist">${playlist.name}</h3>
          <p>${playlist.description}</p>
          <img src="${playlist.image}" alt="${playlist.name}">
        `;
        playlists.appendChild(element);

        const specificPlaylist = document.getElementById("specificPlaylist");
        specificPlaylist.addEventListener("click", () => {
          window.location.href = `api/spotify/playlist/${playlist.id}`;
        });

      });
    });
}



