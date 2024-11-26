import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import path from "path";
import routes from "./routes"; // Rutas principales
config();

const app = express();

const PORT = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;

// Configuración de Passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/api/auth/google/callback", // Nota: ajusta si cambias el prefijo
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Google Profile:", profile);
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: Express.User | null, done) => {
  done(null, user);
});

// Middleware para sesiones
app.use(
  session({
    secret: "your-session-secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Usar rutas desde `routes/index.ts`
app.use("/api", routes);

// Middleware para servir frontend
const frontendPath = path.join(__dirname, "../client");
app.use(express.static(frontendPath));

// Fallback para el frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Conexión a la base de datos
connect(dbUrl as string)
  .then(() => {
    console.log("Conectado a la base de datos");
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error al conectar a la base de datos:", err);
  });
