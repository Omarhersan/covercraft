import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import coverRouter from './cover.routes';
import playlistRouter from './playlist.routes';
import creationRouter from './creation.routes';

const router = Router();


/**
 * @swagger
 * /:
 *  get:
 *   description: API home route
 *   responses:
 *    '200':
 *     description: A successful response
 */
router.get('', (req, res) => {
    res.send('Hello World!!!');
});

// Rutas para usuarios
router.use('/users', userRoutes);
router.use("/auth", authRoutes);

// Rutas para covers
router.use('/covers', coverRouter);

// Rutas para playlists
router.use('/playlists', playlistRouter);

// Rutas para crear imágenes
router.use('/images', creationRouter);


export default router;
