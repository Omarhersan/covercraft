import { Router } from 'express';
import userRoutes from './user.routes';
import coverRouter from './cover.routes';
import playlistRouter from './playlist.routes';
import { protect } from '../middlewares/auth';
const router = Router();

router.get('', (req, res) => {
    res.send('Hello World!!!');
});

// Rutas para usuarios
router.use('/users', protect, userRoutes);

// Rutas para covers
router.use('/covers', protect,coverRouter);

// Rutas para playlists
router.use('/playlists', protect, playlistRouter);

export default router;
