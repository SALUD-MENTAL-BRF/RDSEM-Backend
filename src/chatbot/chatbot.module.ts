import { Module } from "@nestjs/common";
import { ChatBotController } from "./chatbot.controller";
import { ChatbotService } from "./chatbot.service";

@Module({
    controllers:[ChatBotController],
    providers:[ChatbotService]
})

export class ChatBotModule{}