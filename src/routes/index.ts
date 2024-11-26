import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';

const router = Router();

router.get('', (req, res) => {
    res.send('Hello World!!!');
});

router.use('/users', userRoutes);
router.use("/auth", authRoutes);

export default router;