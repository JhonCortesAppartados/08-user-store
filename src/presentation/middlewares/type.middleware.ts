import { NextFunction, Request, Response } from "express";


export class TypeMiddleware {

    static validTypes(validTypes : string[]){

        return (req: Request, res: Response, next: NextFunction) => {
            
            //Acá se puede recibir undefained:
            // const type = req.params.type;

            //Para no recibir undefained, se le especifica la ruta donde se va almacenar el archivo:
            const type = req.url.split('/').at(2) ?? '';

            if(!validTypes.includes(type)){
                return res.status(400).json({error: `Invalid type: ${type}, valid ones ${validTypes}`});
            }

            next();
        }
    }

}