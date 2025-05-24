import path from 'path';
import fs from 'fs';
import {UploadedFile} from 'express-fileupload';
import { Uuid } from '../../config';
import { CustomError } from '../../domain';


export class FileUploadService {

    constructor(
        private readonly uuid = Uuid.v4,
    ){}


    private checkFolder(folderPath: string) {

        if(!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath);
        }

    }

    async uploadSingle(
        file: UploadedFile,
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ){
        try {
            //Con este se sabe la extesnion del archivo:
            const fileExtension = file.mimetype.split('/').at(1) ?? '';

            //Se validara que la extension del archivo sea correcta:
            if(!validExtensions.includes(fileExtension)){
                throw CustomError.badRequest(`Invalid extension: ${fileExtension}, valid ones ${validExtensions}`);
            }

            //Con este se sabe el destino del archivo:
            const destination = path.resolve(__dirname, '../../../', folder);
            this.checkFolder(destination);

            //Sirve para poder asignarle un nombre unico al archivo con el UUID:
            const fileName = `${this.uuid()}.${fileExtension}`;

            //Se mueve el archivo al destino:
            // file.mv(destination + `/mi-imagen.${fileExtension}`);

            //Se mueve el archivo con el nombre que le asigna el UUID:
            file.mv(`${destination}/${fileName}`);

            return {fileName};

        } catch (error) {
        //    console.log({error}); 
           throw error;
        }
        
    }

    async uploadMultiple(
        files: UploadedFile[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ){

        const fileNames = await Promise.all(
            files.map (file => this.uploadSingle(file, folder, validExtensions))
        );

        return fileNames;

    }

}