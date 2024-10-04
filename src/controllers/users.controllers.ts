// Lógica de los endpoints de usuarios
import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import { HTTP_STATUS_CODES } from '../types/htpp-status-codes';
import { User as UserType } from '../types/user';

class UsersControllers {

    async getAll(req: Request, res: Response) {
        try {
            const users = await UserModel.find();
            res.send(users);
        } catch (e) {
            console.error("Error fetching users:", e); 
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        }
    }

    // Obtener un usuario por ID
    async getById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await UserModel.findById(id);
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
            }
        } catch (e) {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        }
    }

    // Crear un nuevo usuario
    async create(req: Request, res: Response) {
        const userData: UserType = req.body;
        try {
            const newUser = await UserModel.create(userData);
            res.status(HTTP_STATUS_CODES.CREATED).send(newUser);
        } catch (e) {
            res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        }
    }

    // Actualizar un usuario existente
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const userData: UserType = req.body;
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(id, userData, { new: true });
            if (updatedUser) {
                res.send(updatedUser);
            } else {
                res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
            }
        } catch (e) {
            res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        }
    }

    // Eliminar un usuario
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const deletedUser = await UserModel.findByIdAndDelete(id);
            if (deletedUser) {
                res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT);
            } else {
                res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
            }
        } catch (e) {
            res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        }
    }
}


const controller = new UsersControllers();
export default controller;
