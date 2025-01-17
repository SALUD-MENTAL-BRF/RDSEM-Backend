import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/createNoteDto';
import { UpdateNoteDto } from './dto/updateNote'

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

  @Put()
  updateNote(@Query('noteId') noteId: string, @Body() updateNoteDto: UpdateNoteDto) {
    const noteIdNumber = parseInt(noteId, 10);
    if (isNaN(noteIdNumber)) {
      throw new BadRequestException('Invalid note ID');
    }
    return this.notesService.updateNote(noteIdNumber, updateNoteDto);
  }
  
}