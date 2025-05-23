import { Validators } from "../../../config";


export class CreateProductDto {

    private constructor (
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string, //Solo se necesita el id del usuario
        public readonly category: string, //Solo se necesita el id de la categoria
    ){}


    static create (props: {[key: string]: any}): [string?, CreateProductDto?]{

        const {name, available, price, description, user, category} = props;

        if(!name) return ['Missing name'];

        if(!user) return ['Missing user'];
        if(!Validators.isMongoId(user)) return ['Invalid User Id'];

        if(!category) return ['Missing category'];
        if(!Validators.isMongoId(category)) return ['Invalid Category Id'];

        return [undefined, new CreateProductDto(name, !!available, price, description, user, category)];
    }

}