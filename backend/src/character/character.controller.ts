import {Controller, Get, Post, Body, Injectable, Module} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Character, Word, Prisma } from '../generated/prisma/client';
import { CharacterService } from './character.service';
@Controller('/characters')
export class CharacterController {
    constructor(
        private readonly characterService: CharacterService
    ){}
    @Get()
    async getMemorizedCharacters(): Promise<Character[]> {
        return this.characterService.memorizedCharacters();
    }
    @Post()
    async memorizeCharacter(@Body() data: Prisma.CharacterCreateInput): Promise<Character> {
        return this.characterService.memorizeChracter(data);
    }
    @Post('/increase')
    async increaseFrequency(@Body('id') character: string): Promise<Character> {
        return this.characterService.increaseFequency(character);
    }
    @Get('/total')
    async totalMemorizedCharacters(): Promise<number> {
        return this.characterService.totalmemorizedCharacters();
    }

}