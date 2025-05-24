import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services/file-upload.service";



export class FileUploadRoutes {

    static get routes(): Router {
        
        const router = Router();

        const controller = new FileUploadController(
            new FileUploadService(),
        );
        
        // Definir las rutas:
        //Se establecera para poder subir los diferentes archivos:
        // api/upload/single/<user|category|product>/
        // api/upload/multiple/<user|category|product>/
        router.post('/single/:type', controller.uploadFile);
        router.post('/multiple/:type', controller.uploadMultipleFiles);



        return router;
    }



}