// Config provicional conexion a base de datos y levantar servidor
import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import swaggerConfig from "../swager.config.json";
import {serve, setup} from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

config();
import routes from "./routes";


const app = express();
const PORT = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;

console.log("Mongo url: ", dbUrl);

app.use('/api',routes);
const swaggerDocs = swaggerJSDoc(swaggerConfig)
app.use('/api-docs', serve, setup(swaggerDocs));

//connect(dbUrl as string).then(res => {
//    console.log("Conectado");
//    app.listen(PORT, () => {
//        console.log(`App is running on port ${PORT}`);
//    });
//}).catch(err => {
//    console.log("Error", err)
//});

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});