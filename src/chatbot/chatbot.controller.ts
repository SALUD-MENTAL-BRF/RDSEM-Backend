import { Controller, Post,Body } from "@nestjs/common";
import { ChatbotService } from "./chatbot.service";

@Controller('chat')
export class ChatBotController{
    constructor(private chatBotService: ChatbotService){}

    @Post('/')
    async QuestionChat(@Body() msg: any){
        return this.chatBotService.askAI(msg)
    }
}