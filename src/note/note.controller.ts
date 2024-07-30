import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/createNoteDto';

@Controller('note')
export class NoteController {

  constructor(private readonly notesService: NoteService) {} 

  @Get('/:userId')
  getNotesByUserId(@Param('userId') userId: string) {
    const userIdNumber = parseInt(userId, 10);
    if (isNaN(userIdNumber)) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.notesService.getNotesByUserId(userIdNumber);
  }
  

  @Post('/')
  createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.createNote(createNoteDto)
  }


}