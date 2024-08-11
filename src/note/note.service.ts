import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/createNoteDto';
import { PrismaService } from '../prisma/prisma.service'

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

}
