import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser"; // Agregar cookie-parser
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as SpotifyStrategy } from "passport-spotify";
import path from "path";
import routes from "./routes"; // Rutas principales
import { Server } from "socket.io";

config();

const app = express();

// Middleware para cookies
app.use(cookieParser());  // Agregar el middleware para leer las cookies

// Middleware para servir frontend
const frontendPath = path.join(__dirname, "../client");
app.use(express.static(frontendPath));

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

// Configuración de Passport para Spotify
passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      callbackURL: "/api/auth/spotify/callback", // El callbackURL para Spotify
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      done(null, {profile, accessToken});
    }
  )
);

// Serialización y deserialización del usuario
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

// Fallback para el frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(frontendPath, "chat.html"));
});

// Conexión a la base de datos
connect(dbUrl as string)
  .then(() => {
    console.log("Conectado a la base de datos");
    const server = app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });

    const io = new Server(server);
    io.on("connection", (socket) => {
      socket.on("join", (data) => {
        console.log("User connected");
        socket.join(data.room);
      });

      socket.on("messageSent", (message) => {
        socket.broadcast.emit("messageReceived", message);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  })
  .catch((err) => {
    console.log("Error al conectar a la base de datos:", err);
  });
