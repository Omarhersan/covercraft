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
      `;
      break;
    case "try":
      content.innerHTML = "<h2>Probar Ahora</h2><p>Explora nuestras funcionalidades únicas.</p>";
      break;
    default:
      content.innerHTML = "<p>Selecciona una opción para navegar.</p>";
  }
}

function loginWithGoogle() {
  window.location.href = "/api/auth/google";
}
