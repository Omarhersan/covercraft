// custom.d.ts
import { Request } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user?: string; // o el tipo que quieras para el ID de usuario
    }
}