import { BadRequestException, Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/createNoteDto';

@Controller('note')
export class NoteController {

  constructor(private readonly notesService: NoteService) {} 

  @Post('/')
  createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.createNote(createNoteDto)
  }
  

  @Delete()
  deleteNote(@Query('noteId') noteId: string) {
    const noteIdNumber = parseInt(noteId, 10);
    if (isNaN(noteIdNumber)) {
      throw new BadRequestException('Invalid note ID');
    }
    return this.notesService.deletedNote(noteIdNumber);
  }

  @Get()
  getNotesByUserId(@Query('userId') userId: string) {
    const userIdNumber = parseInt(userId, 10);
    if (isNaN(userIdNumber)) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.notesService.getNotesByUserId(userIdNumber);
  }
  
}