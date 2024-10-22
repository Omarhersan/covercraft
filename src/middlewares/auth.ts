import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS_CODES } from '../types/htpp-status-codes';

// Middleware de protección de rutas
export const protect = (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extraer el token del encabezado
            token = req.headers.authorization.split(' ')[1];

            // Verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

            // Almacenar el id del usuario en el objeto request
            req.user = decoded.id;

            next();
        } catch (e) {
            console.error('Error al verificar token:', e);
            res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
        }
    } else {
        res.status(HTTP_STATUS_CODES.UNAUTHORIZED).send('No se proporcionó token');
    }
};
