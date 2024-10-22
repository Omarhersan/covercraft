import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { HTTP_STATUS_CODES } from '../types/htpp-status-codes';

// Generar un token JWT
const generateToken = (userId: string) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
        expiresIn: '1d', // El token expira en un día
    });
};

// Registro de usuario
export const signup = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Verificar si ya existe un usuario con el mismo email
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send('Email ya registrado');
        }

        // Cifrar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario con la contraseña cifrada
        const newUser = await UserModel.create({ email, password: hashedPassword });

        // Generar un token JWT
        const token = generateToken(newUser._id.toString());

        res.status(HTTP_STATUS_CODES.CREATED).json({
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
            },
        });
    } catch (e) {
        console.error('Error en el registro:', e);
        res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
    }
};

// Inicio de sesión
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).send('Email no registrado');
        }

        // Verificar que el campo password existe y es de tipo string
        if (typeof user.password !== 'string') {
            return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).send('Error al verificar la contraseña');
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).send('Contraseña incorrecta');
        }

        // Generar un token JWT
        const token = generateToken(user._id.toString());

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
            },
        });
    } catch (e) {
        console.error('Error en el inicio de sesión:', e);
        res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
    }
};
