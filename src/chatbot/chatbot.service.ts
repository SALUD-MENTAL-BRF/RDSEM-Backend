import { Injectable } from "@nestjs/common";

@Injectable()
export class ChatbotService{
    
    async askAI(msg:any){
        return msg
    }
}