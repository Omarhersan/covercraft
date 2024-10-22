import { Router } from 'express';
import usersController from '../controllers/users.controllers';

const router = Router();

// Obtener todos los users
/**
 * @swagger
 * /user:
 *  get:
 *   tags: {user}
 *   description: get all users
 *   responses:
 *    '200':
 *     description: Returns a document array of the user in the database
 *    '500':
 *     description: Internal server error
 * 
 */
router.get('/', usersController.getAll);

// Obtener un user por ID
/**
 * @swagger
 * /user/{id}:
 *  get:
 *   tags: {user}
 *   description: get a user by id
 *   parameters:
 *   - in: path
 *     name: id
 *     description: ID of the user
 *     required: true
 *     schema:
 *     type: string
 *   responses:
 *    '200':
 *     description: Returns a document of the user in the database
 *    '404':
 *     description: Not found
 *    '500':
 *     description: Internal server error
 */ 
router.get('/:id', usersController.getById);

// Crear un nuevo user
/**
 * 
 * @swagger
 * /user:
 *  post:
 *   tags: {user}
 *   description: Creates a new user
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        user_id?:
 *         type: string
 *        name:
 *         type: string
 *        email:
 *         type: string
 *        password:
 *         type: string
 *       required:
 *        - name
 *        - email
 *        - password
 *   responses:
 *    '201':
 *     description: User created
 *    '400':
 *     description: Bad request
 *    '500':
 *     description: Internal server error
 * 
 * 
 */
router.post('/', usersController.create);

// Actualizar un user existente
/**
 * @swagger
 * /user/{id}:
 *  put:
 *   tags: {user}
 *   description: Updates a user by id
 *   parameters:
 *    - in: path
 *      name: id
 *      description: ID of the user
 *      required: true
 *      schema:
 *      type: string
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *        email:
 *         type: string
 *        password:
 *         type: string
 *       required:
 *        - name
 *        - email
 *        - password
 *   responses:
 *    '200':
 *     description: Returns the updated user
 *    '404':
 *     description: Not found
 *    '500':
 *     description: Internal server error
 */
router.put('/:id', usersController.update);

// Eliminar un user
/**
 * @swagger
 * /user/{id}:
 *  delete:
 *   tags: {user}
 *   description: Deletes a user by id
 *   parameters:
 *    - in: path
 *      name: id
 *      description: ID of the user
 *      required: true
 *      schema:
 *      type: string
 *   responses:
 *    '204':
 *     description: User deleted
 *    '404':
 *     description: Not found
 *    '500':
 *     description: Internal server error
 */ 
router.delete('/:id', usersController.delete);

export default router;
