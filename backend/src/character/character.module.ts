import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CharacterController } from "./character.controller";
import { PrismaService } from "../prisma.service";
import { CharacterService } from "./character.service";


@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CharacterController],
  providers: [PrismaService, CharacterService], 
})
export class CharacterModule {}