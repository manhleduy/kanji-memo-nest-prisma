import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Character, Word, Prisma } from "../generated/prisma/client";
@Injectable()
export class WordService{
    constructor(
        private readonly prisma: PrismaService
    ){}
    async memorizedWords(): Promise< Word[] > {
        return this.prisma.word.findMany();

    }
    async memorizeWord(data: Prisma.WordCreateInput): Promise<Word> {
        return this.prisma.word.create({
            data,
        });
    }
    
    async totalmemorizedWords(): Promise<number> {
        return this.prisma.word.count();
    }
}