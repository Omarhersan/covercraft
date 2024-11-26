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
  "/api/auth/google/callback", // Corrige aquí: agrega el "/" inicial
  passport.authenticate("google", {
    failureRedirect: "/login-failed", // Redirige si falla la autenticación
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
