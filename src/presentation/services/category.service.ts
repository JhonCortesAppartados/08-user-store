import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustomError, PaginationDto, UserEntity } from "../../domain";


export class CategoryService {

    constructor(){}


    async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity){

        const categoryExists = await CategoryModel.findOne({name: createCategoryDto.name});
        if(categoryExists) throw CustomError.badRequest('Category already exist');

        try {
            const category = new CategoryModel({...createCategoryDto, user: user.id});

            await category.save();

            return {
                id: category.id,
                name: category.name,
                available: category.available,
            }

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    async getCategories(paginationDto: PaginationDto){

        const {page, limit} = paginationDto;
        
        try {

            // //Para poder sacar el total de las categorias:
            // const total = await CategoryModel.countDocuments();

            // const categories = await CategoryModel.find()
            // //Esto se usa para paginar:
            //     .skip((page - 1) * limit)
            //     .limit(limit);

            //Para poder hacer que las promesas se hagan de manera simultanea y se note mas rapida la peticion:
            const [total, categories] = await Promise.all([
                CategoryModel.countDocuments(),
                CategoryModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
            ]);

                        
            // return categories.map(category => ({
            //     id: category.id,
            //     name: category.name,
            //     available: category.available,
            // }));

            //Esto para poder retornar la información como un objeto y poder acceder a la informacion de lo que se pidio:
            return {
                page: page,
                limit: limit,
                total: total,
                next: `/api/categories?page=${page + 1}&limit=${limit}`,
                prev: (page - 1 > 0) ? `/api/categories?page=${page - 1}&limit=${limit}` : null,

                categories: categories.map(category => ({
                    id: category.id,
                    name: category.name,
                    available: category.available,
                }))
            };

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }


}

