import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {ConfigService} from "@nestjs/config";
import { ModelName } from '../generated/prisma/internal/prismaNamespace';
@Injectable()
export class OllamaService {
    private readonly ollamaApiUrl: string;
    constructor(
        private readonly httpService: HttpService,
        configService: ConfigService
    ) {
        this.ollamaApiUrl = configService.get('AI_API') || configService.get('OLLAMA_API_URL') || 'http://localhost:11434';
    }
    async fetchOllamaData(model: string, prompt: string): Promise<any>{
        const url = `${this.ollamaApiUrl}/api/${model}`;
        try {
            const response = await firstValueFrom(
                this.httpService.post(url, 
                { 
                    model,
                    prompt 
                })
            );
            return response.data;
        } catch (error) {
            throw new HttpException('Error fetching Ollama data', 500);
        }
    }
    async fetchAvailableModels(): Promise<any> {
        const url = `${this.ollamaApiUrl}/api/tags`;
        try {
            const response = await firstValueFrom(this.httpService.get(url));
            return response.data;
        } catch (error) {
            throw new HttpException('Error fetching available models', 500);
        }
    }
}
    

