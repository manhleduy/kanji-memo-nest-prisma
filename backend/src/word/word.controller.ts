import { Controller } from "@nestjs/common";
import { WordService } from "./word.service";
import { Word, Prisma } from "../generated/prisma/client";
import { Get, Post, Body } from "@nestjs/common";
@Controller('/words')
export class WordController {
    constructor(
        private readonly wordService: WordService
    ){} 
    @Get()
    async getMemorizedWords(): Promise<Word[]> {
        return this.wordService.memorizedWords();
    }
    @Post()
    async memorizeWord(@Body() data: Prisma.WordCreateInput): Promise<Word> {
        return this.wordService.memorizeWord(data);
    }
    @Get('/total')
    async totalMemorizedWords(): Promise<number> {
        return this.wordService.totalmemorizedWords();
    }

}
