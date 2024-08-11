import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'
import { CreateNoteDto } from './dto/createNoteDto';
import { UpdateNoteDto } from './dto/updateNote'

@Injectable()
export class NoteService {

  constructor(private readonly prisma: PrismaService) {}

  createNote(data: CreateNoteDto) {
    return this.prisma.note.create({data})
  }

  getNotesByUserId(userId: number) {
    return this.prisma.note.findMany({ where: { userId } })
  }

  deletedNote(noteId: number) {
    return this.prisma.note.delete({ where: { id: noteId }  })
  }

  async updateNote(noteId: number, data: UpdateNoteDto) {
    const note = await this.prisma.note.findUnique({ where: { id: noteId } });
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return this.prisma.note.update({ where: { id: noteId }, data });
  }

}
