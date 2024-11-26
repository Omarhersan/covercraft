import { Request, Response } from 'express';
import CoverModel from '../models/cover.models';
import { HTTP_STATUS_CODES } from '../types/htpp-status-codes';
import { Cover as CoverType } from '../types/cover';

class CoverControllers {
    
    // Obtener todas las covers
    async getAll(req: Request, res: Response) {
        try {
            const covers = await CoverModel.find();
            res.send(covers);
        } catch (e) {
            console.error("Error fetching covers:", e); 
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        }
    }

    // Obtener cover por ID
    async getById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const cover = await CoverModel.findById(id);
            if (cover) {
                res.send(cover);
            } else {
                res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
            }
        } catch (e) {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        }
    }

    // Crear una nueva cover
    async create(req: Request, res: Response) {
        const coverData: CoverType = req.body;
        try {
            const newCover = await CoverModel.create(coverData);
            res.status(HTTP_STATUS_CODES.CREATED).send(newCover);
        } catch (e) {
            res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        }
    }

    // Actualizar una cover existente
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const coverData: CoverType = req.body;
        try {
            const updatedCover = await CoverModel.findByIdAndUpdate(id, coverData, { new: true });
            if (updatedCover) {
                res.send(updatedCover);
            } else {
                res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
            }
        } catch (e) {
            res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        }
    }

    // Eliminar una cover
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const deletedCover = await CoverModel.findByIdAndDelete(id);
            if (deletedCover) {
                res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT);
            } else {
                res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
            }
        } catch (e) {
            res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        }
    }
}

const coverController = new CoverControllers();
export default coverController;
