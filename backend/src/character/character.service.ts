import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Character, Word, Prisma } from "../generated/prisma/client";
@Injectable()
export class CharacterService{
    constructor(
        private readonly prisma: PrismaService
    ){}
    async memorizedCharacters(): Promise<Character[]> {
        return this.prisma.character.findMany();

    }
    async memorizeChracter(data: Prisma.CharacterCreateInput): Promise<Character> {
        return this.prisma.character.create({
            data,
        });
    }
    async increaseFequency(character: string): Promise<Character> {
        return this.prisma.character.update({
            where: { character: character },
            data: { freq: { increment: 1 } },
        });
    }
    async totalmemorizedCharacters(): Promise<number> {
        return this.prisma.character.count();
    }
    
}