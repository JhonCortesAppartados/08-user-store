


export class FileUploadService {

    constructor(){}


    private checkFolder(folderPath: string) {

        throw new Error('Not implemented');

    }

    uploadSingle(
        file: any,
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ){}

    uploadMultiple(
        files: any[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ){}

}