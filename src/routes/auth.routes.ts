import { Router } from "express";
import passport from "passport";
import { SpotifyUser } from "../types/spotify";  // Importar el tipo de SpotifyUser

const router = Router();

// Ruta para iniciar sesión con Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback después de la autenticación con Google
router.get(
  "/google/callback", // Se debe hacer coincidir con la URL del callback
  passport.authenticate("google", {
    failureRedirect: "/login-failed",
  }),
  (req, res) => {
    res.redirect("/"); // Redirige a la página principal tras éxito
  }
);

// Ruta para iniciar sesión con Spotify
router.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-private", "user-read-email"],
  })
);

// Callback después de la autenticación con Spotify
router.get(
  "/spotify/callback",  // Se debe hacer coincidir con la URL del callback
  passport.authenticate("spotify", {
    failureRedirect: "/login-failed",
  }),
  (req, res) => {
    // Asegúrate de que `req.user` es un objeto del tipo `SpotifyUser`
    const spotifyUserId = (req.user as SpotifyUser)?.id;

    // Si se obtiene el `spotifyUserId`, se guarda en la cookie
    if (spotifyUserId) {
      res.cookie("spotify_user_id", spotifyUserId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",  // Solo si usas HTTPS
        maxAge: 30 * 24 * 3600 * 1000,  // Expira en 30 días
        sameSite: "strict",  // Usamos "strict" en minúsculas
      });
    }

    res.redirect("/"); // Redirige a la página principal después de la autenticación exitosa
  }
);

// Ruta para cerrar sesión
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return console.error(err);
    res.redirect("/");
  });
});

export default router;
