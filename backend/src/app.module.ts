import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './character/character.module';
import { WordModule } from './word/word.module';
@Module({
  imports: [CharacterModule, WordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
