import { Router } from "express";
import passport from "passport";

const router = Router();

// Ruta para iniciar sesión con Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback después de la autenticación con Google
router.get(
  "/google/callback",  // Se debe hacer coincidir con la URL del callback
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
    res.redirect("/"); // Redirige a la página principal tras éxito
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
