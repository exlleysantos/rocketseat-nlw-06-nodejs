import { getCustomRepository } from 'typeorm'
import { UserRepositories } from "../repositories/UserRepositories"

interface IUserRequest {
    name:string,
    email:string,
    admin?:boolean
}
class CreateUserService {

    async execute({name, email, admin} : IUserRequest){
        const userRepositories = getCustomRepository(UserRepositories);
        
        if(!email){
            throw new Error('Incorrect Email');
        }

        const userAlreadyExists = await userRepositories.findOne({email});

        if(userAlreadyExists){
            throw new Error('User already Exist');
        }

        const user = userRepositories.create({name, email, admin});

        await userRepositories.save(user);

        return user;
    }
}

export { CreateUserService }