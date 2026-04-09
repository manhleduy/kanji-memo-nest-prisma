import { Module } from "@nestjs/common";
import { WordController } from "./word.controller";
import { PrismaService } from "../prisma.service";
import { WordService } from "./word.service";
@Module({
  imports: [],
  controllers: [WordController],
  providers: [PrismaService, WordService],
})
export class WordModule {}