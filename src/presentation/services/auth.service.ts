import { bcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService {

    //inyecion de dependencias | DI:
    constructor(){}

    public async registerUser(resgisterUserDto: RegisterUserDto){

        const existUser = await UserModel.findOne({email: resgisterUserDto.email});

        if(existUser) throw CustomError.badRequest('Email already exist');

        try {
            const user = new UserModel(resgisterUserDto);
            
            //Encriptar la contraseña:
            user.password = bcryptAdapter.hash(resgisterUserDto.password);
            
            await user.save();
            //JWT <---- para mantener la autenticación del usuario:

            //Email de confirmación:
            
            //Se muestra la información del usuario sin la contraseña:
            const {password, ...userEntity} = UserEntity.fromObject(user);

            return {
                user: userEntity,
                token: 'ABC'
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    public async loginUser(loginUserDto: LoginUserDto){

        const user = await UserModel.findOne({email: loginUserDto.email});

        if(!user) throw CustomError.badRequest('Email or password are wrong');

        const isMatching = bcryptAdapter.compare(loginUserDto.password, user.password);

        if(!isMatching) throw CustomError.badRequest('Email or password are wrong');

        const {password, ...userEntity} = UserEntity.fromObject(user);

        //Esto es para poder asignarle el JWT:
        const token = await JwtAdapter.generateToken({id: user.id});
        if(!token) throw CustomError.internalServer('Error while creating JWT');

        return {
            user: userEntity,
            token: token,
        };

    }
}