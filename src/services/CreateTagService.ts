import { getCustomRepository } from "typeorm"
import {TagRepositories} from "../repositories/TagRepositories"

class CreateTagService {
    async execute( name: string ){
        const tagRepositories = getCustomRepository(TagRepositories);

        if(!name){
            throw new Error('Incorrect Name!');
        }
        const tagAlreadyExists = await tagRepositories.findOne({name});

        if(tagAlreadyExists){
            throw new Error('Tag already Exist');
        }

        const tag = tagRepositories.create({name});

        await tagRepositories.save(tag);

        return tag;
    }
}

export { CreateTagService }