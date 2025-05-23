import { ProductModel } from "../../data";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";


export class ProductService {

    constructor(){}


    async createProduct(createProductDto: CreateProductDto){

        const productExists = await ProductModel.findOne({name: createProductDto.name});
        if(productExists) throw CustomError.badRequest('Category already exist');

        try {
            const product = new ProductModel(createProductDto);

            await product.save();

            return product;

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    async getProducts(paginationDto: PaginationDto){

        const {page, limit} = paginationDto;
        
        try {

            //Para poder hacer que las promesas se hagan de manera simultanea y se note mas rapida la peticion:
            const [total, products] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
                    //Esto para poder mostrar la informacion del usuario:
                    .populate('user')
                    //Esto para poder mostrar la informacion del usuario con el primer argumento, con el segundo argumento le dicimos que queremos mostrar:
                    // .populate('user', 'name email')
                    //Esto para poder mostrar la informacion de la categoria:
                    .populate('category')
                    

                    
            ]);


            //Esto para poder retornar la información como un objeto y poder acceder a la informacion de lo que se pidio:
            return {
                page: page,
                limit: limit,
                total: total,
                next: `/api/products?page=${page + 1}&limit=${limit}`,
                prev: (page - 1 > 0) ? `/api/products?page=${page - 1}&limit=${limit}` : null,

                products: products
            };

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }


}

