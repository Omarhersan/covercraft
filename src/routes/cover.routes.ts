import { Router } from 'express';
import coverController from '../controllers/cover.controllers';

const coverRouter = Router();

// Obtener todas las covers
/**
 * @swagger
 * /cover:
 *  get:
 *   tags: {cover}
 *   description: get all covers
 *   responses:
 *    '200':
 *     description: Returns a document array of the cover in the database
 *    '500':
 *     description: Internal server error
 */
coverRouter.get('/', coverController.getAll);

// Obtener una cover por ID
/**
 * @swagger
 * /cover/{id}:
 *  get:
 *   tags: {cover}
 *   description: get a cover by id
 *   parameters:
 *   - in: path
 *     name: id
 *     description: ID of the cover
 *     required: true
 *     schema:
 *     type: string
 *   responses:
 *    '200':
 *     description: Returns a document of the cover in the database
 *    '404':
 *     description: Not found
 *    '500':
 *     description: Internal server error
 */
coverRouter.get('/:id', coverController.getById);

// Crear una nueva cover
/**
 * @swagger
 * /cover:
 *  post:
 *   tags: {cover}
 *   description: Creates a new cover
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        cover_id?:
 *         type: string
 *        name:
 *         type: string
 *        artist:
 *         type: string
 *        album:
 *         type: string
 *        year:
 *         type: string
 *       required:
 *        - name
 *        - artist
 *        - album
 *        - year
 *   responses:
 *    '201':
 *     description: Returns the created cover
 *    '400':
 *     description: Bad request
 */
coverRouter.post('/', coverController.create);

// Actualizar una cover existente
/**
 * @swagger
 * /cover/{id}:
 *  put:
 *   tags: {cover}
 *   description: Updates a cover by id
 *   parameters:
 *   - in: path
 *     name: id
 *     description: ID of the cover
 *     required: true
 *     schema:
 *     type: string
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *        artist:
 *         type: string
 *        album:
 *         type: string
 *        year:
 *         type: string
 *       required:
 *        - name
 *        - artist
 *        - album
 *        - year
 *   responses:
 *    '200':
 *     description: Returns the updated cover
 *    '404':
 *     description: Not found
 *    '500':
 *     description: Internal server error
 */
coverRouter.put('/:id', coverController.update);

// Eliminar una cover
/**
 * @swagger
 * /cover/{id}:
 *  delete:
 *   tags: {cover}
 *   description: Deletes a cover by id
 *   parameters:
 *   - in: path
 *     name: id
 *     description: ID of the cover
 *     required: true
 *     schema:
 *     type: string
 *   responses:
 *    '204':
 *     description: No content
 *    '404':
 *     description: Not found
 *    '500':
 *     description: Internal server error
 */
coverRouter.delete('/:id', coverController.delete);

export default coverRouter;
