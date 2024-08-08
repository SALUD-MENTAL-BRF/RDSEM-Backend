import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/createNoteDto';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class NoteService {

  constructor(private readonly prisma: PrismaService) {}

  getNotesByUserId(userId: number) {
    return this.prisma.note.findMany({ where: { userId } })
  }

  createNote(data: CreateNoteDto) {
    return this.prisma.note.create({data})
  }

}